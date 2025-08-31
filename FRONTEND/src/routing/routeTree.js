import RootLayout from "../RootLayout";
import { createRootRoute } from "@tanstack/react-router";
import { homePageRoute } from "./homepage";
import { authRoute } from "./auth.route";
import { dashboardRoute } from "./dashboard";

export const rootRoute = createRootRoute({
  component: RootLayout,
});
export const routeTree = rootRoute.addChildren([
  homePageRoute,
  authRoute,
  dashboardRoute,
]);
