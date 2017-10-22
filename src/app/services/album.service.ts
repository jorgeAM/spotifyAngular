import { Injectable }    from '@angular/core';
//librerias para conectar con API
import { Headers, Http } from '@angular/http';
//para usar promise
import 'rxjs/add/operator/map';
//modelo
import { Album } from '../models/album';

@Injectable()
export class AlbumService{
	public AlbumtUrl = "http://localhost:3100/api/";

	constructor(private http: Http){}

	addAlbum(token, album:Album){
		//cabecera donde mandamos token
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this.http
			.post(this.AlbumtUrl+'create-album', JSON.stringify(album), {headers: headers})
			.map(res => res.json());
	}

	getAlbums(token, artistId){
		//cabecera donde mandamos token
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this.http.get(this.AlbumtUrl+'albums/'+artistId, {headers: headers})
		.map(res => res.json());
	}


	getAlbum(token, id){
		//cabecera donde mandamos token
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this.http.get(this.AlbumtUrl+'album/'+id, {headers: headers})
		.map(res => res.json());
	}

	updateAlbum(token, id, album: Album){
		//cabecera donde mandamos token
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this.http
			.put(this.AlbumtUrl+'album/'+id, JSON.stringify(album), {headers: headers})
			.map(res => res.json());
	}

	deleteAlbum(token, id){
		//cabecera donde mandamos token
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this.http.delete(this.AlbumtUrl+'album/'+id, {headers: headers})
		.map(res => res.json());
	}
	
}