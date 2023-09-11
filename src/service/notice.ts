import { Types } from "mongoose";
import {
    NoticeDto,
    NoticeSchemaDto,
    NoticeUpdateDto,
} from "../dto/notice";
import { Notice } from "../model/notice";

const CreateNotice = async (
    createNoticeDto: NoticeDto
): Promise<NoticeSchemaDto> => {
    return Notice.create(createNoticeDto);
};

const DeleteNotice = async (
    id: Types.ObjectId
): Promise<NoticeSchemaDto | null> => {
    return Notice.findOneAndDelete({ _id: id });
};

const FetchAllNotices = async (): Promise<NoticeSchemaDto[]> => {
    return Notice.find().sort({ createdAt: 1 });
};

const FetchNoticeById = async (
    id: Types.ObjectId
): Promise<NoticeSchemaDto | null> => {
    return Notice.findById(id);
};

const FetchNoticeBySlug = async (
    slug: string
): Promise<NoticeSchemaDto | null> => {
    return Notice.findOne({ slug });
};

const UpdateNotice = async (
    id: Types.ObjectId,
    dto: NoticeUpdateDto
): Promise<NoticeSchemaDto | null> => {
    return Notice.findOneAndUpdate({ _id: id }, dto, { new: true });
};

export {
    CreateNotice,
    DeleteNotice,
    FetchAllNotices,
    FetchNoticeById,
    FetchNoticeBySlug,
    UpdateNotice,
};
