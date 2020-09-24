import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    //TODO: Validations
    const fields = {
      email: [null, Validators.required],
      password: [null, [Validators.required]]
    };

    this.loginForm = this.formBuilder.group(fields);

  }
  onSubmit() {
    console.log(this.loginForm.value);
    this.loginError = null;
    this.authService.loginUser(this.loginForm.value).subscribe(res => {
      this.router.navigate(['/home']);
    }, (err) => {
      console.log(err);
      this.loginError = err.message;
    });

  }

}
