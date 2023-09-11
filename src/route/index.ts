import { Request, Response, Router } from "express";
import { UIRouter } from "./ui";
import { AdminRouter } from "./admin";

const mainRouter: Router = Router();

mainRouter.use("/", UIRouter);
mainRouter.use("/admin", AdminRouter);

mainRouter.use((req: Request, res: Response) => {
    return res.render("404", { page: "404" });
});

export { mainRouter };