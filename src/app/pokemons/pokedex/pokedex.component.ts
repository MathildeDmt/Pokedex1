import { Component } from '@angular/core';
import { PokemonDetailComponent} from "../pokemon-detail/pokemon-detail.component";
import {Pokemon} from "../../modele/pokemon.modele";
import {PokemonService} from "../pokemon.service";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent {

  pokemonDetail ?: number;

  pokemonByDetail(pokemonDetail : number){
    return this.pokemonDetail = pokemonDetail;
  }


  //realodPage(){
  //  setTimeout(()=>{
  //    window.location.reload();
  //  }, 100);
  //}
}
