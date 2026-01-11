import { fetchTrainDataFromCPTM } from "@/app/lib/cptm";
import { lines } from "@/app/lib/processedData/constants";
import { ProcessedDataLine } from "@/app/lib/processedData/types";
import { getStatus } from "@/app/lib/processedData/utils";

export async function processCPTMLines() {
  const cptmLines = lines.filter((line) => line.company === "cptm");
  const data = await fetchTrainDataFromCPTM();
  const processedData = cptmLines.map((line) => {
    const lineData = data.find((item) => item.linhaId === line.code);
    const processedLine: ProcessedDataLine = {
      codigo: line.code,
      cor: line.color,
      situacao: lineData?.status ?? "",
      status: getStatus(lineData?.status ?? ""),
      descricao: lineData?.descricao ?? "",
    };
    return processedLine;
  });
  return processedData;
}
