import multer from "multer";
import { storage } from "./cloudinary";

const multerOptions: multer.Options = {
    storage,
};

const upload = multer(multerOptions);

export { upload };