export interface ProcessedDataLine {
  codigo: number;
  cor: string;
  situacao: string;
  status: Status;
  descricao?: string;
}

export type Status = "OK" | "WARNING" | "CRITICAL" | "UNKNOWN";

export type Companies = "metro" | "cptm" | "ccr" | "tic";

export interface LineData {
  code: number;
  color: string;
  company: Companies;
}

export type CompanyFethersObjects = Record<Companies, () => Promise<unknown>>;

export type CompanyProcessorsObjects = Record<
  Companies,
  () => Promise<ProcessedDataLine[]>
>;
