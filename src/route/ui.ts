import { Router } from "express";
import * as ui from "../controller/ui";

const UIRouter: Router = Router();

UIRouter.get("/asset/:slug", ui.FetchAsset)

export { UIRouter };