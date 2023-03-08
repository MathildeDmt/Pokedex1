import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Pokemon} from "../../modele/pokemon.modele";
import {PokemonService} from "../pokemon.service";
import {PagedData} from "../../modele/paged-data.modele";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{

  @Output() pokemonSelect = new EventEmitter<number>();

  constructor(private pokemonService : PokemonService) {
  }

  recherche ?: string;
  pokemons?:PagedData<Pokemon>;

  getPokemon(){
    this.pokemonService.getPokemons().subscribe(pokemons => this.pokemons = pokemons);
  }

  getPokemonById (id : number) {
    this.pokemonSelect.emit(id);
  }

  getPokemonByRecherche(recherche : string){
    if(recherche == null) this.getPokemon();
    this.pokemonService.searchPokemons(recherche).subscribe(pokemons => this.pokemons = pokemons);
  }

  ngOnInit():void{
    this.getPokemon();
  }

  scroll() {
    if (this.pokemons) {
      this.pokemons.offset += this.pokemons?.limit;
        this.pokemonService.getPokemonScroll(this.pokemons.offset, this.pokemons?.limit).subscribe(myRes => {
          this.pokemons = {
            ...myRes,
            data: (this.pokemons?.data || []).concat(myRes.data),

          }});
      }
    }

}
