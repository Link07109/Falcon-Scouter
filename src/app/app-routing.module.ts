import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'scouting', pathMatch: 'full' },
  { path: 'team-info/:teamNumber', loadChildren: './pages/team-info/team-info.module#TeamInfoPageModule' },
  { path: 'detail/:number', loadChildren: './pages/detail/detail.module#DetailPageModule' },
  { path: 'teams', loadChildren: './pages/teams/teams.module#TeamsPageModule' },
  { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
  { path: 'match-schedule', loadChildren: './pages/match-schedule/match-schedule.module#MatchSchedulePageModule' },
  { path: 'scouting', loadChildren: './pages/scouting/scouting.module#ScoutingPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'event-rankings', loadChildren: './pages/event-rankings/event-rankings.module#EventRankingsPageModule' },
  { path: 'district-rankings', loadChildren: './pages/district-rankings/district-rankings.module#DistrictRankingsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
