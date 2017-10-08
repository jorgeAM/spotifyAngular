import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//componentes
import { UserEditComponent }   from './components/user-edit.component';

const routes: Routes = [
	{ path: '', component: UserEditComponent},
  { path: 'misDatos', component: UserEditComponent},
  { path: '**', component: UserEditComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}