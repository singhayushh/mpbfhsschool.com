import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const CLOUDINARY_CLOUD_NAME = String(process.env.CLOUDINARY_CLOUD_NAME);
const CLOUDINARY_API_KEY = String(process.env.CLOUDINARY_API_KEY);
const CLOUDINARY_API_SECRET = String(process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

const params = {
    folder: "MPB",
    public_id: (_req: any, file: any) => {
        const date = new Date();
        return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}-${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}-${date.getSeconds().toString().padStart(2, '0')}-${file.originalname.substring(0, file.originalname.lastIndexOf("."))}`
    },
};

const storage = new CloudinaryStorage({
    cloudinary,
    params,
});

export { cloudinary, storage };