import { Request, Response, NextFunction } from 'express';
import * as contentService from '../services/contentServices';
import Content from '../models/contentModels'; 
import axios from 'axios';
import { timeStamp } from 'console';

const AI_API_KEY = process.env.AI_API_KEY;



export const getAllContent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const content = await contentService.fetchAllContent();
        res.json(content);
    } catch (error) {
        next(error);
    }
};

export const handleDeleteContent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const content = await contentService.getContentById(req.params.id)
        if (content === null){
            throw new Error("Content not found")
        }
       await contentService.deleteContent(req.params.id)
       const slackMessage = (`${content.title} has been deleted at ${new Date().toISOString()} (ID: ${content._id}) `)

       try {

           await axios.post("https://hooks.slack.com/services/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", {text: slackMessage})
        }
        catch (error) {
            console.log(error)
        }
        res.status(204).end()
            
    } catch (error) {
        const errorMessage = (error as Error).message
        if (errorMessage === "Content not found"){
            res.status(404).json({message: "Content not found"})
        } else {
            next(error)
        }
    }
};

async function generateTagsWithAIHelper(title: string, body: string): Promise<string[]> {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'Generate relevant tags for the following content.' },
                    { role: 'user', content: `Title: ${title}\nBody: ${body}` }
                ],
                max_tokens: 50,
            },
            {
                headers: {
                    Authorization: `Bearer ${AI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const aiResponse = response.data.choices[0].message.content;
        return aiResponse.split(',').map((tag: string) => tag.trim());
    } catch (error) {
        console.error("Error generating AI tags:", error);
        return [];
    }
}

export const generateTagsWithAI = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { title, body } = req.body;
    if (!title && !body) {
        res.status(400).json({ message: "Title or body is required to generate tags." });
        return;
    }

    try {
        const tags = await generateTagsWithAIHelper(title, body);
        res.json({ tags });
    } catch (error) {
        next(error);
    }
};

export const createContent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const tags = await generateTagsWithAIHelper(req.body.title, req.body.body);
        const newContent = new Content({ ...req.body, tags });
        const savedContent = await newContent.save();

        console.log("Saved content with tags:", savedContent); 
        res.status(201).json(savedContent);
    } catch (error) {
        next(error);
    }
};
