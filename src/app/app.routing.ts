import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//componentes
import { UserEditComponent }   from './components/user-edit.component';
import { ArtistListComponent } from './components/artist-list.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit.component';
import { HomeComponent } from './components/home.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'home', component: HomeComponent},
  { path: 'misDatos', component: UserEditComponent},
  { path: 'artistas', component: ArtistListComponent},
  { path: 'nuevoArtista', component: ArtistAddComponent},
  { path: 'editar-artista/:id', component: ArtistEditComponent},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}