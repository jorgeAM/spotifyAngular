import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//componentes
import { UserEditComponent }   from './components/user-edit.component';
import { ArtistListComponent } from './components/artist-list.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit.component';
import { ArtistDetailsComponent } from './components/artist-details.component';
import { AlbumAddComponent } from './components/album-add.component';
import { AlbumEditComponent } from './components/album-edit.component';
import { AlbumDetailsComponent } from './components/album-details.component';
import { SongAddComponent } from './components/song-add.component';

import { HomeComponent } from './components/home.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'home', component: HomeComponent},
  { path: 'misDatos', component: UserEditComponent},
  { path: 'artistas', component: ArtistListComponent},
  { path: 'nuevoArtista', component: ArtistAddComponent},
  { path: 'editar-artista/:id', component: ArtistEditComponent},
  { path: 'artista/:id', component: ArtistDetailsComponent},
  { path: 'nuevoAlbum/:artist', component: AlbumAddComponent},
  { path: 'album/:id', component: AlbumEditComponent},
  { path: 'detalle-album/:id', component: AlbumDetailsComponent},
  { path: 'nuevaCancion/:album', component: SongAddComponent},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}