import { Component, OnInit } from '@angular/core';
import { Festival } from 'src/app/shared/model/festival.model'
import { FestivalService } from 'src/app/shared/services/festival.service';
import { Observable, empty } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public favorites$: Observable<Array<{ id: number }>>;
  public festivals$: Observable<Festival[]>;
  public showFavorites: boolean;

  constructor(private festivalService: FestivalService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    
    // this.showFavorites = this.authService.isLoggedIn;
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login'])
    }

    this.favorites$ = this.festivalService.getFavorites();
  
    this.favorites$
      .pipe(map(favorites => favorites.map(favorite => favorite.id)))
      .subscribe(ids => {
        if (ids.length === 0) {
          // this.festivals$ = new Observable<Festival[]>();
          this.festivals$ = empty().pipe(map(_ => [] as Festival[]))
          return;
        }
        this.festivals$ = this.festivalService.getByIds(ids);
        console.log(ids);
      });
  }

  deleteFav(favId: number) {
    console.log("Try Delete", favId);

    this.festivalService.deleteFav(favId).subscribe(res => console.log);
  }

}
