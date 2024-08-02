import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { Character } from '../../interfaces/character';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, MatProgressSpinnerModule],
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
})
export class CharacterFormComponent implements OnInit {
  characterForm: FormGroup;
  characterId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private rickAndMortyService: RickAndMortyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.characterForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      species: ['', Validators.required],
      type: [''],
      gender: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.characterId = id;
        this.rickAndMortyService
          .getCharacter(this.characterId)
          .subscribe((character: Character) => {
            this.characterForm.patchValue(character);
          });
      }
    });
  }

  onSubmit(): void {
    if (this.characterForm.valid) {
      if (this.characterId) {
        this.rickAndMortyService
          .updateCharacter(this.characterId, this.characterForm.value)
          .subscribe(() => {
            this.router.navigate(['/characters']);
          });
      } else {
        this.rickAndMortyService
          .createCharacter(this.characterForm.value)
          .subscribe(() => {
            this.router.navigate(['/characters']);
          });
      }
    }
  }
}
