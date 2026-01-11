import { Status } from "@/app/lib/processedData/types";

export function getStatus(situation: string): Status {
  const lowerSituation = situation.toLowerCase();
  if (lowerSituation.includes("normal")) return "OK";
  const warningStatus = [
    "atividade programada",
    "circulação de trens",
    "impacto pontual",
    "diferenciada",
    "especial",
    "parcial",
    "velocidade reduzida",
  ];
  if (warningStatus.some((status) => lowerSituation.includes(status)))
    return "WARNING";
  if (lowerSituation.includes("paralisada")) return "CRITICAL";
  if (lowerSituation.includes("encerrada")) return "UNKNOWN";
  return "UNKNOWN";
}
