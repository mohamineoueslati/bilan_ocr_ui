import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BilanInfo } from '../models/bilan-info.model';

@Injectable({
  providedIn: 'root',
})
export class BilanService {
  private url = 'bilans';

  constructor(private http: HttpClient) {}

  public postBilan(bilanInfo: BilanInfo) {
    const formData = new FormData();
    formData.append('matricule', bilanInfo.matricule);
    formData.append('rs', bilanInfo.rs);
    formData.append('year', String(bilanInfo.year));
    formData.append('etat', bilanInfo.etat);
    formData.append('document', bilanInfo.document);

    return this.http.post(`${this.url}/upload`, formData);
  }
}
