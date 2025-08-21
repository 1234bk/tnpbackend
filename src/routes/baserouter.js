import { Router } from "express";
import tnpRouter from "../modules/tnp/routes/base.route.js";
import placementQuizRouter from "../modules/placement_quiz/routes/base.route.js";
import alumniMeetRouter from "../modules/alumni_meet/routes/base.route.js";
import guestLectureRouter from "../modules/guest_lecture/routes/base.route.js";
import industrialVisitRouter from "../modules/industrial_visit/routes/base.route.js";
// import { login } from "../controllers/adminlogin.js";
const baseRouter = Router();

// ----ADD MODULE ROUTES HERE-----
baseRouter.use("/", tnpRouter);
baseRouter.use("/quiz", placementQuizRouter);
baseRouter.use("/alumni-meet", alumniMeetRouter);
baseRouter.use("/industrial-visit", industrialVisitRouter);
baseRouter.use("/guestLecture", guestLectureRouter);
// baseRouter.use("/login",login);
export default baseRouter;
