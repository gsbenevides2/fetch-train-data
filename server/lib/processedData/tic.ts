// TIC Trens possui apenas a linha 7, que é a linha 7 do TIC Trens
import { lines } from "@/server/lib/processedData/constants";
import { ProcessedDataLine } from "@/server/lib/processedData/types";
import { getStatus } from "@/server/lib/processedData/utils";
import { fetchTrainDataFromTIC } from "@/server/lib/tic";

export async function processTICLines() {
  const line = lines.find((line) => line.company === "tic");
  const data = await fetchTrainDataFromTIC();
  const firstItem = data.ownerLineStatuses.data[0];
  const processedLine: ProcessedDataLine = {
    codigo: line?.code ?? 0,
    cor: line?.color ?? "",
    situacao: firstItem?.status.name ?? "",
    status: getStatus(firstItem?.status.name ?? ""),
    descricao: firstItem?.description ?? "",
  };
  return [processedLine];
}
