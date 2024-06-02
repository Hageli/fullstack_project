import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'login', loadComponent: () => import('./pages/login/login.component')},
    {path: 'register', loadComponent: () => import('./pages/register/register.component')},
    {path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component')},
    {path: 'home', loadComponent: () => import('./pages/home/home.component')},
    {path: '**', loadComponent: () => import('./pages/pagenotfound/pagenotfound.component')}
];
