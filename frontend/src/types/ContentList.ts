export interface ContentList {
    id: number,
    title: string,
    body: string,
    status: "draft" | "review" | "published"
    tags?: string[]
    createdAt?: string
}

export default ContentList