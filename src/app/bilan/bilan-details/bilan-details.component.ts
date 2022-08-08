import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BilanResponse } from 'src/app/models/bilan-response.model';
import { BilanService } from 'src/app/services/bilan.service';

@Component({
  selector: 'app-bilan-details',
  templateUrl: './bilan-details.component.html',
  styleUrls: ['./bilan-details.component.css'],
})
export class BilanDetailsComponent implements OnInit {
  public bilan?: BilanResponse;

  constructor(
    private bilanService: BilanService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const matricule = this.route.snapshot.params['matricule'];
    this.bilanService.getBilan(matricule).subscribe((bilan) => {
      this.bilan = bilan;
    });
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
