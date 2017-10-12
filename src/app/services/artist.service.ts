import { Injectable }    from '@angular/core';
//librerias para conectar con API
import { Headers, Http } from '@angular/http';
//para usar promise
import 'rxjs/add/operator/toPromise';
//modelo
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService{
}