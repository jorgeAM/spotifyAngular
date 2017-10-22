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
  styleUrls: ['../styles/artist-list.component.css'],
  providers: [
  	UserService,
  	ArtistService
  ]
})
export class ArtistListComponent implements OnInit{
	title = 'Tus Artistas';
	artists: Artist[];
	identity;
	token;

	constructor(
		private router: Router,
		private userService: UserService,
		private artistService: ArtistService
	){
		this.identity = this.userService.getIdentity();
		this.token = this.userService.getToken();
	}

	ngOnInit(){
		this.artistas();
	}

	eliminar(id){
		this.artistService.deleteArtist(this.token, id)
			.subscribe(res => {
				this.artistas()
			}, err => {
				console.log(err);
			});
	}

	artistas(){
		this.artistService.getArtists(this.token)
			.subscribe(res => {
				this.artists = res.artists;
				console.log(this.artists);
			}, err =>{
				console.log(err);
		});
	}
}
  