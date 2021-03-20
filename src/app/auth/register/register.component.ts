import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    // test : Date = new Date();
    focus;
    focus1;

    errors: any = [];

    constructor(
      private authService: AuthService,
      private router: Router
    ) { }

  // tslint:disable-next-line:typedef
    ngOnInit() {}

    register(registerForm) {
      console.log(registerForm.value);
      // nodeServerにpost
      this.authService.register(registerForm.value).subscribe(
        (result) => {
          console.log('Success!');
          // login画面に遷移
          this.router.navigate(['/login']);
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.errors = err.error.errors;
        });
  }
}
