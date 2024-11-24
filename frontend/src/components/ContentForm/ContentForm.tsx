import React, { useState } from 'react';
import { addContent } from "../../api/contentApi";
import './ContentForm.css';
import axios from 'axios';

interface ContentData {
    title: string;
    body: string;
    status: "draft" | "review" | "published";
    tags: string[];
}

export default function ContentForm({ onContentAdded }: { onContentAdded: () => void }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [status, setStatus] = useState<ContentData['status']>("draft");
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState<string>("")

    const generateTags = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/generate-tags`, { title, body });
            setTags(response.data.tags);
        } catch (error) {
            console.error("Error generating tags:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await generateTags();

        if (!title || !body){
            setError("Title and Body are required!")
        }

        setError("")
        console.log("Form submitted with:", { title, body });

        const newContent: ContentData = {
            title,
            body,
            status,
            tags,
        };

        try {
            await addContent(newContent);
            onContentAdded();
            setTitle("");
            setBody("");
            setStatus("draft");
            setTags([]);
        } catch (error) {
            console.error("Error adding content:", error);
        }
    };

    return (
    <>
        <div className="form-container">
            <h1 className="form-title">AI Powered Task Workflow</h1>
            <form onSubmit={handleSubmit}>
                <label className="form-label"> Title
                    <input
                        className="form-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                </label>
                <label className="form-label"> Body 
                    <input 
                        className="form-input"
                        value={body} 
                        onChange={(e) => setBody(e.target.value)} 
                        />
                </label>
                <label className="form-label"> Set Status 
                    <select 
                        className="form-select"
                        value={status} 
                        onChange={(e) => setStatus(e.target.value as ContentData['status'])}
                        >
                        <option value="draft">Draft</option>
                        <option value="review">Review</option>
                        <option value="published">Published</option>
                    </select>
                </label>
                {error && <p>{error}</p>}
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    </>
    );
}
