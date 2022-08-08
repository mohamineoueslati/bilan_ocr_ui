import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BilanDocument } from 'src/app/models/bilan-document.model';
import { BilanService } from 'src/app/services/bilan.service';

@Component({
  selector: 'app-bilan-ocr-upload',
  templateUrl: './bilan-ocr-upload.component.html',
  styleUrls: ['./bilan-ocr-upload.component.css'],
})
export class BilanOcrUploadComponent implements OnInit {
  private document?: File;
  public isLoading = false;

  constructor(private bilanService: BilanService, private route: Router) {}

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

      this.isLoading = true;
      this.bilanService.postBilan(bilanDoc).subscribe((bilan) => {
        this.isLoading = false;
        this.route.navigate(['bilan', 'details', bilan.matricule]);
      });
    }
  }

  public onSelectDoc(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.document = file;
    }
  }
}
