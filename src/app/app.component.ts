import { Component, OnInit } from '@angular/core';
//importamos clase User
import { User } from './models/user';
//servicio de user
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit{
  public title = 'Music';
  public user:User;
  public user_registro:User;
  public identity;
  public token;

  constructor(private userService: UserService){
  	this.user = new User('', '', '', '', 'ROLE_USER', '');
    this.user_registro = new User('', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit(){
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    console.log('identify es '+ this.identity);
    console.log('token es '+ this.token);
  }

  //metodo para iniciar sesión
  onSubmit(){
    //conseguir datos del usuario identificado, sin el gethash
    this.userService.signUp(this.user)
      .then((res) => {
        let identity = res;
        this.identity = identity;
        //si usuario no esta identificado
        if(!this.identity._id){
          alert('El usuario no esta correctamente identificado');          
        }else{
          //crear elemento en el LocalStorage del usuario
          localStorage.setItem('identity', JSON.stringify(identity));
          //conseguir token para enviar a cada peticion http
          this.userService.signUp(this.user, 'true')
            .then((res) => {
              let token = res;
              this.token = token;
              //si usuario no esta identificado
              if(this.token.length <= 0){
                alert('El token no se ha generado');          
              }else{
                localStorage.setItem('token', JSON.stringify(token));
              }
            });
        }
      });
  }

  registrar(){
    this.userService.register(this.user_registro)
      .then(res => {
        let user = res;
        this.user_registro = user;
      });
  }

  //método para cerrar sesión
  logOut(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token')
    this.identity = null;
    this.token = null;
    this.user = new User('', '', '', '', 'ROLE_USER', '')
    //localStorage.clear();
  }
}
