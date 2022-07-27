import { Component, OnInit } from '@angular/core';
import { BilanResponse } from 'src/app/models/bilan-response.model';
import { BilanService } from 'src/app/services/bilan.service';

@Component({
  selector: 'app-list-bilans',
  templateUrl: './list-bilans.component.html',
  styleUrls: ['./list-bilans.component.css'],
})
export class ListBilansComponent implements OnInit {
  private bilans: BilanResponse[] = [];

  constructor(private bilanService: BilanService) {}

  ngOnInit(): void {
    this.getBilans();
  }

  private getBilans() {
    this.bilanService.getBilans().subscribe((bilans: BilanResponse[]) => {
      this.bilans = bilans;
    });
  }
}
