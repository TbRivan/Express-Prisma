import type { Application, Router } from "express";
import { UserRouter } from "./user.post";
import { PostRouter } from "./post.router";

const _routes: Array<[string, Router]> = [
  ["/user", UserRouter],
  ["/post", PostRouter],
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};
