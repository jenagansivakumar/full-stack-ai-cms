export default interface ContentItem {
  _id: string; // Add this line
  title: string;
  body: string;
  status: "draft" | "review" | "published";
  tags?: string[];
  createdAt?: Date;
}

