import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { Character } from '../../interfaces/character';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];

  constructor(
    private rickAndMortyService: RickAndMortyService
    ) {}

  ngOnInit(): void {
    this.rickAndMortyService.getCharacters().subscribe((data: Character[]) => {
      this.characters = data;
    });
  }
}
