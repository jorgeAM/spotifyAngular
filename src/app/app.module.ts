import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

//componentes
import { AppComponent } from './app.component';
import { UserEditComponent } from './components/user-edit.component';
import { ArtistListComponent } from './components/artist-list.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit.component';
import { ArtistDetailsComponent } from './components/artist-details.component';
import { AlbumAddComponent } from './components/album-add.component';
import { AlbumEditComponent } from './components/album-edit.component';
import { AlbumDetailsComponent } from './components/album-details.component';
import { SongAddComponent } from './components/song-add.component';
import { HomeComponent } from './components/home.component';

//servicios
import { UserService } from './services/user.service';
import { ArtistService } from './services/artist.service';
import { AlbumService } from './services/album.service';
import { SongService } from './services/song.service';
import { UploadService } from './services/upload.service';
//routing
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    ArtistListComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailsComponent,
    AlbumAddComponent,
    AlbumEditComponent,
    AlbumDetailsComponent,
    SongAddComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [ 
    UserService,
    ArtistService,
    AlbumService,
    SongService,
    UploadService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
