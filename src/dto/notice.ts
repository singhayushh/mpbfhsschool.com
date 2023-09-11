import { Document } from "mongoose";

type NoticeDto = {
    slug: string;
    title: string;
    date: string;
    description?: string;
    attachment?: string;
};

type NoticeSchemaDto = NoticeDto & Document;
type NoticeUpdateDto = Partial<NoticeDto>;

export { NoticeDto, NoticeSchemaDto, NoticeUpdateDto };