import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
  @Input('data') doughnutChartData: number[] = [];
  @Input('labels') doughnutChartLabels: string[] = [];
  @Input('type') doughnutChartType: string = '';

  constructor() { 

  }

  ngOnInit() {
    
  }

}
