import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // index("routes/home.tsx"),
  route("/auth", "routes/auth.tsx"),

  layout("layouts/MainLayout.tsx", [
    index("routes/home.tsx"),
    route("/upload", "routes/upload.tsx"),
  ]),
] satisfies RouteConfig;
