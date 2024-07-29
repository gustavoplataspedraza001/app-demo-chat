import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { images } from 'src/app/global/constants';

// Models //
import { LoginRequest } from 'src/app/core/models/login'

// Services //
import { LoginService } from 'src/app/core/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  readonly images = images;

  loginForm: FormGroup;

  submitted = false;
  public error = '';

  constructor(
    private loginService: LoginService,
    private FormBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.loginForm = FormBuilder.group({
      usuario: FormBuilder.control('', Validators.required),
      password: FormBuilder.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.loginForm.reset({usuario: 'sebastian.villarreal@tibs.com.mx', password:'1234567'});
  }

  onSubmit(): void {
    if(this.loginForm.invalid){
      return;
    }

    const login: LoginRequest = {
      email: this.loginForm.controls['usuario'].value,
      password: this.loginForm.controls['password'].value
    }
    this.loginService.auth(login).subscribe(res => {
      console.log(res);
      
      const data = res.response;
      this.error = '';
      localStorage.setItem('token', data.token);
      //localStorage.setItem('idUsuario', data.Usuario.Id.toString());
      //localStorage.setItem('idPerfil', data.Usuario.IdPerfil.toString());
      //localStorage.setItem('usuario', data.Usuario.Usuario);
      //localStorage.setItem('nombrePersona', data.Usuario.NombrePersona);
      localStorage.setItem('user', data.name);
      //localStorage.setItem('fechaDesde', data.Usuario.Fecha);
      this.router.navigate(['/chat'])
    })
  }
}
