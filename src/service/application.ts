import { Types } from "mongoose";
import {
    ApplicationDto,
    ApplicationSchemaDto,
    ApplicationUpdateDto,
} from "../dto/application";
import { Application } from "../model/application";

const CreateApplication = async (
    createApplicationDto: ApplicationDto
): Promise<ApplicationSchemaDto> => {
    return Application.create(createApplicationDto);
};

const DeleteApplication = async (
    id: Types.ObjectId
): Promise<ApplicationSchemaDto | null> => {
    return Application.findOneAndDelete({ _id: id });
};

const FetchAllApplications = async (): Promise<ApplicationSchemaDto[]> => {
    return Application.find().sort({ createdAt: 1 });
};

const FetchApplicationById = async (
    id: Types.ObjectId
): Promise<ApplicationSchemaDto | null> => {
    return Application.findById(id);
};

const FetchApplicationBySlug = async (
    slug: string
): Promise<ApplicationSchemaDto | null> => {
    return Application.findOne({ slug });
};

const UpdateApplication = async (
    id: Types.ObjectId,
    dto: ApplicationUpdateDto
): Promise<ApplicationSchemaDto | null> => {
    return Application.findOneAndUpdate({ _id: id }, dto, { new: true });
};

export {
    CreateApplication,
    DeleteApplication,
    FetchAllApplications,
    FetchApplicationById,
    FetchApplicationBySlug,
    UpdateApplication,
};
