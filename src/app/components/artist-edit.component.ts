import { Component, OnInit } from '@angular/core';
//importamos paquete para seleccionar un artista especifico
import { Router, ActivatedRoute, Params } from '@angular/router';
//importamos clase Artist
import { Artist } from '../models/artist';
//servicio de artist
import { ArtistService } from '../services/artist.service';
//servicio de user
import { UserService } from '../services/user.service';
//servicio para subir imagen
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'artist-edit',
  templateUrl: '../views/artist-edit.component.html',
  providers: [
  	UserService,
  	ArtistService,
  	UploadService
  ]
})
export class ArtistEditComponent implements OnInit{
	title = 'Edita al Artista';
	artist = new Artist('', '', '', '');
	identity;
	token;
	is_edit = true;	
	filesToUpload: Array<File>;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private artistService: ArtistService,
		private upload: UploadService
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
					if(!this.filesToUpload){
						this.router.navigate(['/artista', res.artist._id]);
					}else{
						//subir imagen de artista
						this.upload.makeFileRequest(
							this.artistService.artistUrl+'upload-image-artist/'+id,
							[],
							this.filesToUpload,
							this.token,
							'image')
						.then(res => {
							this.router.navigate(['/']);
						}, err => {
							console.log(err);
						})
					}
				}, err => {
					console.log(err);
				});
		});
	}


	fileChangeEvent(fileInput: any){
	    //target.files -> recoge los archivos que seleccionamos
	    this.filesToUpload = <Array<File>>fileInput.target.files;
  	}
}
  