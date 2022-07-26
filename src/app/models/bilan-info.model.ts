export class BilanInfo {
  public matricule: string;
  public rs: string;
  public year: number;
  public etat: string;
  public document: File;

  constructor(
    matricule: string,
    rs: string,
    year: number,
    etat: string,
    document: File
  ) {
    this.matricule = matricule;
    this.rs = rs;
    this.year = year;
    this.etat = etat;
    this.document = document;
  }
}
