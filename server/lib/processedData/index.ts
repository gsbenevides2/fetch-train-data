import { companiesProcessors } from "@/server/lib/processedData/constants";
import { Companies } from "@/server/lib/processedData/types";

export async function getProcessedData() {
  const companiesKeys = Object.keys(companiesProcessors) as Companies[];
  const data = await Promise.all(
    companiesKeys.map(async (company) => {
      const data = await companiesProcessors[company]();
      return data;
    }),
  );
  return data.flat().sort((a, b) => a.codigo - b.codigo);
}
