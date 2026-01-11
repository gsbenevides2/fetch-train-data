import { fetchTrainDataFromCCR } from "@/app/lib/ccr";
import { fetchTrainDataFromCPTM } from "@/app/lib/cptm";
import { fetchTrainDataFromMetro } from "@/app/lib/metro";
import { fetchTrainDataFromTIC } from "@/app/lib/tic";
import {
  CompanyFethersObjects,
  CompanyProcessorsObjects,
  LineData,
} from "@/app/lib/processedData/types";
import { processMetroLines } from "@/app/lib/processedData/metro";
import { processCPTMLines } from "@/app/lib/processedData/cptm";
import { processCCRLines } from "@/app/lib/processedData/ccr";
import { processTICLines } from "@/app/lib/processedData/tic";

export const companiesFetchers: CompanyFethersObjects = {
  metro: fetchTrainDataFromMetro,
  cptm: fetchTrainDataFromCPTM,
  ccr: fetchTrainDataFromCCR,
  tic: fetchTrainDataFromTIC,
};

export const companiesProcessors: CompanyProcessorsObjects = {
  metro: processMetroLines,
  cptm: processCPTMLines,
  ccr: processCCRLines,
  tic: processTICLines,
};

export const lines: LineData[] = [
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
    company: "cptm",
  },
  {
    code: 12,
    color: "Safira",
    company: "cptm",
  },
  {
    code: 13,
    color: "Jade",
    company: "cptm",
  },
  {
    code: 15,
    color: "Prata",
    company: "metro",
  },
];
