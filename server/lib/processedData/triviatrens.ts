// Trivia Trens administra as linhas 11 (Coral), 12 (Safira), 13 (Jade) e 0 (Expresso Aeroporto)
import { lines } from "@/server/lib/processedData/constants";
import { ProcessedDataLine } from "@/server/lib/processedData/types";
import { getStatus } from "@/server/lib/processedData/utils";
import { fetchTrainDataFromTriviaTrens } from "@/server/lib/triviatrens";

export async function processTriviaTrensLines() {
  const triviatrensLines = lines.filter(
    (line) => line.company === "triviatrens",
  );
  const data = await fetchTrainDataFromTriviaTrens();
  const processedData = triviatrensLines.map((line) => {
    const lineData = data.data.listItem.find(
      (item) => Number(item.code) === line.code,
    );
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
