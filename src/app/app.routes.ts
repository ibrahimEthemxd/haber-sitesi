import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CategoryComponent } from './pages/category/category';
import { SearchComponent } from './pages/search/search';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:name', component: CategoryComponent },
  { path: 'search', component: SearchComponent },
];
