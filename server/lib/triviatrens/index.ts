import type { TriviaTrensResponse } from "./types";

export async function fetchTrainDataFromTriviaTrens(): Promise<TriviaTrensResponse> {
  const response = await fetch(
    "https://www.triviatrens.com.br/helper/owner-line-statuses",
    { cache: "no-store" },
  );
  const data = await response.json();
  return data;
}
