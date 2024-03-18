import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Login } from './login';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  //logins:Login[]=[];
  //login:Login= new Login("","");
  message: any;
  login: Login;

  protected aFormGroup: FormGroup;
  email: string = '';
  password: string = ''; 
  loginMessage: string = '';
 

  constructor(private userService: UserService,private http: HttpClient, private formBuilder : FormBuilder,private router: Router ) {
    this.aFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
      // ... other form controls
    });
  }
  siteKey : string="6LdKmcwlAAAAAF2KdRw2JdaWpERgFqrODz6Y6luu";
  ngOnInit() {

    this.login = new Login();
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });

    
  }

 

  save(f:NgForm){
    console.log(f.value['email']);
  }

  
  submit({ value, valid }: { value: Login; valid: boolean }) {
    this.login = value;
    console.log(this.login);
  
    this.http.post('http://localhost:8001/login', this.login, { responseType: 'text' }).subscribe(
      (response: any) => {
        if (response.includes('Login successful')) {
          this.loginMessage = 'Login successful!';
          const userEmail = this.login.email;
  
          // Make a request to get the user ID based on the email
          this.http.get(`http://localhost:8001/getUserId?email=${userEmail}`).subscribe(
            (userResponse: any) => {
              const userId = userResponse; // Assuming your response has the user ID
              this.userService.setUserId(userId);

              console.log('User ID:', userId);
  
              // You can perform further actions like navigating to a different page.
              // Redirect to /dashboard
              this.router.navigate(['/dashboard']);
            },
            (userError) => {
              console.error('Error retrieving user ID:', userError);
              this.loginMessage = 'An error occurred during login.';
            }
          );
        } else {
          this.loginMessage = 'Login failed. Invalid email or password.';
        }
      },
      (error) => {
        console.error('Error during login:', error);
        this.loginMessage = 'An error occurred during login.';
      }
    );
  }
  


 
  
  ngOnDestroy() {
  }

}
