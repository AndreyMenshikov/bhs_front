import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm: FormGroup | undefined;

  message:any;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,private route: ActivatedRoute ,
    private router : Router
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  signup() {
    console.log(this.signupForm.value);
    this.service.signup(this.signupForm.value).subscribe((response) => {
      this.succesMsg();
    })
  }
  succesMsg(){
    this.router.navigate(['login']);
  }

}
