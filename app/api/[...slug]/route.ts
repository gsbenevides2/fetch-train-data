import { getProcessedData } from "@/app/lib/processedData";
import { companiesFetchers } from "@/app/lib/processedData/constants";
import { Companies } from "@/app/lib/processedData/types";
import { coolifyHealthChecker } from "@/app/plugins/coolify-healtcheker";
import { getProjectInfo } from "@/app/utils/getProjectInfo";
import openapi from "@elysiajs/openapi";
import { Elysia, t } from "elysia";
import { UnauthorizedError, AuthService } from "@/app/services/AuthService";

const app = new Elysia({
  prefix: "/api",
  tags: ["Default"],
  detail: {
    security: [
      {
        headerAuth: [],
      },
    ],
  },
})

  .use(
    openapi({
      documentation: {
        info: getProjectInfo(),
        tags: [
          {
            name: "Default",
          },
          {
            name: "Coolify",
            description: "Coolify Utils",
          },
        ],
        components: {
          securitySchemes: {
            headerAuth: {
              type: "apiKey",
              in: "header",
              name: "Authorization",
              description: "Authentication token",
            },
          },
        },
      },
    })
  )
  .use(coolifyHealthChecker)
  .onBeforeHandle(async ({ headers }) => {
    const token = headers?.authorization;
    if (!token) {
      throw new UnauthorizedError();
    }
    const decoded = await AuthService.verify(token);
    if (!decoded) {
      throw new UnauthorizedError();
    }
  })
  .get(
    "/brute-data/:company",
    async ({ params }) => {
      const company = params.company as Companies;
      const data = await companiesFetchers[company]();
      return { data };
    },
    {
      params: t.Object({
        company: t.Enum({
          metro: "metro",
          cptm: "cptm",
          ccr: "ccr",
          tic: "tic",
        }),
      }),
      detail: {
        tags: ["Default"],
        summary: "Get the raw data from the company.",
        description: "Get the raw data from the company.",
      },
    }
  )
  .get(
    "/brute-data/all",
    async () => {
      const companiesKeys = Object.keys(companiesFetchers) as Companies[];
      const data = await Promise.all(
        companiesKeys.map(async (company) => {
          const data = await companiesFetchers[company]();
          return {
            [company]: data,
          };
        })
      );
      return data;
    },
    {
      detail: {
        tags: ["Default"],
        summary: "Get the raw data from all companies.",
        description: "Get the raw data from all companies.",
      },
    }
  )
  .get(
    "/processed-data",
    async () => {
      const data = await getProcessedData();
      return data;
    },
    {
      response: {
        200: t.Array(
          t.Object({
            status: t.String({
              title: "Status",
              description: "The status of the train",
              enum: ["OK", "WARNING", "CRITICAL", "UNKNOWN"],
              example: "OK",
            }),
            codigo: t.Number({
              title: "Código",
              description: "The code of the train",
              example: 1,
            }),
            descricao: t.Optional(
              t.String({
                title: "Descrição",
                description: "The description of the train",
                example: "Normal",
              })
            ),
            situacao: t.String({
              title: "Situação",
              description: "The situation of the train",
              example: "Normal",
            }),
            cor: t.String({
              title: "Cor",
              description: "The color of the train",
              example: "Verde",
            }),
          }),
          {
            title: "Linhas de Trem",
            description: "The status of the train",
          }
        ),
      },
      detail: {
        tags: ["Default"],
        summary:
          "Get the status of the metropolitan train in the city of São Paulo.",
        description:
          "Get the status of the metropolitan train in the city of São Paulo.",
      },
    }
  );

export const GET = app.fetch;
