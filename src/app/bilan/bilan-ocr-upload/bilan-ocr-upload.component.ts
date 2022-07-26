import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BilanInfo } from 'src/app/models/bilan-info.model';
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
      const bilanInfo = new BilanInfo(
        form.value.matricule,
        form.value.rs,
        form.value.year,
        form.value.etat,
        this.document
      );

      this.bilanService.postBilan(bilanInfo).subscribe();
    }
  }

  public onSelectDoc(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.document = file;
    }
  }
}
