import { Component, OnInit } from '@angular/core';
import { Festival } from 'src/app/shared/model/festival.model'
import { FestivalService } from 'src/app/shared/services/festival.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public favorites$: Observable<Array<{ id: number }>>;
  public festivals$: Observable<Festival[]>;

  constructor(private festivalService: FestivalService) { }

  deleteFav(favId: number){
    console.log("Try Delete", favId);

    this.festivalService.deleteFav(favId).subscribe(res => console.log);
  }

  ngOnInit() {
    this.favorites$ = this.festivalService.getFavorites();

    this.favorites$
      .pipe(map(favorites => favorites.map(favorite => favorite.id)))
      .subscribe(ids => {
        this.festivals$ = this.festivalService.getByIds(ids);
      });
  }

}
