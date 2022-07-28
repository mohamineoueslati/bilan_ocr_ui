import { BilanResponse } from './bilan-response.model';

export interface SearchResult {
  bilans: BilanResponse[];
  total: number;
}
