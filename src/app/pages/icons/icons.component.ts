import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js';
import { UserService } from 'src/app/user.service';



@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  public copy: string;
  previousClosePrice: number;
  percentageChangeValue: number;
  changeValue: number; 
  lastPriceValue: number;
  enterpriseName: string;

  errorMessage: string;

  data: any;
  chart: any;
  selectedStock: string;
  stockSymbols: string[] = [
    'TSLA', 'GOOG', 'AAPL','PYPL','AMZN','TM','SONY','AMD',
    'CSCO','IBM','BLUE','F','PLTR','MARA','MSFT','ORAN','BABA',
    'NVDA','META','WMT'
    
  ]; // Add more stock symbols as needed
  articleData: any;

  constructor(private http: HttpClient,private userService: UserService) { }
  

  @ViewChild('chartCanvas', { static: true }) chartRef: ElementRef;
  ngOnInit() {
    // Make an HTTP request to your Spring Boot backend
    this.selectedStock = ''; // Set the default selected stock
    this.loadStockData();
    /*this.http.get('http://localhost:8001/api/stock-data/fetch?symbol=TSLA').subscribe((result) => {
      // Process and transform the data if necessary
      this.data = this.transformData(result);

      this.data.labels = this.data.labels.reverse(); // Reverse the labels
      this.data.datasets[0].data = this.data.datasets[0].data.reverse(); // Reverse the data
      this.renderChart();
    });
    */
  }

  //ORDER CODE BUTTON
  showOrderContainer = false;

  // Define an object to store order information
  order = {
    quantity: 0, // You can initialize this to any default value
    // Add other order properties here
  };

  // Method to toggle the visibility of the order container
  toggleOrderContainer() {
    this.showOrderContainer = !this.showOrderContainer;
  }
 submitOrder() {
    // Assuming you have the user ID
    const userId = this.userService.getUserId();

    // Assuming BUY side for now, you can dynamically set it based on user input
    const orderSide = 'BUY';

    const quantity = this.order.quantity;

    const buyingPrice = this.lastPriceValue;

    // Close price of the selected stock (assuming you have it available)
    const price = this.lastPriceValue; // You need to fetch this when loading stock data

    // Status is set to PENDING
    const status = 'PENDING';

    // The name of the selected stock is the enterprise
    const enterprise = this.selectedStock;

    // Create the order object
    const order = {
      orderSide,
      quantity,
      buyingPrice,
      price,
      status,
      enterprise,
      userId,
    };

    // Send the order to the server
    this.http.post('http://localhost:8001/assignUser/' + userId, order)
      .subscribe(response => {
        // Handle the response if needed
        console.log('Order submitted successfully', response);
      }, error => {
        // Handle errors if any
        console.error('Error submitting order', error);
        this.errorMessage = 'Please charge your account.';
        setTimeout(() => {
          this.errorMessage = null; // Clear the error message
        }, 3000);
      }
      
          );
  }
  

  loadStockData() {
    this.http.get(`http://localhost:8001/api/stock-data/fetch?symbol=${this.selectedStock}`).subscribe((result) => {
      const newData = this.transformData(result);
      newData.labels = newData.labels.reverse();
      newData.datasets[0].data = newData.datasets[0].data.reverse();
  
      if (this.data) {
        this.data.labels = newData.labels; // Update labels
        this.data.datasets[0].data = newData.datasets[0].data; // Update data
  
        // Re-render the chart with updated data
        this.renderChart();
  
        // Calculate percentage change using the first and last data points
        const chartData = this.chart.data.datasets[0].data;
        const firstClosePrice = chartData[0].y;
        console.log('firstClosePrice',firstClosePrice)
        const recentClosePrice = chartData[chartData.length - 1].y;
        console.log('recentClosePrice', recentClosePrice)
  
        // If you want to calculate the percentage change from the first data point to the most recent:
        const percentageChange = ((recentClosePrice - firstClosePrice) / firstClosePrice) * 100;

        const change = (recentClosePrice - firstClosePrice);

        this.enterpriseName = this.selectedStock;

        this.percentageChangeValue = percentageChange;
        
        this.changeValue = change;
        this.lastPriceValue = recentClosePrice;
        document.getElementById('percentageChange').textContent = `Percentage Change: ${percentageChange.toFixed(2)}%`;
      }
  
      // Set this.data to the new data
      this.data = newData;
      this.http.get(`http://localhost:8001/api/stock-data?symbol=${this.selectedStock}`).subscribe((articleResult) => {
        this.articleData = articleResult['feed'];
      });
    });
  }

  transformData(data: any): any {
    const timeSeries = data['Time Series (5min)'];
    const dates = Object.keys(timeSeries);
  
    return {
      labels: dates,
      datasets: [
        {
          label: 'Close Price',
          data: dates.map(date => ({
            x: date,
            y: parseFloat(timeSeries[date]['4. close']),
            open: parseFloat(timeSeries[date]['1. open']),
            high: parseFloat(timeSeries[date]['2. high']),
            low: parseFloat(timeSeries[date]['3. low']),
            volume: parseFloat(timeSeries[date]['5. volume']),
          })),
          borderColor: 'rgba(75, 192, 192, 0.8)',
          borderWidth: 2,
        },
      ],
    };
  }
  
 /* ngAfterViewInit() {
    // Render the chart after the view has initialized
    this.renderChart();
  }*/
  
  renderChart() {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (this.chart) {
      this.chart.destroy(); // Destroy the previous chart to prevent issues
    }
    this.chart = new Chart(ctx, {
      type: 'line',
      data: this.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: [
            {
              display: true,
             // reverse: true, // Reverse the chart
              title: {
                display: true,
                text: 'Time',
              },
              ticks: {
                maxTicksLimit: 10, // Adjust this based on your preference
                maxRotation: 0,
              },
            },
          ],
          y: [
            {
              display: true,
              title: {
                display: true,
                text: 'Price',
              },
              beginAtZero: true,
            },
          ],
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            title: (tooltipItem) => tooltipItem[0].xLabel,
            label: (tooltipItem) => {
              const dataPoint = this.data.datasets[0].data[tooltipItem.index];
              return [
                `Close: ${dataPoint.y}`,
                `Open: ${dataPoint.open}`,
                `High: ${dataPoint.high}`,
                `Low: ${dataPoint.low}`,
                `Volume: ${dataPoint.volume}`,
              ];
            },
          },
        },
      },
    });
  }
  
  
  
  
}
