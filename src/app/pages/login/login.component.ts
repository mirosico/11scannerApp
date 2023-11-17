import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
import {MessageService} from "primeng/api";
import {TokenStorageService} from "../../core/services/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoginPage = true;
  title = 'Login';
  loginForm!: FormGroup;

  constructor(private router: Router, private auth: AuthService, private messageService: MessageService, private tokenStorage: TokenStorageService ) { }

  ngOnInit() {
    this.isLoginPage = this.router.url === '/login';
    if (!this.isLoginPage) {
      this.title = 'Register';
    }
    this.loginForm = new FormGroup({
      'login': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.isLoginPage) {
      this.auth.login(this.loginForm.value.login, this.loginForm.value.password).subscribe(
        {
          next: data => {
            this.messageService.add({severity:'success', summary:'Success', detail:'Login successful'});
            this.tokenStorage.saveToken(data.token);
            this.tokenStorage.saveUserEmail(data.email);
            this.router.navigate(['/home']);
          },
          error: error => {
            console.log(error);
            this.messageService.add({severity:'error', summary:'Error', detail:'Invalid credentials'});
          }
        }
      );
    } else {
      this.auth.register(this.loginForm.value.login, this.loginForm.value.password).subscribe(
        {
          next: data => {
            this.messageService.add({severity:'success', summary:'Success', detail:'Registration successful'});
            this.router.navigate(['/login']);
          },
          error: error => {
            console.log(error);
            this.messageService.add({severity:'error', summary:'Error', detail:'Invalid credentials'});
          }
        }
      );
    }
  }
}
