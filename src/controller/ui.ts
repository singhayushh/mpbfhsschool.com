import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { FetchAssetBySlug } from "../service/asset";

const FetchAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const asset = await FetchAssetBySlug(req.params.slug);
        if (!asset) return res.render("404");
        const response = await axios.get(asset.url, { responseType: 'stream' });
        res.setHeader('Content-Type', asset.mimetype);
        response.data.pipe(res);
    } catch (error) {
        next(error);
    }
};

export {
    FetchAsset,
}