import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  { path: 'matches/:teamNumber', loadChildren: './pages/matches/matches.module#MatchesPageModule' },
  { path: 'create', loadChildren: './pages/create/create.module#CreatePageModule' },
  { path: 'detail/:number', loadChildren: './pages/detail/detail.module#DetailPageModule' },
  { path: 'teams', loadChildren: './pages/teams/teams.module#TeamsPageModule' },
  { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
  { path: 'dash', loadChildren: './pages/dash/dash.module#DashPageModule' },
  { path: 'help', loadChildren: './pages/help/help.module#HelpPageModule' },
  { path: 'picks', loadChildren: './pages/picks/picks.module#PicksPageModule' },
  { path: 'form_builder', loadChildren: './pages/form-builder/form-builder.module#FormBuilderPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
