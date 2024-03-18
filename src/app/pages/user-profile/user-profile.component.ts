import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/user.service';

declare const L: any;
declare const grecaptcha: any; // Declare the reCAPTCHA object

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

 
  paymentHandler: any = null;
  stripeAPIKey: any = 'pk_test_51KhswvG7UB7GckXF8VAb7hc7HRfmZ02t0BIx7TTfF4OcqNg6j9iiLYfbk1fnlxQIEVDECbt6M9u5AG17KrcpVn5a00idzlk2Ye';
  
  constructor(private userService: UserService,private http: HttpClient,private formBuilder: FormBuilder) {}
  
  /*------------------------------------------
  --------------------------------------------
  ngOnInit() Function
  --------------------------------------------
  --------------------------------------------*/
  ngOnInit() {
    this.invokeStripe();
  }
  
  makePayment(amount: any) {
    
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const url = 'http://localhost:8001/payments';

  const userId = this.userService.getUserId();
 
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripeAPIKey,
      locale: 'auto',
      token: (stripeToken: any) => {
        console.log(stripeToken);
        this.http.post('http://localhost:8001/payments' + userId, { token: stripeToken.id, amount: amount*100 ,currency:'usd'},{headers}).subscribe(
          (response: any) => {
            console.log(response);
            alert('Payment failed!');
           // grecaptcha.reset(this.widgetId); // Hide the reCAPTCHA widget
           // this.showPaymentButton = false; // Disable the payment button
            //alert('Payment has been successful!');
          },
          (error: any) => {
            console.log(error);
            alert('Recharge has been successful!');
          
           // alert('Payment failed!');
          }
        );
      },
    });
    paymentHandler.open({
      name: 'PHOENIX-BANK',
      description: '3 widgets',
      amount: amount * 100,
      currency: 'usd'
    });
  }
  async pay(): Promise<void> {
    // here we create a payment object
    const payment = {
      
      currency: 'usd',
      // amount on cents *10 => to be on dollar
     
    };
  }
  
  /*------------------------------------------
  --------------------------------------------
  invokeStripe() Function
  --------------------------------------------
  --------------------------------------------*/
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
  
      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.stripeAPIKey,
          currency: 'usd',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
            return this.http.post('http://localhost:8086/payments', { headers })
          },
        });
      };
  
      window.document.body.appendChild(script);
    }
  }
  siteKey : string="6LdKmcwlAAAAAF2KdRw2JdaWpERgFqrODz6Y6luu";

}
