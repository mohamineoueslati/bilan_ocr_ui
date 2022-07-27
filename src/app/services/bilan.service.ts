import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BilanDocument } from '../models/bilan-document.model';
import { BilanResponse } from '../models/bilan-response.model';
import { Bilan } from '../models/bilan.model';

@Injectable({
  providedIn: 'root',
})
export class BilanService {
  private url = 'bilans';

  constructor(private http: HttpClient) {}

  public getBilans() {
    return this.http.get<BilanResponse[]>(this.url);
  }

  public getBilan(matricule: string) {
    return this.http.get<BilanResponse>(`${this.url}/${matricule}`);
  }

  public postBilan(bilanInfo: BilanDocument) {
    const formData = new FormData();
    formData.append('matricule', bilanInfo.matricule);
    formData.append('rs', bilanInfo.rs);
    formData.append('year', String(bilanInfo.year));
    formData.append('etat', bilanInfo.etat);
    formData.append('document', bilanInfo.document);

    return this.http.post(`${this.url}/upload`, formData);
  }

  public updateBilan(matricule: string, bilan: Bilan) {
    return this.http.put(`${this.url}/${matricule}`, bilan);
  }

  public deleteBilan(matricule: string) {
    return this.http.delete(`${this.url}/${matricule}`);
  }
}
