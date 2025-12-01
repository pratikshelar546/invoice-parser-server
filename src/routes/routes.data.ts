import { Route } from "./routes.types.js";
import Routers from "../module/routes.js";
import { ExcludedPath } from "../middleware/token.validate.js";

const routes = [
  new Route("/invoice", Routers.parserRoutes)
];

export default routes;

export const excludedPaths = [
  new ExcludedPath("/health", "GET"),
];
