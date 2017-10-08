import { Component, OnInit } from '@angular/core';
//importamos clase User
import { User } from '../models/user';
//servicio de user
import { UserService } from '../services/user.service';

@Component({
  selector: 'user-edit',
  templateUrl: '../views/user-edit.component.html',
  providers: [UserService]
})
export class UserEditComponent implements OnInit{
  public title = 'Edita tu usario';
  public user: User;
  public identity;
  public token;

  //constructor
  constructor(private userService: UserService){
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.user = this.identity;
  }

  ngOnInit(){
    //this.user = this.userService.getIdentity();
    console.log('componente corriendo')
  }

  actualizar(){
    this.userService.updateUser(this.user)
      .then(res => {
        //igualamos el resultado al usuario
        //this.user = res;
        //guardamos en el localStorage
        localStorage.setItem('identity', JSON.stringify(this.user));
        document.getElementById('user-name').innerHTML = this.user.name;
      });
    console.log(this.user);
  }

}
