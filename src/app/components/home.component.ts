import { Component, OnInit } from '@angular/core';
//importamos paquete para seleccionar un artista especifico
import { Router } from '@angular/router';
//importamos clase Artist
import { Artist } from '../models/artist';
//servicio de user
import { ArtistService } from '../services/artist.service';
//servicio de user
import { UserService } from '../services/user.service';

@Component({
  selector: 'home',
  templateUrl: '../views/home.component.html',
  providers: [
  	UserService,
  	ArtistService
  ]
})
export class HomeComponent implements OnInit{
	title = 'Bienvenido a nuestro servicio de musica online!!';
	artist: Artist[];
	identity;
	token;

	constructor(
		private router: Router,
		private userService: UserService
	){
		this.identity = this.userService.getIdentity();
		this.token = this.userService.getToken();
	}



	ngOnInit(){
		console.log(this.identity);
		console.log(this.token);
	}
}
  