import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LinesComponent} from './pages/lines/lines.component';
import {RoutesComponent} from './pages/routes/routes.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'lines', pathMatch: 'full'},
  {path: 'lines', component: LinesComponent},
  {path: 'lines/:id', component: RoutesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
