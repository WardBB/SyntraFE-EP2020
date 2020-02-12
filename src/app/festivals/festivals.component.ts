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

    /**
    * This gets the data from the Json list by using a function in festivalService (getFestivals),
    * so we can use it in the festivals component.
    */
    this.festivals$ = this.festivalService.getFestivals();

    /**
     * calls resetList function (declared further down).
     */
    this.resetList();

    /**
     * uses value of input in the HTML of the component to search through the festival list.
     */
    this.search.valueChanges
      .pipe(debounce(() => interval(100)))
      .subscribe((query: string) => {
        console.log('query:', query);

        /**
         * This resets items/result in input value is empty
         */
        if (!query) {
          this.resetList();
        }

        /**
         * use Regular expression to make sure the query/value ignores upper or lowercase
         */
        const regex = new RegExp(this.escapeRegExp(query), 'i');
        /**
         * filter for item.name/country/city and puts outcome into the results list.
         */
        this.festivals$.subscribe(items => {
          this.results = items.filter(item => (
            regex.test(item.name)
            || regex.test(item.country)
            || regex.test(item.city)
          ));
        });
      });
  }

  /**
   * gets ID of a festival to push to the favorites list (using addFavorite of the festivalService).
   * @param id 
   */
  addFav(id: number) {
    console.log("add favorite", id);
    this.festivalService.addFavorite(id).subscribe();
  }

  /**
   * gets the Observable festival to set the selected festival (used to show details of specific festival)
   * @param festival 
   */
  setSelected(festival: Festival) {
    console.log("set selected", festival.id);
    this.selected = festival;
  }

  /**
   * 
   */
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
