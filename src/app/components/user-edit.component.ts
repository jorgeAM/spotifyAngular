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
  public user:User;
  public identity;
  public token;

  //constructor
  constructor(private userService: UserService){
  }

  ngOnInit(){
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    console.log('identify es '+ this.identity);
    console.log('token es '+ this.token);
  }

}
