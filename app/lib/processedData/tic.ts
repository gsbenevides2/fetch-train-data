// TIC Trens possui apenas a linha 7, que é a linha 7 do TIC Trens
import { lines } from "@/app/lib/processedData/constants";
import { ProcessedDataLine } from "@/app/lib/processedData/types";
import { getStatus } from "@/app/lib/processedData/utils";
import { fetchTrainDataFromTIC } from "@/app/lib/tic";

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
