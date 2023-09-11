import { model, Model, Schema } from "mongoose";
import { NoticeSchemaDto } from "../dto/notice";

const noticeSchema: Schema<NoticeSchemaDto> = new Schema(
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
        date: {
            type: String,
            required: true,
        },
        description: String,
        attachment: String,
    },
    {
        timestamps: true,
    }
);

const Notice: Model<NoticeSchemaDto> = model("Notice", noticeSchema);

export { Notice };
