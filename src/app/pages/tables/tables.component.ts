import { Component, OnInit } from '@angular/core';
import { Sicav } from './sicav';
import { SicavService } from 'src/app/sicav.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  sicavs: Sicav[] = [];
  sicavForm: { [key: string]: FormGroup } = {};


  constructor(private http: HttpClient,private sicavService: SicavService,private formBuilder: FormBuilder,private userService: UserService) { }
  

  ngOnInit(): void {
    this.sicavService.getsicav().subscribe(data => {
      this.sicavs = data;
    });
    
      // Create a form group for each Sicav
      this.sicavs.forEach(sicav => {
        this.sicavForm[sicav.id] = this.formBuilder.group({
          investmentAmount: ['', [Validators.required, Validators.min(0)]]
        
      });
    });
  }

  invest(sicavId: number): void {
    const sicavForm = this.sicavForm[sicavId];
    const loggedInUserId = this.userService.getUserId();
  
    if (sicavForm.valid) {
      const amountToInvest =150;
  
      // Check if user has sufficient virtual balance
    
        // Make the API request
        this.http.post(`http://localhost:8001/assignSicavToUser?sicavId=${sicavId}&userId=${loggedInUserId}&amountToInvest=${amountToInvest}`, {})
    }
       else {
        console.error('Insufficient virtual balance.');
      }
    }
  
  

  checkSufficientBalance(amount: number, enterPrice: number): boolean {
    // Implement logic to check if user's virtual balance is sufficient
    // You can get user's virtual balance from your service
    // Example: const virtualBalance = this.userService.getVirtualBalance();
    // Compare virtualBalance with (amount + enterPrice)
    return true; // Return true if balance is sufficient, false otherwise
  }


}
