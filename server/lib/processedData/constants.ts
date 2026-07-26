import { fetchTrainDataFromCCR } from "@/server/lib/ccr";
import { fetchTrainDataFromCPTM } from "@/server/lib/cptm";
import { fetchTrainDataFromMetro } from "@/server/lib/metro";
import { fetchTrainDataFromTIC } from "@/server/lib/tic";
import { fetchTrainDataFromLiaUni } from "@/server/lib/liauni";
import { fetchTrainDataFromTriviaTrens } from "@/server/lib/triviatrens";
import {
  CompanyFethersObjects,
  CompanyProcessorsObjects,
  LineData,
} from "@/server/lib/processedData/types";
import { processMetroLines } from "@/server/lib/processedData/metro";
import { processCPTMLines } from "@/server/lib/processedData/cptm";
import { processCCRLines } from "@/server/lib/processedData/ccr";
import { processTICLines } from "@/server/lib/processedData/tic";
import { processLiaUniLines } from "@/server/lib/processedData/liauni";
import { processTriviaTrensLines } from "@/server/lib/processedData/triviatrens";

export const companiesFetchers: CompanyFethersObjects = {
  metro: fetchTrainDataFromMetro,
  cptm: fetchTrainDataFromCPTM,
  ccr: fetchTrainDataFromCCR,
  tic: fetchTrainDataFromTIC,
  liauni: fetchTrainDataFromLiaUni,
  triviatrens: fetchTrainDataFromTriviaTrens,
};

export const companiesProcessors: CompanyProcessorsObjects = {
  metro: processMetroLines,
  cptm: processCPTMLines,
  ccr: processCCRLines,
  tic: processTICLines,
  liauni: processLiaUniLines,
  triviatrens: processTriviaTrensLines,
};

export const lines: LineData[] = [
  {
    code: 0,
    color: "Preta",
    company: "triviatrens",
  },
  {
    code: 1,
    color: "Azul",
    company: "metro",
  },
  {
    code: 2,
    color: "Verde",
    company: "metro",
  },
  {
    code: 3,
    color: "Vermelha",
    company: "metro",
  },
  {
    code: 4,
    color: "Amarela",
    company: "ccr",
  },
  {
    code: 5,
    color: "Lilás",
    company: "ccr",
  },
  {
    code: 6,
    color: "Laranja",
    company: "liauni",
  },
  {
    code: 7,
    color: "Rubi",
    company: "tic",
  },
  {
    code: 8,
    color: "Diamante",
    company: "ccr",
  },
  {
    code: 9,
    color: "Esmeralda",
    company: "ccr",
  },
  {
    code: 10,
    color: "Turquesa",
    company: "cptm",
  },
  {
    code: 11,
    color: "Coral",
    company: "triviatrens",
  },
  {
    code: 12,
    color: "Safira",
    company: "triviatrens",
  },
  {
    code: 13,
    color: "Jade",
    company: "triviatrens",
  },
  {
    code: 15,
    color: "Prata",
    company: "metro",
  },
  {
    code: 17,
    color: "Ouro",
    company: "metro",
  },
];
