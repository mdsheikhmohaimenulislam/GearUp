import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import config from "./config";
import cors from "cors";
import { authRouter } from "./modules/auth/auth.route";
import { notFound } from "./middleWares/notFound";
import { globalErrorHandling } from "./middleWares/globalErrorHandler";
import { providerRoutes } from "./modules/provider/provider.routes";
import { categoryRouter } from "./modules/category/category.route";


const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);





app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});



app.use("/api/auth", authRouter);
app.use("/api/provider", providerRoutes)
app.use("/api/categories", categoryRouter)


app.use(notFound);

app.use(globalErrorHandling);


export default app;
