import { Routes } from '@angular/router';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterFormComponent } from './components/character-form/character-form.component';

export const routes: Routes = [
  { path: 'characters', component: CharacterListComponent },
  { path: 'characters/new', component: CharacterFormComponent },
  { path: 'characters/edit/:id', component: CharacterFormComponent },
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
];
