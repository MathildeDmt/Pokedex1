import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pokemon} from "../../modele/pokemon.modele";
import {ActivatedRoute} from "@angular/router";
import {PokemonService} from "../pokemon.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent {


  @Input() pokemonId ?: number;

  pokemon?: Pokemon;

  audio?: string;
  constructor(private route:ActivatedRoute,private pokemonService:PokemonService,private location: Location){
  }

  getPokemon(){
    if (this.pokemonId) {
      const id = this.pokemonId;
      this.pokemonService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon);
    }
  }

  ngOnChanges(): void {
    this.getPokemon();
  }

  goBack(){
    this.location.back();
  }

}
