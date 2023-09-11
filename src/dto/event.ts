import { Document } from "mongoose";

type EventDto = {
    slug: string;
    title: string;
    date: string;
    description: string;
    gallery: string[];
    thumbnail: string;
};

type EventSchemaDto = EventDto & Document;
type EventUpdateDto = Partial<EventDto>;

export { EventDto, EventSchemaDto, EventUpdateDto };