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
  selector: 'artist-list',
  templateUrl: '../views/artist-list.component.html',
  providers: [
  	UserService,
  	ArtistService
  ]
})
export class ArtistListComponent implements OnInit{
	title = 'Tus Artistas';
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
	}
}
  