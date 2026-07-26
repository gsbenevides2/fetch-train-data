import { fetchTrainDataFromCCR } from "@/server/lib/ccr";
import { lines } from "@/server/lib/processedData/constants";
import { ProcessedDataLine } from "@/server/lib/processedData/types";
import { getStatus } from "@/server/lib/processedData/utils";

export async function processCCRLines() {
  const ccrLines = lines.filter((line) => line.company === "ccr");
  const data = await fetchTrainDataFromCCR();
  const ccrLinesData = data.data.concessoes.flatMap(
    (concess) => concess.linhas,
  );
  const processedData = ccrLines.map((line) => {
    const lineData = ccrLinesData.find(
      (item) => item.numero.toString() === line.code.toString(),
    );
    const processedLine: ProcessedDataLine = {
      codigo: line.code,
      cor: line.color,
      situacao: lineData?.statusLinha.status ?? "",
      status: getStatus(lineData?.statusLinha.status ?? ""),
      descricao: lineData?.statusLinha.descricao ?? "",
    };
    return processedLine;
  });
  return processedData;
}
