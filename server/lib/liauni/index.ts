import type { LiaUniResponse } from "./types";

export async function fetchTrainDataFromLiaUni(): Promise<LiaUniResponse> {
  const response = await fetch("https://www.linhauni.com.br/api/status/linhauni");
  const data = await response.json();
  return data;
}