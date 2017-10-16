import { Injectable }    from '@angular/core';
//librerias para conectar con API
import { Headers, Http } from '@angular/http';
//para usar promise
import 'rxjs/add/operator/map';
//modelo
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService{
	public artistUrl = "http://localhost:3100/api/";

	constructor(private http: Http){}

	addArtist(token, artist:Artist){
		//cabecera donde mandamos token
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this.http
			.post(this.artistUrl+'create-artist', JSON.stringify(artist), {headers: headers})
			.map(res => res.json());
	}

	getArtists(token){
		//cabecera donde mandamos token
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this.http.get(this.artistUrl+'artists', {headers: headers})
		.map(res => res.json());
	}


	getArtist(token, id){
		//cabecera donde mandamos token
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this.http.get(this.artistUrl+'artist/'+id, {headers: headers})
		.map(res => res.json());
	}

	updateArtist(token, id, artist: Artist){
		//cabecera donde mandamos token
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this.http
			.put(this.artistUrl+'artist/'+id, JSON.stringify(artist), {headers: headers})
			.map(res => res.json());
	}

	deleteArtist(token, id){
		//cabecera donde mandamos token
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this.http.delete(this.artistUrl+'artist/'+id, {headers: headers})
		.map(res => res.json());
	}
	
}