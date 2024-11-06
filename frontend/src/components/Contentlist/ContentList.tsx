import React from 'react';
import ContentItem from '../../types/ContentItem';
import './ContentList.css';

interface ContentListProps {
  content: ContentItem[];
  onDelete: (id: string) => void;
}

const ContentList: React.FC<ContentListProps> = ({ content, onDelete }) => {
  return (
    <div className="container">
      <h1 className="title">Content Collection</h1>
      <div className="content-grid">
        {content.map((item) => (
          <div key={item._id} className="content-card">
            <div 
              className="content-card-header" 
              style={{ backgroundColor: getColor(item.title) }}
            >
              <h2 className="content-card-title">{item.title}</h2>
            </div>
            <div className="content-card-body">
              <p>{item.body}</p>
              <p className="status">Status: {item.status}</p>
              <p className="tags">Tags: {item.tags?.join(', ') || 'None'}</p>
              <button onClick={() => onDelete(item._id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function getColor(title: string) {
  const colors = ["#FFABAB", "#FFDAAB", "#DDFFAB", "#ABE4FF", "#D7ABFF"];
  return colors[title.length % colors.length];
}

export default ContentList;
