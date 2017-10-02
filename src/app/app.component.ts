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
  public identity;
  public token;

  constructor(private userService: UserService){
  	this.user = new User('', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit(){
    console.log('corriendo');
  }

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
          //crear elemento en el LocalStorage
          
          //conseguir token para enviar a cada peticion http
          this.userService.signUp(this.user, 'true')
            .then((res) => {
              let token = res;
              this.token = token;
              //si usuario no esta identificado
              if(this.token.length <= 0){
                alert('El token no se ha generado');          
              }else{
                console.log(token);
                console.log(identity);
              }
            });
        }
      });
  }
}
