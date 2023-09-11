import { Types } from "mongoose";
import {
    BlogDto,
    BlogSchemaDto,
    BlogUpdateDto,
} from "../dto/blog";
import { Blog } from "../model/blog";

const CreateBlog = async (
    createBlogDto: BlogDto
): Promise<BlogSchemaDto> => {
    return Blog.create(createBlogDto);
};

const DeleteBlog = async (
    id: Types.ObjectId
): Promise<BlogSchemaDto | null> => {
    return Blog.findOneAndDelete({ _id: id });
};

const FetchAllBlogs = async (): Promise<BlogSchemaDto[]> => {
    return Blog.find().sort({ createdAt: 1 });
};

const FetchBlogById = async (
    id: Types.ObjectId
): Promise<BlogSchemaDto | null> => {
    return Blog.findById(id);
};

const FetchBlogBySlug = async (
    slug: string
): Promise<BlogSchemaDto | null> => {
    return Blog.findOne({ slug });
};

const UpdateBlog = async (
    id: Types.ObjectId,
    dto: BlogUpdateDto
): Promise<BlogSchemaDto | null> => {
    return Blog.findOneAndUpdate({ _id: id }, dto, { new: true });
};

export {
    CreateBlog,
    DeleteBlog,
    FetchAllBlogs,
    FetchBlogById,
    FetchBlogBySlug,
    UpdateBlog,
};
