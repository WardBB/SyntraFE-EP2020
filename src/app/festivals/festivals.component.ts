import { Component, OnInit } from '@angular/core';
import { Festival } from 'src/app/shared/model/festival.model'
import { FestivalService } from 'src/app/shared/services/festival.service';
import { Observable, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-festivals',
  templateUrl: './festivals.component.html',
  styleUrls: ['./festivals.component.css']
})
export class FestivalsComponent implements OnInit {

  public festivals$: Observable<Festival[]>;
  
  public results: Festival[];
  public selected: Festival;

  public search: FormControl = new FormControl();  

  constructor(private festivalService: FestivalService) { }

  ngOnInit() {
    this.festivals$ = this.festivalService.getFestivals();
    this.resetList();

    this.search.valueChanges
      .pipe(debounce(() => interval(100)))
      .subscribe((query: string) => {
        console.log('query:', query);
        if (!query) {
          this.resetList();
        }

        const regex = new RegExp(this.escapeRegExp(query), 'i');
        this.festivals$.subscribe(items => {
          this.results = items.filter(item => (
               regex.test(item.name)
            || regex.test(item.country)
            || regex.test(item.city)
          ));
        });
      });
  }

  addFav(id: number) {
    console.log("add favorite", id);
    this.festivalService.addFavorite(id).subscribe();
  }

  setSelected(festival: Festival) {
    console.log("set selected", festival.id);
    this.selected = festival;
  }

  resetList() {
    this.festivals$.subscribe(items => this.results = items);
  }

  /**
   * Stolen from; https://stackoverflow.com/a/6969486
   * @param string String to escape for regex
   */
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

}
