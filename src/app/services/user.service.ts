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
	private userUrl = "http://localhost:3100/api";

	//constructor
	constructor(private http: Http){}

	//login
	login(){
		return 'prueba de servicio';
	}
}