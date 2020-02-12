import { Injectable } from '@angular/core';
import { Festival } from 'src/app/shared/model/festival.model'
import { tap, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FestivalService {

  /**
   * The festival list in JSON server
   */
  urlFestivals = "http://localhost:3000/festivals";

  /**
   * The favorites list in JSON server
   */
  urlFavorites = "http://localhost:3000/favorites";

 constructor(private http: HttpClient) {}


 /**
  * gets all festivals of festival Json by url and returns it into an observable.
  */
getFestivals(): Observable<Festival[]> {
  return this.http
    .get<Festival[]>(this.urlFestivals)
    .pipe(tap(result => console.log("all festivals:", result)));
}
/**
 * Gets the id parameter to append to the url of festival JSON 
 * example output: http://localhost:3000/festivals/4
 * @param ids 
 */
getByIds(ids: number[]): Observable<Festival[]> {
  const params = new URLSearchParams;
  ids.forEach(id => params.append("id", id.toString()));
  const url = `${this.urlFestivals}/?${params}`;

  return this.http
    .get<Festival[]>(url)
    .pipe(tap(result => console.log("festivals by id:", result)));
}

 /**
  * gets all favorites of favorites Json by url and returns it into an observable.
  */
getFavorites(): Observable<Festival[]> {
  return this.http
    .get<Festival[]>(this.urlFavorites)
    .pipe(map(res => res));
}

/**
 * Takes id to post/push an item to favorites Json
 * @param id 
 */
addFavorite(id: number): Observable<any> {

  const headers = new HttpHeaders().set("Content-type", "application/json");

  return this.http
  .post(this.urlFavorites, {id}, { headers: headers });
}


/**
 * uses param favId to append to favorites url to delete an item from the favorites list.
 * @param favId 
 */
deleteFav(favId: number) {
  const url = `${this.urlFavorites}/${+favId}`;

  console.log(favId, url);

  return this.http.delete(url).pipe();
}

 ngOnInit() {

 }
}; 
