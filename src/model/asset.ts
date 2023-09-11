import { model, Model, Schema } from "mongoose";
import { AssetSchemaDto } from "../dto/asset";

const assetSchema: Schema<AssetSchemaDto> = new Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        url: {
            type: String,
            unique: true,
            required: true,
        },
        caption: String,
        type: {
            type: String,
            required: true,
        },
        mimetype: {
            type: String,
            required: true,
        },
        uploadedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Asset: Model<AssetSchemaDto> = model("Asset", assetSchema);

export { Asset };
