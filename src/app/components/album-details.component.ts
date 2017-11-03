import { Component, OnInit } from '@angular/core';
//importamos paquete para seleccionar un artista especifico
import { Router, ActivatedRoute, Params } from '@angular/router';
//importamos clase Artist
import { Song } from '../models/song';
//importamos clase Album
import { Album } from '../models/album';
//servicio de song
import { SongService } from '../services/song.service';
//servicio de album
import { AlbumService } from '../services/album.service';
//servicio de user
import { UserService } from '../services/user.service';

@Component({
  selector: 'album-details',
  templateUrl: '../views/album-details.component.html',
  styleUrls: ['../styles/album-details.component.css'],
  providers: [
  	UserService,
  	SongService,
  	AlbumService
  ]
})
export class AlbumDetailsComponent implements OnInit{
	title = 'Detalle del album';
	album: Album;
	songs: Song[];
	identity;
	token;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private albumService: AlbumService,
		private songService: SongService
	){
		this.identity = this.userService.getIdentity();
		this.token = this.userService.getToken();
	}

	ngOnInit(){
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this.albumService.getAlbum(this.token, id)
				.subscribe(res => {
					if(!res){
						this.router.navigate(['/artista', this.album.artist]);
					}else{
						this.album = res.album;
						//sacar canciones
						this.songService.getSongs(this.token, id)
							.subscribe(res => {
								this.songs = res.songs;
							});
					}

				}, err => {
					console.log(err);
				})
		});
	}

	eliminar(id){
		this.songService.deleteSong(this.token, id)
			.subscribe(() => {
				this.songService.getSongs(this.token)
					.subscribe(res => {
						this.songs = res.songs;
					}, err => {
						console.log(err);
					})
			}, err => {
				console.log(err);
			});
	}

	startPlayer(song){
		localStorage.setItem('song',JSON.stringify(song));
		//document.getElementById("mp3-src").setAttribute("src",this.songService.SongtUrl+'get-song-file/'+song.file)
		//(document.getElementById("player") as any).load();
		//(document.getElementById("player") as any).play();
	}

}
  