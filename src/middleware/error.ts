import { NextFunction, Request, Response } from "express";

const ErrorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.render("500", { title: "500: Oops, something went wrong!", error });
};

export { ErrorHandler };