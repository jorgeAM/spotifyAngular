import { Component, OnInit } from '@angular/core';
//importamos paquete para seleccionar un artista especifico
import { Router, ActivatedRoute, Params } from '@angular/router';
//importamos clase Artist
import { Artist } from '../models/artist';
//importamos clase Album
import { Album } from '../models/album';
//servicio de artist
import { ArtistService } from '../services/artist.service';
//servicio de album
import { AlbumService } from '../services/album.service';
//servicio de user
import { UserService } from '../services/user.service';

@Component({
  selector: 'artist-details',
  templateUrl: '../views/artist-details.component.html',
  styleUrls: ['../styles/artist-details.component.css'],
  providers: [
  	UserService,
  	ArtistService,
  	AlbumService
  ]
})
export class ArtistDetailsComponent implements OnInit{
	title = 'Tu Artista';
	artist: Artist;
	albums: Album[];
	identity;
	token;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private artistService: ArtistService,
		private albumService: AlbumService
	){
		this.identity = this.userService.getIdentity();
		this.token = this.userService.getToken();
	}

	ngOnInit(){
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this.artistService.getArtist(this.token, id)
				.subscribe(res => {
					if(!res){
						this.router.navigate(['/home']);
					}else{
						this.artist = res.artist;
						//sacar albums
						this.albumService.getAlbums(this.token, this.artist._id)
							.subscribe(res => {
								this.albums = res.albums;
							}, err => {
								console.log(err);
							})
					}

				}, err => {
					console.log(err);
				})
		});
	}

	eliminar(id){
		this.albumService.deleteAlbum(this.token, id)
			.subscribe(() => {
				this.albumService.getAlbums(this.token, this.artist._id)
					.subscribe(res => {
						this.albums = res.albums;
					}, err => {
						console.log(err);
					})
			}, err => {
				console.log(err);
			});
	}
}
  