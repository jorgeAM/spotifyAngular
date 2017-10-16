import { Component, OnInit } from '@angular/core';
//importamos paquete para seleccionar un artista especifico
import { Router, ActivatedRoute, Params } from '@angular/router';
//importamos clase Artist
import { Artist } from '../models/artist';
//servicio de artist
import { ArtistService } from '../services/artist.service';
//servicio de user
import { UserService } from '../services/user.service';

@Component({
  selector: 'artist-edit',
  templateUrl: '../views/artist-edit.component.html',
  providers: [
  	UserService,
  	ArtistService
  ]
})
export class ArtistEditComponent implements OnInit{
	title = 'Edita al Artista';
	artist = new Artist('', '', '');
	identity;
	token;
	is_edit = true;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private artistService: ArtistService
	){
		this.identity = this.userService.getIdentity();
		this.token = this.userService.getToken();
	}

	ngOnInit(){
		//conseguir artista por id
		this.getArtist();
	}

	getArtist(){
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this.artistService.getArtist(this.token, id)
				.subscribe(res =>{
					this.artist = res.artist;
				}, err => {
					console.log(err);
				});
		});
	}

	updateArtist(){
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this.artistService.updateArtist(this.token, id, this.artist)
				.subscribe(res =>{
					console.log(this.artist);
				}, err => {
					console.log(err);
				});
		});
	}
}
  