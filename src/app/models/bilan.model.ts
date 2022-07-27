import { BilanInfo } from './bilan-info.model';

export interface Bilan extends BilanInfo {
  immoInc: number;
  ammortissementsImmoInco: number;
  immoCorp: number;
  ammortissementsImmoCorp: number;
  immoFinancieres: number;
  provImmoFinanciere: number;
  autreActifsNonCourant: number;
  stocks: number;
  provStocks: number;
  cltCompteRattache: number;
  provClt: number;
  autreActifsCourants: number;
  placementsAutresActifsFinanciers: number;
  liquidite: number;
  capital: number;
  reserves: number;
  autresCapitauxPropes: number;
  resultatReportes: number;
  resultatExercie: number;
  emprunts: number;
  autresPassifsFinanciers: number;
  provPassifsNonCourants: number;
  fournisseurs: number;
  autresPassifsCourants: number;
  concours_bancaires: number;
  revenus: number;
  autresProduits: number;
  productionImmobilisee: number;
  variationStock: number;
  achatConsomme: number;
  achatApprov: number;
  chargesPersonnel: number;
  dotationsAmmort: number;
  autresChargesExploit: number;
  chargesFinanciere: number;
  produitsPlacements: number;
  autresGains: number;
  autresPertes: number;
  impots: number;
  elementsExtra: number;
  modifComptables: number;
}
