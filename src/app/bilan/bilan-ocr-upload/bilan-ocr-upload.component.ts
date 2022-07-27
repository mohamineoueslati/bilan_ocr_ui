import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BilanDocument } from 'src/app/models/bilan-document.model';
import { BilanService } from 'src/app/services/bilan.service';

@Component({
  selector: 'app-bilan-ocr-upload',
  templateUrl: './bilan-ocr-upload.component.html',
  styleUrls: ['./bilan-ocr-upload.component.css'],
})
export class BilanOcrUploadComponent implements OnInit {
  private document?: File;

  constructor(private bilanService: BilanService) {}

  ngOnInit(): void {}

  public onSubmit(form: NgForm): void {
    if (form.valid && this.document) {
      const bilanDoc: BilanDocument = {
        matricule: form.value.matricule,
        rs: form.value.rs,
        year: form.value.year,
        etat: form.value.etat,
        document: this.document,
      };

      this.bilanService.postBilan(bilanDoc).subscribe();
    }
  }

  public onSelectDoc(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.document = file;
    }
  }
}
