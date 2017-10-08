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
	//cabecera donde mandamos token
	private headersAuthentication = new Headers({
		'Content-Type': 'application/json',
		'Authorization': this.getToken()
	});
	//url de api que usaremos
	private userUrl = "http://localhost:3100/api/";
	public identity;
	public token;

	//constructor
	constructor(private http: Http){}

	register(user: User): Promise<User>{
		return this.http.post(this.userUrl+'register', JSON.stringify(user), {headers: this.headers})
			.toPromise()
			.then(res => res.json().user)
			.catch(this.handleError)
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

	updateUser(user_to_update): Promise<User>{
		return this.http
			.put(this.userUrl+'update-user/'+user_to_update._id, JSON.stringify(user_to_update), {headers: this.headersAuthentication})
			.toPromise()
			.then((res) => res.json().user)
			.catch(this.handleError);
	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));
		if(identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}
		return identity;
	}

	getToken(){
		let token = JSON.parse(localStorage.getItem('token'));
		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}
		return token;
	}
}