import { Injectable }    from '@angular/core';
//librerias para conectar con API
import { Headers, Http } from '@angular/http';
//para usar promise
import 'rxjs/add/operator/toPromise';
//modelo
import { User } from '../models/user';

@Injectable()
export class UserService{
	//configuramos cabecera(YA DEFINIDO)
	private headers = new Headers({'Content-Type': 'application/json'});
	//url de api que usaremos
	private userUrl = "http://localhost:3100/api/";

	//constructor
	constructor(private http: Http){}

	login(){

	}

	//login
	signUp(user_to_login, gethash=null): Promise<User>{
		if(gethash != null){
			user_to_login.gethash =gethash;
			return this.http
			.post(this.userUrl+'login', JSON.stringify(user_to_login), {headers: this.headers})
			.toPromise()
			.then(res => res.json().token)
			.catch(this.handleError);
		}
		return this.http
			.post(this.userUrl+'login', JSON.stringify(user_to_login), {headers: this.headers})
			.toPromise()
			.then(res => res.json().user)
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('Hubo un error ', error);
		return Promise.reject(error.message || error);
}

}