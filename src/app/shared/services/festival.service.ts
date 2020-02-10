import { Injectable } from '@angular/core';
import { Festival } from 'src/app/shared/model/festival.model'
import { tap, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FestivalService {

  urlFestivals = "http://localhost:3000/festivals";

  urlFavorites = "http://localhost:3000/favorites";

 constructor(private http: HttpClient) {}

getFestivals(): Observable<Festival[]> {
  return this.http
    .get<Festival[]>(this.urlFestivals)
    .pipe(tap(result => console.log("all festivals:", result)));
}

getByIds(ids: number[]): Observable<Festival[]> {
  const params = new URLSearchParams;
  ids.forEach(id => params.append("id", id.toString()));
  const url = `${this.urlFestivals}/?${params}`;

  return this.http
    .get<Festival[]>(url)
    .pipe(tap(result => console.log("festivals by id:", result)));
}

getFavorites(): Observable<Festival[]> {
  return this.http
    .get<Festival[]>(this.urlFavorites)
    .pipe(map(res => res));
}

// getDetail(detailUrl: string): Observable<Festival[]> {
//   return this.http
//     .get<any[]>(detailUrl)
//     .pipe();
// }

addFavorite(id: number): Observable<any> {

  const headers = new HttpHeaders().set("Content-type", "application/json");

  return this.http
  .post(this.urlFavorites, {id}, { headers: headers });
}

 ngOnInit() {

 }
}; 
