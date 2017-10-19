import { Component, OnInit } from '@angular/core';
//importamos paquete para seleccionar un artista especifico
import { Router } from '@angular/router';
//importamos clase Artist
import { Artist } from '../models/artist';
//servicio de artist
import { ArtistService } from '../services/artist.service';
//servicio de user
import { UserService } from '../services/user.service';

@Component({
  selector: 'artist-add',
  templateUrl: '../views/artist-add.component.html',
  providers: [
  	UserService,
  	ArtistService
  ]
})
export class ArtistAddComponent implements OnInit{
	title = 'Tus Artistas';
	artist = new Artist('', '', '');
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
	}

	addArtist(){
		this.artistService.addArtist(this.token, this.artist)
			.subscribe(res =>{
				if(!res){
					console.log('hubo un error Crrano');
				}else{
					this.artist = res.artist;
					this.router.navigate(['/editar-artista', res.artist._id]);
				}
			}, err => {
				console.log(err);
			})
	}
}
  