import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  user_name: string = '';
  user_sur_name: string = '';
  

  users:User[]=[];
  user:User= new User("","","","",0.0,0.0,0.0);
  message: any;
  protected bFormGroup: FormGroup;
  protected aFormGroup: FormGroup;
 
  loginMessage: string;
  constructor(private http: HttpClient,private userService: UserService, private formBuilder : FormBuilder,private router:Router) { }
  siteKey : string="6LdKmcwlAAAAAF2KdRw2JdaWpERgFqrODz6Y6luu";
  ngOnInit(): void {
    this.getAllUsers();
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  public getAllUsers() {
    this.userService.getAll().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  


  submit({value,valid}: {value: User, valid:boolean}){
    this.user = value;
    console.log(this.user);
    this.http.post('http://localhost:8001/adduser', this.user).subscribe(
      (response: any) => {
        if (response.success) {
          console.log('Success:', response);
          const userEmail = this.user.email;
  
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
              this.loginMessage = 'An error occurred during register.';
            }
          );
        } else {
          this.loginMessage = 'Login failed. email already exist.';
        }
      },
      (error) => {
  console.error('Error during register:', error);
  this.loginMessage = 'An error occurred during register.';
}

    );
  }

  public getUserById(id: string) {
    this.userService.getById(id).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public createUser() {
    let resp=this.userService.create(this.user);
    resp.subscribe((data)=>this.message=data);
    
  }

  public updateUser(id: string) {
    this.userService.update(id, this.user).subscribe(
      (data) => {
        this.message = "User updated successfully";
        this.user = new User("", "", "", "",0.0,0.0,0.0);
        this.getAllUsers();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
