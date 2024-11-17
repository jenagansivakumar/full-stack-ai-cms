export default interface ContentItem {
  _id: string;
  title: string;
  body: string;
  status: "draft" | "review" | "published";
  tags?: string[];
  createdAt?: Date;
}

