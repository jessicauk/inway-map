/* import { Routes } from '@angular/router';

import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: 'map', component: MapComponent },
    { path: '', component: HomeComponent },
]; */

// src/app/app-routing.module.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapPageComponent } from './components/map-page/map-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // "/" → bienvenida
  { path: 'map', component: MapPageComponent }, // "/map" → app del mapa
  { path: '**', redirectTo: '' },
];

export class AppRoutingModule {}
