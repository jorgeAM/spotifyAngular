import { Injectable }    from '@angular/core';
//librerias para conectar con API
import { Headers, Http } from '@angular/http';
//para usar promise
import 'rxjs/add/operator/map';
//modelo
import { Song } from '../models/song';

@Injectable()
export class SongService{
	public SongtUrl = "http://localhost:3100/api/";

	constructor(private http: Http){}

	addSong(token, song:Song){
		//cabecera donde mandamos token
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this.http
			.post(this.SongtUrl+'create-song', JSON.stringify(song), {headers: headers})
			.map(res => res.json());
	}

	getSongs(token, albumId = null){
		//cabecera donde mandamos token
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		if(albumId != null){
			return this.http.get(this.SongtUrl+'songs/'+albumId, {headers: headers})
				.map(res => res.json());
		}else{
			return this.http.get(this.SongtUrl+'songs', {headers: headers})
				.map(res => res.json());
		}
	}


	getSong(token, id){
		//cabecera donde mandamos token
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this.http.get(this.SongtUrl+'song/'+id, {headers: headers})
		.map(res => res.json());
	}

	updateSong(token, id, song: Song){
		//cabecera donde mandamos token
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this.http
			.put(this.SongtUrl+'song/'+id, JSON.stringify(song), {headers: headers})
			.map(res => res.json());
	}

	deleteSong(token, id){
		//cabecera donde mandamos token
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this.http.delete(this.SongtUrl+'song/'+id, {headers: headers})
		.map(res => res.json());
	}
	
}