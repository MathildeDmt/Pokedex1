import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {Pokemon} from "../modele/pokemon.modele";
import {PagedData} from "../modele/paged-data.modele";
import {MessageService} from "./message.service";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  private pokemonUrl = 'http://pokedex-api.cleverapps.io/pokemons';

  getPokemons(): Observable<PagedData<Pokemon>>{
    return this.http.get<PagedData<Pokemon>>(this.pokemonUrl).pipe(
      tap(() =>this.log("fetched pokemons")),
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons'))
    );
  }

  getPokemon(id: number): Observable<Pokemon | undefined> {
    const url = this.pokemonUrl+'/'+id;
    this.messageService.addMessage(`PokemonService: fetched pokemon id=${id}`);
    return this.http.get<Pokemon | undefined>(url).pipe(
      tap(() =>this.log(`fetched id =${id}`)),
      catchError(this.handleError<Pokemon | undefined>('getPokemon'))
    );
  }

  getPokemonScroll(offset: number, limit: number): Observable<PagedData<Pokemon>> {
    return this.http.get<PagedData<Pokemon>>(this.pokemonUrl+'?offset='+offset+'&limit='+limit).pipe(
      tap(() =>this.log("fetched pokemons")),
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string): void {
    this.messageService.addMessage(`HeroService: ${message}`);
  }

  searchPokemons(recherche: string): Observable<PagedData<Pokemon>> {
    const params = new HttpParams()
      .set('search', recherche);
    return this.http.get<PagedData<Pokemon>>(`${this.pokemonUrl}`, {params}).pipe(
      tap(_ => this.log(`found pokemons matching "${recherche}"`)),
      catchError(this.handleError<PagedData<Pokemon>>('searchPokemons', ))
    );
  }


}
