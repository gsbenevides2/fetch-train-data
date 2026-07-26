// LiaUni possui apenas a linha 6 (Linha 6-Laranja)
import { lines } from "@/server/lib/processedData/constants";
import { ProcessedDataLine } from "@/server/lib/processedData/types";
import { getStatus } from "@/server/lib/processedData/utils";
import { fetchTrainDataFromLiaUni } from "@/server/lib/liauni";

export async function processLiaUniLines() {
  const line = lines.find((line) => line.company === "liauni");
  const data = await fetchTrainDataFromLiaUni();
  const firstItem = data.data.listItem[0];
  const processedLine: ProcessedDataLine = {
    codigo: line?.code ?? 0,
    cor: line?.color ?? "",
    situacao: firstItem?.status ?? "",
    status: getStatus(firstItem?.status ?? ""),
    descricao: firstItem?.description ?? "",
  };
  return [processedLine];
}