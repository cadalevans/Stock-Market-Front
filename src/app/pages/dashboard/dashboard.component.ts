import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import * as pdfjsLib from 'pdfjs-dist';


// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { DictionaryService } from 'src/app/dictionary.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  pdfPages: string[] = [];
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;


  searchTerm: string;
  definition: any;
  error: string;

  constructor(private dictionaryService: DictionaryService) {}

  search(): void {
    this.dictionaryService.getDefinition(this.searchTerm)
      .subscribe(
        data => {
          this.definition = data[0];
          this.error = null;
        },
        error => {
          this.error = 'Unable to fetch definition.';
          this.definition = null;
        }
      );
  }
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});

    //this.convertPdfToImages('assets/LYNX_Option_book_2019_FR.pdf');
  }

  /*
  convertPdfToImages(pdfPath: string): void {
    pdfjsLib.getDocument(pdfPath).promise.then(pdf => {
      for (let i = 1; i <= pdf.numPages; i++) {
        pdf.getPage(i).then(page => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const viewport = page.getViewport({ scale: 1 });
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          page.render(renderContext).promise.then(() => {
            const imageUrl = canvas.toDataURL('image/png'); // Convert canvas to image URL
            this.pdfPages.push(imageUrl); // Add image URL to pdfPages array
          });
        });
      }
    });
  }

  printPdf(): void {
    // Print PDF images
    window.print();
  }
*/
  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
