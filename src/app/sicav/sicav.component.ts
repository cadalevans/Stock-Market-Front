import { Component, OnInit } from '@angular/core';
import { Sicav } from '../pages/tables/sicav';
import { SicavService } from '../sicav.service';


@Component({
  selector: 'app-sicav',
  templateUrl: './sicav.component.html',
  styleUrls: ['./sicav.component.scss']
})
export class SicavComponent implements OnInit {

sicavs : Sicav[]=[]

  constructor(private sicavServices: SicavService) { }

  ngOnInit(): void {
    
   
  }
}
