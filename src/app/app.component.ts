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
  public title = 'Sposhify';
  public user:User;
  public identity;
  public token;

  constructor(private userService: UserService){
  	this.user = new User('', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit(){
    let prueba = this.userService.login();
    console.log(prueba);
  }

  onSubmit(){
    console.log('click');
  }
}
