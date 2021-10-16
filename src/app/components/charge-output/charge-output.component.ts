import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartData, LineController, registerables } from 'chart.js';
import { format, max, number } from 'mathjs';
import { ChargeResult } from '@models/charge-result';
import { fromZeroTo } from '@app/util';

@Component({
  selector: 'app-charge-output',
  templateUrl: './charge-output.component.html',
  styleUrls: ['./charge-output.component.css']
})
export class ChargeOutputComponent implements AfterViewInit, OnChanges {
  @ViewChild('hitsChart') hitsChartComponent?: ElementRef<HTMLCanvasElement>
  @ViewChild('woundsChart') woundsChartComponent?: ElementRef<HTMLCanvasElement>
  @ViewChild('nerveTestChart') nerveTestChartComponent?: ElementRef<HTMLCanvasElement>

  @Input() results: ChargeResult[] = [];

  hitsChart?: Chart
  woundsChart?: Chart
  nerveTestChart?: Chart

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.results) {
      this.updateHitsChart()
      this.updateWoundsChart()
      this.updateNerveTestChart()
    }
  }

  ngAfterViewInit(): void {
    Chart.register(...registerables as any);

    this.setupHitsChart()
    this.setupWoundsChart()
    this.setupNerveTestChart()
  }

  private setupHitsChart(): void {
    if (this.hitsChartComponent) {
      var ctx = this.hitsChartComponent.nativeElement.getContext('2d');
      
      this.hitsChart = new Chart(ctx!, {
        type: 'line',
        data: this.buildHitsData(),
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Hits'
            },
            tooltip: {
              position: 'nearest',
              callbacks: {
                label: (context: any) => context.dataset.label + ': ' + format(context.raw * 100, 3) + ' %'
              }
            },
          }
        },
      });
    }
  }

  private setupWoundsChart(): void {
    if (this.woundsChartComponent) {
      var ctx = this.woundsChartComponent.nativeElement.getContext('2d');
      
      this.woundsChart = new Chart(ctx!, {
        type: 'line',
        data: this.buildWoundsData(),
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Wounds'
            },
            tooltip: {
              position: 'nearest',
              callbacks: {
                label: (context: any) => context.dataset.label + ': ' + format(context.raw * 100, 3) + ' %'
              }
            },
          }
        },
      });
    }
  }

  private setupNerveTestChart(): void {
    if (this.nerveTestChartComponent) {
      var ctx = this.nerveTestChartComponent.nativeElement.getContext('2d');
      
      this.nerveTestChart = new Chart(ctx!, {
        type: 'pie',
        data: this.buildNerveTestData(),
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Nerve Test'
            },
            tooltip: {
              mode: "index",
              callbacks: {
                label: (context: any) => context.dataset.label + ': ' + format(context.raw * 100, 3) + ' %',
                title: (context: any) => context[0].label,
              }
            },
          }
        },
      });
    }
  }

  private updateHitsChart(): void {
    if (this.hitsChart) {
      this.hitsChart.data = this.buildHitsData()
      this.hitsChart.update()
    }
  }

  private updateWoundsChart(): void {
    if (this.woundsChart) {
      this.woundsChart.data = this.buildWoundsData()
      this.woundsChart.update()
    }
  }

  private updateNerveTestChart(): void {
    if (this.nerveTestChart) {
      this.nerveTestChart.data = this.buildNerveTestData()
      this.nerveTestChart.update()
    }
  }

  private buildHitsData(): ChartData {
    const COLORS = ['red', 'green', 'blue']
    const topHits = max(
      0,
      ...this.results.map(chargeResult => max(0, ...chargeResult.hitsTable.keys()))
    )
    const labels = fromZeroTo(topHits)

    const datasets = this.results.map((chargeResult, index) => ({
      label: 'Charge #' + (index + 1),
      borderColor: COLORS[index],
      backgroundColor: COLORS[index],
      data: labels.map(label => chargeResult.hitsTable.get(label)
        ? number(chargeResult.hitsTable.get(label)) as number
        : null)
    }))

    return {
      labels,
      datasets,
    }
  }

  private buildWoundsData(): ChartData {
    const COLORS = ['red', 'green', 'blue']
    const topWounds = max(
      0,
      ...this.results.map(chargeResult => max(0, ...chargeResult.woundsTable.keys()))
    )
    const labels = fromZeroTo(topWounds)

    const datasets = this.results.map((chargeResult, index) => ({
      label: 'Charge #' + (index + 1),
      borderColor: COLORS[index],
      backgroundColor: COLORS[index],
      data: labels.map(label => chargeResult.woundsTable.get(label)
        ? number(chargeResult.woundsTable.get(label)) as number
        : null)
    }))

    return {
      labels,
      datasets,
    }
  }

  private buildNerveTestData(): ChartData {
    const labels = ['Steady', 'Waver', 'Rout']

    const COLORS = ['blue', 'green', 'red']
    const datasets = this.results.map((chargeResult, index) => ({
      label: "Charge #" + (index + 1),
      data: [
        number(chargeResult.nerveTest.steady as any) as number,
        number(chargeResult.nerveTest.waver as any) as number,
        number(chargeResult.nerveTest.rout as any) as number,
      ],
      backgroundColor: COLORS,
    }))

    return {
      labels,
      datasets,
    }
  }

}
