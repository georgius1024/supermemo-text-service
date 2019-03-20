import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Home/home.component'; 

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    /*
    {
        path: 'about',
        component: AboutComponent
    }
    */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
