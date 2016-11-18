import { Component, OnInit, EventEmitter } from '@angular/core';

import { Recipe } from '../recipe';
import { RecipeItemComponent } from './recipe-item.component'

@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html'
})
export class RecipelistComponent implements OnInit {
  recipes: Recipe[] = [];
  dummyRecipe = new Recipe('Dummy', 'Dummy Description', 'http://www.ikea.com/my/en/images/products/gestalta-artist-s-dummy__24799_PE109573_S4.JPG')

  recipeSelected = new EventEmitter<Recipe>();

  onSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }

  constructor() { }

  ngOnInit() {
  }

}
