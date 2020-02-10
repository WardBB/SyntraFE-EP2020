import { Component, OnInit } from '@angular/core';
import { Festival } from 'src/app/shared/model/festival.model'
import { FestivalService } from 'src/app/shared/services/festival.service';
import { Observable, from } from 'rxjs';
import { first, take } from 'rxjs/operators';

@Component({
  selector: 'app-festivals',
  templateUrl: './festivals.component.html',
  styleUrls: ['./festivals.component.css']
})
export class FestivalsComponent implements OnInit {

  public festivals$: Observable<Festival[]>;
  public selected: Festival;

  constructor(private festivalService: FestivalService) { }

  ngOnInit() {
    this.festivals$ = this.festivalService.getFestivals();
  }

  addFav(id: number) {
    console.log("add favorite", id);
    this.festivalService.addFavorite(id).subscribe();
  }

  setSelected(festival: Festival) {
    console.log("set selected", festival.id);
    this.selected = festival;
  }

}


