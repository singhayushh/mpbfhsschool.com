import { Types } from "mongoose";
import {
    AssetDto,
    AssetSchemaDto,
    AssetUpdateDto,
} from "../dto/asset";
import { Asset } from "../model/asset";

const CreateAsset = async (
    createAssetDto: AssetDto
): Promise<AssetSchemaDto> => {
    return Asset.create(createAssetDto);
};

const CreateMultipleAsset = async (
    createAssetDto: AssetDto[]
): Promise<AssetSchemaDto[]> => {
    return Asset.create(createAssetDto);
};

const DeleteAsset = async (
    id: Types.ObjectId
): Promise<AssetSchemaDto | null> => {
    return Asset.findOneAndDelete({ _id: id });
};

const FetchAllAssets = async (): Promise<AssetSchemaDto[]> => {
    return Asset.find().sort({ createdAt: 1 });
};

const FetchAssetsByGallery = async (caption: string): Promise<AssetSchemaDto[]> => {
    return Asset.find({ caption }).sort({ createdAt: 1 });
};

const FetchAllCaptions = async (): Promise<string[]> => {
    return Asset.distinct('caption');
};

const FetchAssetById = async (
    id: Types.ObjectId
): Promise<AssetSchemaDto | null> => {
    return Asset.findById(id);
};

const FetchAssetBySlug = async (
    slug: string
): Promise<AssetSchemaDto | null> => {
    return Asset.findOne({ slug });
};

const UpdateAsset = async (
    id: Types.ObjectId,
    dto: AssetUpdateDto
): Promise<AssetSchemaDto | null> => {
    return Asset.findOneAndUpdate({ _id: id }, dto, { new: true });
};

export {
    CreateAsset,
    CreateMultipleAsset,
    DeleteAsset,
    FetchAllAssets,
    FetchAllCaptions,
    FetchAssetsByGallery,
    FetchAssetById,
    FetchAssetBySlug,
    UpdateAsset,
};
