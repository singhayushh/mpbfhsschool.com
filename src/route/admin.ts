import { Router } from "express";
import * as admin from "../controller/admin";
import { upload } from "../config/multer";

const AdminRouter: Router = Router();

AdminRouter.get("/", admin.RenderDashboard);

AdminRouter.get("/admissions", admin.RenderApplications);
AdminRouter.get("/admissions/:slug", admin.RenderApplication);
AdminRouter.post("/admissions/:slug", admin.EditApplication);

AdminRouter.get("/asset", admin.RenderAssets);
AdminRouter.get("/asset/new", admin.RenderAddAsset);
AdminRouter.post("/asset", upload.array("files"), admin.AddAsset);

AdminRouter.get("/blog", admin.RenderBlogs);
AdminRouter.get("/blog/new", admin.RenderAddBlog);
AdminRouter.get("/blog/edit/:slug", admin.RenderBlog);
AdminRouter.get("/blog/delete/:slug", admin.RemoveBlog);
AdminRouter.post("/blog/:slug", admin.EditBlog);
AdminRouter.post("/blog", admin.AddBlog);

AdminRouter.get("/event", admin.RenderEvents);
AdminRouter.get("/event/new", admin.RenderAddEvent);
AdminRouter.get("/event/edit/:slug", admin.RenderEvent);
AdminRouter.get("/event/delete/:slug", admin.RemoveEvent);
AdminRouter.post("/event/:slug", admin.EditEvent);
AdminRouter.post("/event", admin.AddEvent);

AdminRouter.get("/notice", admin.RenderNotices);
AdminRouter.get("/notice/new", admin.RenderAddNotice);
AdminRouter.get("/notice/edit/:slug", admin.RenderNotice);
AdminRouter.get("/notice/delete/:slug", admin.RemoveNotice);
AdminRouter.post("/notice/:slug", admin.EditNotice);
AdminRouter.post("/notice", admin.AddNotice);

export { AdminRouter };