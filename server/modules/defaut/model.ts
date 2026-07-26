import { type UnwrapSchema } from "elysia";
import z from "zod";

export const DefaultModel = {
  // Brute Data
  getBruteDataCompanyParams: z.object({
    company: z.enum({
      metro: "metro",
      cptm: "cptm",
      ccr: "ccr",
      tic: "tic",
      liauni: "liauni",
      triviatrens: "triviatrens",
    }),
  }),
  // Get Processed Data Response
  getProcessedDataResponse: z.array(
    z
      .object({
        status: z.string().meta({
          title: "Status",
          description: "The status of the train",
          enum: ["OK", "WARNING", "CRITICAL", "UNKNOWN"],
          example: "OK",
        }),
        codigo: z.number().meta({
          title: "Código",
          description: "The code of the train",
          example: 1,
        }),
        descricao: z.string().optional().meta({
          title: "Descrição",
          description: "The description of the train",
          example: "Normal",
        }),
        situacao: z.string().meta({
          title: "Situação",
          description: "The situation of the train",
          example: "Normal",
        }),
        cor: z.string().meta({
          title: "Cor",
          description: "The color of the train",
          example: "Verde",
        }),
      })
      .meta({
        title: "Linhas de Trem",
        description: "The status of the train",
      }),
  ),
} as const;

export type DefaultModel = {
  [k in keyof typeof DefaultModel]: UnwrapSchema<(typeof DefaultModel)[k]>;
};
