import { Component, OnInit } from '@angular/core';
import { Stock } from './stock';
import { StockService } from '../stock.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

 
  stocks: Stock[] = [];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.getAllStocks().subscribe(data => {
      this.stocks = data;
    });
  }

}
