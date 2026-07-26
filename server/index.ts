import Elysia from "elysia";
import { openapi } from "@/server/openapi";
import { defaultRouter } from "@/server/modules/defaut";
import { coolifyHealthChecker } from "@/server/plugins/coolify-healtcheker";

export const app = new Elysia({ prefix: "/api" })
  .use(openapi)
  .use(coolifyHealthChecker)
  .use(defaultRouter);
