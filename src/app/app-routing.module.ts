import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  { path: 'team-info/:teamNumber', loadChildren: './pages/team-info/team-info.module#TeamInfoPageModule' },
  { path: 'detail/:number', loadChildren: './pages/detail/detail.module#DetailPageModule' },
  { path: 'teams', loadChildren: './pages/teams/teams.module#TeamsPageModule' },
  { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
  { path: 'match-schedule', loadChildren: './pages/match-schedule/match-schedule.module#MatchSchedulePageModule' },
  { path: 'scouting', loadChildren: './pages/scouting/scouting.module#ScoutingPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
