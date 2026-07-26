import { lines } from "@/server/lib/processedData/constants";
import { fetchTrainDataFromMetro } from "@/server/lib/metro";
import { ProcessedDataLine } from "@/server/lib/processedData/types";
import { getStatus } from "@/server/lib/processedData/utils";

export async function processMetroLines() {
  const metroLines = lines.filter((line) => line.company === "metro");
  const data = await fetchTrainDataFromMetro();
  const processedData = metroLines.map((line) => {
    const lineData = data.find((item) => item.number === line.code.toString());
    const processedLine: ProcessedDataLine = {
      codigo: line.code,
      cor: line.color,
      situacao: lineData?.status ?? "",
      status: getStatus(lineData?.status ?? ""),
      descricao: lineData?.description ?? "",
    };
    return processedLine;
  });
  return processedData;
}
