import { CPTMline } from "@/app/lib/cptm/types";

export async function fetchTrainDataFromCPTM() {
  const response = await fetch(
    "https://api.cptm.sp.gov.br/AppCPTM/v1/Linhas/ObterStatus",
    {
      cache: "no-store",
    }
  );

  const data = (await response.json()) as CPTMline[];
  return data;
}
