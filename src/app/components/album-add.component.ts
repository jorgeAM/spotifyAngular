import { Component, OnInit } from '@angular/core';
//importamos paquete para seleccionar un artista especifico
import { Router, ActivatedRoute, Params } from '@angular/router';
//importamos clase Artist
import { Artist } from '../models/artist';
//importamos modelo album
import { Album } from '../models/album';
//servicio de artist
import { ArtistService } from '../services/artist.service';
//servicio de user
import { UserService } from '../services/user.service';
//servicio de artist
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'album-add',
  templateUrl: '../views/album-add.component.html',
  providers: [
  	UserService,
  	ArtistService,
  	AlbumService
  ]
})
export class AlbumAddComponent implements OnInit{
	titulo = 'Añade un nuevo Album';
	artist: Artist;
	album = new Album('', '', 0 ,'', '');
	identity;
	token;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private userService: UserService,
		private artistService: ArtistService,
		private albumService: AlbumService
	){
		this.identity = this.userService.getIdentity();
		this.token = this.userService.getToken();
	}

	ngOnInit(){
	}

	addAlbum(){
		this.route.params.forEach((params: Params) => {
			let artistId = params['artist'];
			//le asiganamos el ID del artista al albu
			this.album.artist = artistId;
			this.albumService.addAlbum(this.token, this.album)
				.subscribe(res => {
					if(!res.album){
						console.log('error')
					}else {
						this.album = res.albums;
					}
				}, err => {
					console.log(err);
				});
		});
	}

}
  