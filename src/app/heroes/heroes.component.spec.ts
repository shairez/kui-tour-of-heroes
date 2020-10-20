import { HeroesComponent } from './heroes.component';

import { TestBed } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { subscribeSpyTo, ObserverSpy } from '@hirez_io/observer-spy';

describe('HeroesComponent', () => {
  let componentUnderTest: HeroesComponent;
  let heroServiceSpy: Spy<HeroService>;

  let actualResult: any;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroesComponent,
        { provide: HeroService, useValue: createSpyFromClass(HeroService) }
      ]
    });

    componentUnderTest = TestBed.inject(HeroesComponent);
    heroServiceSpy = TestBed.inject<any>(HeroService);
    
    actualResult = undefined;

  });

  describe('METHOD: ngOnInit', () => {
    let fakeHeroes: Hero[];
    let observerSpy: ObserverSpy<Hero[]>;
    Given(() => {
      fakeHeroes = [
        { id: 11111, name: 'FAKE HERO' }
      ]
      heroServiceSpy.getHeroes.and.nextWith(fakeHeroes);
    });
    
    When(() => {
      componentUnderTest.ngOnInit();
      observerSpy = subscribeSpyTo(componentUnderTest.heroes$);
    });
    
    Then('heroes should be saved locally', () => {
      expect(observerSpy.getLastValue()).toEqual(fakeHeroes);
    });
  });

});
