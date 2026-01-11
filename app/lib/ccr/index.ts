import { CCRResponse } from "@/app/lib/ccr/types";

export async function fetchTrainDataFromCCR() {
  const response = await fetch(
    "https://webapi.grupoccr.com.br/v1/mobility/public/line-status/current/state/SP",
    {
      cache: "no-store",
    }
  );
  const data = (await response.json()) as CCRResponse;
  return data;
}
