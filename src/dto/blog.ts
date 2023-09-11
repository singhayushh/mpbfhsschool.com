import { Document } from "mongoose";

type BlogDto = {
    slug: string;
    title: string;
    content: string;
    date: string;
    author?: string;
    thumbnail: string;
};

type BlogSchemaDto = BlogDto & Document;
type BlogUpdateDto = Partial<BlogDto>;

export { BlogDto, BlogSchemaDto, BlogUpdateDto };