import { Types } from "mongoose";
import {
    EventDto,
    EventSchemaDto,
    EventUpdateDto,
} from "../dto/event";
import { Event } from "../model/event";

const CreateEvent = async (
    createEventDto: EventDto
): Promise<EventSchemaDto> => {
    return Event.create(createEventDto);
};

const DeleteEvent = async (
    id: Types.ObjectId
): Promise<EventSchemaDto | null> => {
    return Event.findOneAndDelete({ _id: id });
};

const FetchAllEvents = async (): Promise<EventSchemaDto[]> => {
    return Event.find().sort({ createdAt: 1 });
};

const FetchEventById = async (
    id: Types.ObjectId
): Promise<EventSchemaDto | null> => {
    return Event.findById(id);
};

const FetchEventBySlug = async (
    slug: string
): Promise<EventSchemaDto | null> => {
    return Event.findOne({ slug });
};

const UpdateEvent = async (
    id: Types.ObjectId,
    dto: EventUpdateDto
): Promise<EventSchemaDto | null> => {
    return Event.findOneAndUpdate({ _id: id }, dto, { new: true });
};

export {
    CreateEvent,
    DeleteEvent,
    FetchAllEvents,
    FetchEventById,
    FetchEventBySlug,
    UpdateEvent,
};
