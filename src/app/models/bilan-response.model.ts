import { Bilan } from './bilan.model';

export interface BilanResponse extends Bilan {
  createdAt: Date;
  ownerUsername: string;
}
