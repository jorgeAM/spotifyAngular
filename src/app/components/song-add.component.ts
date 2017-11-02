import { Component, OnInit } from '@angular/core';
//importamos paquete para seleccionar un artista especifico
import { Router, ActivatedRoute, Params } from '@angular/router';
//importamos modelo song
import { Song } from '../models/song';
//servicio de user
import { UserService } from '../services/user.service';
//servicio de song
import { SongService } from '../services/song.service';

@Component({
  selector: 'song-add',
  templateUrl: '../views/song-add.component.html',
  providers: [
  	UserService,
  	SongService
  ]
})
export class SongAddComponent implements OnInit{
	titulo = 'Añade una nuevo canción';
	song = new Song(0, '', '', '', '');
	identity;
	token;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private userService: UserService,
		private songService: SongService
	){
		this.identity = this.userService.getIdentity();
		this.token = this.userService.getToken();
	}

	ngOnInit(){
	}

	addSong(){
		this.route.params.forEach((params: Params) => {
			let albumId = params['album'];
			//le asiganamos el ID del artista al albu
			this.song.album = albumId;
			this.songService.addSong(this.token, this.song)
				.subscribe(res => {
					if(!res.song){
						console.log('error')
					}else {
						this.song = res.song;
						this.router.navigate(['detalle-album', this.song.album])
					}
				}, err => {
					console.log(err);
				});
		});
	}

}
  