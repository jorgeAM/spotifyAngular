import { Component, OnInit } from '@angular/core';
//importamos paquete para seleccionar un artista especifico
import { Router, ActivatedRoute, Params } from '@angular/router';
//importamos clase Artist
import { Artist } from '../models/artist';
//importamos modelo album
import { Album } from '../models/album';
//servicio de user
import { UserService } from '../services/user.service';
//servicio de artist
import { AlbumService } from '../services/album.service';
//servicio para subir imagen
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'album-edit',
  templateUrl: '../views/album-edit.component.html',
  providers: [
  	UserService,
  	AlbumService
  ]
})
export class AlbumEditComponent implements OnInit{
	titulo = 'Edita el Album';
	album = new Album('', '', 0, '', '');
	identity;
	token;
	filesToUpload: Array<File>;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private userService: UserService,
		private albumService: AlbumService,
		private upload: UploadService
	){
		this.identity = this.userService.getIdentity();
		this.token = this.userService.getToken();
	}

	ngOnInit(){
		this.getAlbum();
	}

	getAlbum(){
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this.albumService.getAlbum(this.token, id)
				.subscribe(res => {
					if(!res.album){
						console.log('ERROR')
					}else {
						this.album = res.album;
						console.log(this.album);
					}
				}, err => {
					console.log(err);
				})
		});
	}

	updateAlbum(){
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			this.albumService.updateAlbum(this.token, id, this.album)
				.subscribe(res => {
					//subir portada del album
					if(!this.filesToUpload){
						console.log('no se subio archivo')
					}else{
						this.upload.makeFileRequest(
						this.albumService.AlbumtUrl+'upload-image-album/'+id,
						[],
						this.filesToUpload,
						this.token,
						'image')
						.then(response => {
							console.log(this.album.artist)
							this.router.navigate(['/artista', res.album.artist]);
						}, err => {
							console.log(err);
						});
					}
				}, err => {
					console.log(err);
				})
		});
	}

	fileChangeEvent(fileInput: any){
	    //target.files -> recoge los archivos que seleccionamos
	    this.filesToUpload = <Array<File>>fileInput.target.files;
	    console.log(this.filesToUpload);
  }

}
  