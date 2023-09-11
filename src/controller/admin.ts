import { NextFunction, Request, Response } from "express"
import { FetchAllApplications, FetchApplicationBySlug, UpdateApplication } from "../service/application";
import { ApplicationUpdateDto } from "../dto/application";
import { CreateMultipleAsset, FetchAllAssets, FetchAllCaptions, FetchAssetsByGallery } from "../service/asset";
import { AssetDto } from "../dto/asset";
import { CreateBlog, DeleteBlog, FetchAllBlogs, FetchBlogBySlug, UpdateBlog } from "../service/blog";
import { BlogDto, BlogUpdateDto } from "../dto/blog";
import { CreateEvent, DeleteEvent, FetchAllEvents, FetchEventBySlug } from "../service/event";
import { EventDto, EventUpdateDto } from "../dto/event";
import { NoticeDto, NoticeUpdateDto } from "../dto/notice";
import { CreateNotice, DeleteNotice, FetchAllNotices, FetchNoticeBySlug } from "../service/notice";
import slugify from "slugify";

const RenderDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.render("admin/index", { view: "dashboard", title: "Overview" });
    } catch (error) {
        next (error);
    }
};

const RenderApplications = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const applications = await FetchAllApplications();
        return res.render("admin/application/list", { view: "table", title: "Admission", applications });
    } catch (error) {
        next (error);
    }
};

const RenderApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const application = await FetchApplicationBySlug(req.params.slug);
        if (!application) return res.render("admin/404", { view: "dashboard", title: "Not Found" });
        return res.render("admin/application/view", { view: "form", title: "Admission", application });
    } catch (error) {
        next (error);
    }
};

const EditApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const application = await FetchApplicationBySlug(req.params.slug);
        if (!application) return res.render("admin/404", { view: "dashboard", title: "Not Found" });
        const dto: ApplicationUpdateDto = { ...req.body };
        await UpdateApplication(application._id, dto);
        return res.redirect("/admin/admissions");
    } catch (error) {
        next (error);
    }
};

const RenderAssets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const assets = await FetchAllAssets();
        return res.render("admin/asset/list", { view: "table", title: "Media", assets });
    } catch (error) {
        next (error);
    }
};

const RenderAddAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const captions = await FetchAllCaptions();
        return res.render("admin/asset/add", { view: "form", title: "Media", galleries: captions });
    } catch (error) {
        next (error);
    }
};

const AddAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.files) {
             // store all the files in an array
             const files = req.files as Express.Multer.File[];
            console.log(req.body)
             const assets: AssetDto[] = [];
             for (const file of files) {
                assets.push({
                    slug: file.filename.substring(file.filename.indexOf("/") + 1),
                    url: file.path,
                    type: file.mimetype.startsWith('image/') ? "image" : file.mimetype.startsWith('video/') ? "video" : "attachment",
                    mimetype: file.mimetype,
                    caption: req.body.gallery ?? "Public"
                });
             }

             await CreateMultipleAsset(assets);
            return res.status(200).json({ path: "/admin/asset" });
        } else {
            return res.redirect("/admin/asset/add?message=Failed");
        }
    } catch (error) {
        next (error);
    }
};

const RenderBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogs = await FetchAllBlogs();
        return res.render("admin/blog/list", { view: "table", title: "Blog", blogs });
    } catch (error) {
        next (error);
    }
};

const RenderAddBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.render("admin/blog/add", { view: "form", title: "Blog" });
    } catch (error) {
        next (error);
    }
};

const RenderBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blog = await FetchBlogBySlug(req.params.slug);
        if (!blog) return res.render("admin/404", { view: "dashboard", title: "Not Found" });
        return res.render("admin/blog/add", { view: "form", title: "Blog" });
    } catch (error) {
        next (error);
    }
};

const RemoveBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blog = await FetchBlogBySlug(req.params.slug);
        if (!blog) return res.render("admin/404", { view: "dashboard", title: "Not Found" });
        await DeleteBlog(blog._id);
        return res.redirect("/admin/blog");
    } catch (error) {
        next (error);
    }
};

const EditBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blog = await FetchBlogBySlug(req.params.slug);
        if (!blog) return res.render("admin/404", { view: "dashboard", title: "Not Found" });
        const dto: BlogUpdateDto = { ...req.body };
        await UpdateBlog(blog._id, dto);
        return res.redirect("/admin/blog");
    } catch (error) {
        next (error);
    }
};

const AddBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dto: BlogDto = { ...req.body };
        dto.slug = slugify(dto.title);
        await CreateBlog(dto);
        return res.redirect("/admin/blog");
    } catch (error) {
        console.log(error)
        next (error);
    }
};

const RenderEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await FetchAllEvents();
        return res.render("admin/event/list", { view: "table", title: "Event", events });
    } catch (error) {
        next (error);
    }
};

const RenderAddEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const captions = await FetchAllCaptions();
        return res.render("admin/event/add", { view: "form", title: "Event", galleries: captions });
    } catch (error) {
        next (error);
    }
};

const RenderEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event = await FetchEventBySlug(req.params.slug);
        if (!event) return res.render("admin/404", { view: "dashboard", title: "Not Found" });
        return res.render("admin/event/add", { view: "form", title: "Event" });
    } catch (error) {
        next (error);
    }
};

const RemoveEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event = await FetchEventBySlug(req.params.slug);
        if (!event) return res.render("admin/404", { view: "dashboard", title: "Not Found" });
        await DeleteEvent(event._id);
        return res.redirect("/admin/event");
    } catch (error) {
        next (error);
    }
};

const EditEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event = await FetchEventBySlug(req.params.slug);
        if (!event) return res.render("admin/404", { view: "dashboard", title: "Not Found" });
        const dto: EventUpdateDto = { ...req.body };
        await UpdateBlog(event._id, dto);
        return res.redirect("/admin/event");
    } catch (error) {
        next (error);
    }
};

const AddEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dto: EventDto = { ...req.body };
        dto.slug = slugify(dto.title);
        const assets = (await FetchAssetsByGallery(req.body.gallery)).map(image => image.url);
        dto.gallery = assets;
        await CreateEvent(dto);
        return res.redirect("/admin/event");
    } catch (error) {
        console.log(error)
        next (error);
    }
};

const RenderNotices = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notices = await FetchAllNotices();
        return res.render("admin/notice/list", { view: "table", title: "Notice", notices });
    } catch (error) {
        next (error);
    }
};

const RenderAddNotice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.render("admin/notice/add", { view: "form", title: "Notice" });
    } catch (error) {
        next (error);
    }
};

const RenderNotice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notice = await FetchNoticeBySlug(req.params.slug);
        if (!notice) return res.render("admin/404", { view: "dashboard", title: "Not Found" });
        return res.render("admin/notice/add", { view: "form", title: "Notice" });
    } catch (error) {
        next (error);
    }
};

const RemoveNotice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notice = await FetchNoticeBySlug(req.params.slug);
        if (!notice) return res.render("admin/404", { view: "dashboard", title: "Not Found" });
        await DeleteNotice(notice._id);
        return res.redirect("/admin/notice");
    } catch (error) {
        next (error);
    }
};

const EditNotice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notice = await FetchNoticeBySlug(req.params.slug);
        if (!notice) return res.render("admin/404", { view: "dashboard", title: "Not Found" });
        const dto: NoticeUpdateDto = { ...req.body };
        await UpdateBlog(notice._id, dto);
        return res.redirect("/admin/notice");
    } catch (error) {
        next (error);
    }
};

const AddNotice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dto: NoticeDto = { ...req.body };
        dto.slug = slugify(dto.title);
        await CreateNotice(dto);
        return res.redirect("/admin/notice");
    } catch (error) {
        next (error);
    }
};

export {
    RenderDashboard,
    RenderApplications,
    RenderApplication,
    EditApplication,
    RenderAssets,
    RenderAddAsset,
    AddAsset,
    RenderBlogs,
    RenderAddBlog,
    RenderBlog,
    RemoveBlog,
    EditBlog,
    AddBlog,
    RenderEvents,
    RenderAddEvent,
    RenderEvent,
    RemoveEvent,
    EditEvent,
    AddEvent,
    RenderNotices,
    RenderAddNotice,
    RenderNotice,
    RemoveNotice,
    EditNotice,
    AddNotice,
};