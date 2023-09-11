import { model, Model, Schema } from "mongoose";
import { EventSchemaDto } from "../dto/event";

const eventSchema: Schema<EventSchemaDto> = new Schema(
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
        description: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        gallery: [{ type: String }],
        thumbnail: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Event: Model<EventSchemaDto> = model("Event", eventSchema);

export { Event };
