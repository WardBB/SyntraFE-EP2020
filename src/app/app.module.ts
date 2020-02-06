import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FestivalsComponent } from './festivals/festivals.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'festivals', component: FestivalsComponent },
  { path: 'favorites', component: FavoritesComponent }
];

const config = {
  apiKey: "AIzaSyAwaISJmaeyJN0gVl6gmyKxQSVh4F_7n20",
  authDomain: "syntraep2020feb.firebaseapp.com",
  databaseURL: "https://syntraep2020feb.firebaseio.com",
  projectId: "syntraep2020feb",
  storageBucket: "syntraep2020feb.appspot.com",
  messagingSenderId: "289727981727",
  appId: "1:289727981727:web:f071382def7db205e15aaa"
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FestivalsComponent,
    AboutComponent,
    ContactComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
