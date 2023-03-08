import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonListComponent} from "./pokemons/pokemon-list/pokemon-list.component";
import {PokemonDetailComponent} from "./pokemons/pokemon-detail/pokemon-detail.component";
import {PokedexComponent} from "./pokemons/pokedex/pokedex.component";

const routes: Routes = [
  { path: '', component: PokedexComponent },
  { path: 'pokemon/:id', component: PokedexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
