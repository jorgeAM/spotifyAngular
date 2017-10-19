import { Injectable }    from '@angular/core';
//librerias para conectar con API
import { Headers, Http } from '@angular/http';
//para usar promise
import 'rxjs/add/operator/map';
//modelo
import { Artist } from '../models/artist';

@Injectable()
export class UploadService{
	//constructor
	constructor(private http: Http){}

	makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string){
    return new Promise((resolve, reject) => {
      //objeto propio de ts
      let formData: any = new FormData;
      //subireos archivo por AJAX
      let xhr = new XMLHttpRequest();
      for(let i=0;i<files.length;i++){
        formData.append(name, files[i], files[i].name);
      }
      xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }

}