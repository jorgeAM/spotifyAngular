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
  selector: 'artist-details',
  templateUrl: '../views/artist-details.component.html',
  styleUrls: ['../styles/artist-details.component.css'],
  providers: [
  	UserService,
  	ArtistService
  ]
})
export class ArtistDetailsComponent implements OnInit{
	title = 'Tu Artista';
	artist: Artist;
	identity;
	token;

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
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this.artistService.getArtist(this.token, id)
				.subscribe(res => {
					if(!res){
						this.router.navigate(['/home']);
					}else{
						this.artist = res.artist;
						//sacar albums
					}

				}, err => {
					console.log(err);
				})
		});
	}
}
  