import { Component, OnInit } from '@angular/core';
import { Festival } from 'src/app/shared/model/festival.model'
import { FestivalService } from 'src/app/shared/services/festival.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-festivals',
  templateUrl: './festivals.component.html',
  styleUrls: ['./festivals.component.css']
})
export class FestivalsComponent implements OnInit {

  public festival$: Observable<Festival[]>;
  public selected$: Observable<Festival>;
  public selectedId: string;

  constructor(private festivalService: FestivalService) { }

  addFav(id: number) {

    console.log("add fav", id);
    this.festivalService.addFavorite(id).subscribe();

  }

  // detail(festivalId: string) {
  //   console.log(festivalId);
  //   if (this.selectedId == festivalId) {
  //     this.selectedId = null;
  //     // this.selected$ = null;
  //     return;
  //   }
  //   this.selectedId = festivalId;
  //   // this.selected$ = this.festivalService.getByIds(festivalId);
  // }


  ngOnInit() {

    this.festival$ = this.festivalService.getFestivals();
  }

}
