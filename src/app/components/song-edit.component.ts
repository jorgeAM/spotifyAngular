import { Component, OnInit } from '@angular/core';
//importamos paquete para seleccionar un artista especifico
import { Router, ActivatedRoute, Params } from '@angular/router';
//importamos modelo song
import { Song } from '../models/song';
//servicio de user
import { UserService } from '../services/user.service';
//servicio de song
import { SongService } from '../services/song.service';
//servicio de upload
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'song-edit',
  templateUrl: '../views/song-edit.component.html',
  providers: [
  	UserService,
  	SongService,
  	UploadService
  ]
})
export class SongEditComponent implements OnInit{
	titulo = 'Edita la canción';
	song = new Song(0, '', '', '', '');
	identity;
	token;
	filesToUpload: Array<File>;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private userService: UserService,
		private songService: SongService,
		private upload: UploadService
	){
		this.identity = this.userService.getIdentity();
		this.token = this.userService.getToken();
	}

	ngOnInit(){
		this.getSong();
	}

	getSong(){
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this.songService.getSong(this.token, id)
				.subscribe(res => {
					if(!res.song){
						console.log('error')
					}else {
						this.song = res.song;
					}
				}, err => {
					console.log(err);
				});
		});
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
						console.log(this.song);
						//this.router.navigate(['album', res.album._id])
					}
				}, err => {
					console.log(err);
				});
		});
	}

	updateSong(){
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this.songService.updateSong(this.token, id, this.song)
				.subscribe(res => {
					//subir cancion
					if(!this.filesToUpload){
						this.router.navigate(['/detalle-album', res.song.album]);
					}else{
						this.upload.makeFileRequest(
						this.songService.SongtUrl+'upload-song/'+id,
						[],
						this.filesToUpload,
						this.token,
						'file')
						.then(response => {
							this.router.navigate(['/detalle-album', res.song.album]);
						}, err => {
							console.log(err);
						});
					}
				}, err => {
					console.log(err);
				})
		});
	}

	//metodo que capturara los archivos que se suban
	fileChangeEvent(fileInput: any){
	    //target.files -> recoge los archivos que seleccionamos
	    this.filesToUpload = <Array<File>>fileInput.target.files;
  	}

}
  