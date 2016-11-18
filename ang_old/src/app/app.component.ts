import { Component } from '@angular/core';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HEROES } from './mock-heroes'
import { HeroService } from './hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Tour of Heroes';
  selectedHero: Hero;
  

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  heroes = HEROES;


}


