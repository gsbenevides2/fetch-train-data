export interface TriviaTrensListItem {
  id: string;
  line: string;
  color: string;
  status: string;
  statusColor: string;
  description: string;
  code: string;
}

export interface TriviaTrensData {
  listItem: TriviaTrensListItem[];
  dateUpdate: string;
  type: string;
}

export interface TriviaTrensResponse {
  status: boolean;
  data: TriviaTrensData;
}
