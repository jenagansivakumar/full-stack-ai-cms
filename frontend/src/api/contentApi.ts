
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export  async function fetchContent() {
    const response = await fetch(`${BASE_URL}/content`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
}

export async function addContent(content: {
    title: string;
    body: string;
    status: "draft" | "review" | "published";
    tags: string[];
}) {
    const response = await fetch(`${BASE_URL}/content`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
}


export async function deleteContent(id: string) {
    await fetch(`${BASE_URL}/content/${id}`, {
        method: 'DELETE',
    });
}


