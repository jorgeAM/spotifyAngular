import { Component, OnInit } from '@angular/core';
//importamos clase User
import { User } from '../models/user';
//servicio de user
import { UserService } from '../services/user.service';

@Component({
  selector: 'user-edit',
  templateUrl: '../views/user-edit.component.html',
  providers: [UserService]
})
export class UserEditComponent implements OnInit{
  public title = 'Edita tu usario';
  public user: User;
  public identity;
  public token;
  //variables para subida de archivos
  filesToUpload: Array<File>;


  //constructor
  constructor(private userService: UserService){
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.user = this.identity;
  }

  ngOnInit(){
  }

  actualizar(){
    this.userService.updateUser(this.user)
      .then(res => {
        //guardamos en el localStorage
        localStorage.setItem('identity', JSON.stringify(this.user));
        document.getElementById('user-name').innerHTML = this.user.name;
        if(!this.filesToUpload){
          //redireccion
        }else{
          this.makeFileRequest(this.userService.userUrl+'/upload-avatar/'+this.user._id, [], this.filesToUpload )
            .then((res: any) => {
              this.user.image = res.image;
              //guardamos en el localStorage
              localStorage.setItem('identity', JSON.stringify(this.user));
              let image_path = this.userService.userUrl+'get-avatar/'+this.user.image;
              document.getElementById('avatar').setAttribute('src', image_path);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    console.log(this.user);
  }


  fileChangeEvent(fileInput: any){
    //target.files -> recoge los archivos que seleccionamos
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>){
    let token = this.token;
    return new Promise((resolve, reject) => {
      //objeto propio de ts
      let formData: any = new FormData;
      //subireos archivo por AJAX
      let xhr = new XMLHttpRequest();
      for(let i=0;i<files.length;i++){
        formData.append('image', files[i], files[i].name);
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
