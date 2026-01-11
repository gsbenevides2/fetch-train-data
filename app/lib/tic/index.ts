import {
  TICLineStatusesResponse,
  TICOwnerLineResponse,
} from "@/app/lib/tic/types";

export async function fetchTrainDataFromTIC() {
  const toJson = (response: Response) => response.json();
  const fetchOptions: RequestInit = {
    cache: "no-store",
  };
  const [lineStatuses, ownerLineStatuses] = (await Promise.all([
    fetch(
      "https://www.tictrens.com.br/helper/line-statuses",
      fetchOptions
    ).then(toJson),
    fetch(
      "https://www.tictrens.com.br/helper/owner-line-statuses",
      fetchOptions
    ).then(toJson),
  ])) as [TICLineStatusesResponse, TICOwnerLineResponse];
  return { lineStatuses, ownerLineStatuses };
}
