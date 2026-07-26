export interface TICLineStatusesResponse {
  status: boolean;
  data: TICLineStatuses[];
}

export interface TICLineStatuses {
  listItem: TICListItem[];
  dateUpdate: string;
  type: string;
}

export interface TICListItem {
  id: string;
  line: string;
  color: string;
  status: string;
  statusColor: string;
  description: string;
  code: string;
}

export interface TICOwnerLineResponse {
  status: boolean;
  data: TICOwnerLines[];
}

export interface TICOwnerLines {
  id: number;
  type: string;
  status: TICOwnerLineStatuses;
  description: string | null;
}

export interface TICOwnerLineStatuses {
  id: number;
  name: string;
  statusCode: number;
  statusColor: string;
}
