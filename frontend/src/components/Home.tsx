import React, { useEffect, useState } from 'react';
import ContentList from './Contentlist/ContentList';
import { fetchContent, deleteContent } from "../api/contentApi";
import ContentItem from '../types/ContentItem';
import ContentForm from './ContentForm/ContentForm';

const Home: React.FC = () => {
    const [content, setContent] = useState<ContentItem[]>([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const fetchAndSetContent = async () => {
        try {
            setLoading(true);
            const data = await fetchContent();
            setContent(data); 
        } catch (error) {
            setError('Failed to fetch content');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAndSetContent();
    }, []);

    const handleContentAdded = () => {
        fetchAndSetContent(); 
    };

    const handleDelete = async (id: string) => {
        await deleteContent(id);
        setContent(content.filter(item => item._id !== id)); 
        console.log("Delete request received for ID:", id);

    };

    return (
      <>
        <ContentForm onContentAdded={handleContentAdded}  />
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <ContentList content={content} onDelete={handleDelete} /> 
        </div>
      </>
    );
};

export default Home;
