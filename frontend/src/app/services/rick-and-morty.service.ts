import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Character } from '../interfaces/character';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.apiUrl}/get`).pipe(
      map(response => response)
    );
  }

  getCharacter(id: string): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/fetch?id=${id}`);
  }

  createCharacter(character: Character): Observable<Character> {
    return this.http.post<Character>(`${this.apiUrl}/register`, character);
  }

  updateCharacter(id: string, character: Character): Observable<Character> {
    return this.http.put<Character>(`${this.apiUrl}/update?id=${id}`, character);
  }
}
