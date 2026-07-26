import { getProcessedData } from "@/server/lib/processedData";
import { companiesFetchers } from "@/server/lib/processedData/constants";
import { Companies } from "@/server/lib/processedData/types";
import { Elysia } from "elysia";
import { DefaultModel } from "./model";

export const defaultRouter = new Elysia()
  .get(
    "/brute-data/:company",
    async ({ params }) => {
      const company = params.company as Companies;
      const data = await companiesFetchers[company]();
      return { data };
    },
    {
      params: DefaultModel.getBruteDataCompanyParams,
      detail: {
        tags: ["Default"],
        summary: "Get the raw data from the company.",
        description: "Get the raw data from the company.",
      },
    },
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
        }),
      );
      return data;
    },
    {
      detail: {
        tags: ["Default"],
        summary: "Get the raw data from all companies.",
        description: "Get the raw data from all companies.",
      },
    },
  )
  .get(
    "/processed-data",
    async () => {
      const data = await getProcessedData();
      return data;
    },
    {
      response: {
        200: DefaultModel.getProcessedDataResponse,
      },
      detail: {
        tags: ["Default"],
        summary:
          "Get the status of the metropolitan train in the city of São Paulo.",
        description:
          "Get the status of the metropolitan train in the city of São Paulo.",
      },
    },
  );
