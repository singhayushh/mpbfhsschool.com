import { model, Model, Schema } from "mongoose";
import { BlogSchemaDto } from "../dto/blog";

const blogSchema: Schema<BlogSchemaDto> = new Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        author: String,
        thumbnail: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Blog: Model<BlogSchemaDto> = model("Blog", blogSchema);

export { Blog };
