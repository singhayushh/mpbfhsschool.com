import { Document, Types } from "mongoose";

type AssetDto = {
    slug: string;
    url: string;
    caption?: string;
    type: string;
    mimetype: string;
    uploadedBy?: Types.ObjectId;
};

type AssetUpdateDto = Partial<AssetDto>;
type AssetSchemaDto = Document & AssetDto;

export { AssetDto, AssetSchemaDto, AssetUpdateDto };
