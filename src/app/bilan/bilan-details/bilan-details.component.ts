import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BilanResponse } from 'src/app/models/bilan-response.model';
import { BilanService } from 'src/app/services/bilan.service';

@Component({
  selector: 'app-bilan-details',
  templateUrl: './bilan-details.component.html',
  styleUrls: ['./bilan-details.component.css'],
})
export class BilanDetailsComponent implements OnInit {
  public bilan?: BilanResponse;

  public selectedBilanKey: BilanKeys = 'immoInc';

  constructor(
    private bilanService: BilanService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  onRowClick(key: BilanKeys, content: any) {
    this.selectedBilanKey = key;
    this.openModal(content);
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
    const matricule = this.route.snapshot.params['matricule'];
    this.bilanService.getBilan(matricule).subscribe((bilan) => {
      this.bilan = bilan;
    });
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      if (this.bilan) {
        const bilan = { ...this.bilan };
        Object.assign(bilan, { [this.selectedBilanKey]: +f.value.value });

        this.bilanService
          .updateBilan(bilan.matricule, bilan)
          .subscribe((bilan) => {
            this.bilan = bilan;
          });
      }
    }

    this.modalService.dismissAll();
  }

  public valueOf(key: BilanKeys) {
    if (this.bilan && this.bilan[key]) {
      return this.bilan[key];
    }

    return 0;
  }

  public diffOf(...keys: BilanKeys[]) {
    const value0 = this.valueOf(keys[0]);
    let x = typeof value0 === 'number' ? value0 : 0;

    for (let i = 1; i < keys.length; i++) {
      let value = this.valueOf(keys[i]);
      x -= typeof value === 'number' ? value : 0;
    }

    return x;
  }

  public sumOf(...nums: (string | number)[]) {
    let s = 0;
    for (let x of nums) {
      s += typeof x === 'number' ? x : 0;
    }

    return s;
  }
}

type BilanKeys = keyof BilanResponse;
