import axios from 'axios';
import Content from '../models/contentModels';
import { ContentData } from '../types/ContentItem';
import dotenv from 'dotenv';
dotenv.config();

const AI_API_KEY = process.env.AI_API_KEY;
console.log(AI_API_KEY)

export const getContentById = async(id: string) => {
    console.log("Fetching content...");
    try{
        console.log("Fetching content with ID:", id);
        const content = await Content.findById(id)
        console.log("Content fetched:", content);
        if (content === null){
            throw new Error("Content not found")
        }
        return content
    } catch (error){
        const errorMessage = (error as Error).message || "Unknown error"
        throw new Error(`Failed to find content by id: ${errorMessage}`)
    }
    
}

export async function createContent(data: ContentData) {
    const tags = await generateTagsWithAI(data.title, data.body);
    const newContent = new Content({ ...data, tags });
    return await newContent.save();
}

export const deleteContent = async (id: string) => {
    console.log("Deleting content...");
    return await Content.findByIdAndDelete(id);
};

export async function fetchAllContent() {
    try {
        return await Content.find();
    } catch (error) {
        throw new Error("Failed to fetch content");
    }
}

async function generateTagsWithAI(title: string, body: string): Promise<string[]> {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'Generate relevant tags for content based on its title and body.' },
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
        const tags = aiResponse.split(',').map((tag: string) => tag.trim());

        console.log("AI generated tags:", tags); 
        return tags;
    } catch (error) {
        console.error("Error generating AI tags:", error);
        return [];
    }
}

