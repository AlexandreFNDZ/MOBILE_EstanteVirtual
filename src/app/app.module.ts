import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { TabsPageModule } from './tabs/tabs.module';
import { Tab1PageModule } from './tab1/tab1.module';
import { Tab2PageModule } from './tab2/tab2.module';
import { Tab3PageModule } from './tab3/tab3.module';
import { AdicionarPageModule } from './adicionar/adicionar.module';
import { EditarPageModule } from './editar/editar.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule, 
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    TabsPageModule,
    Tab1PageModule,
    Tab2PageModule,
    Tab3PageModule,
    AdicionarPageModule,
    EditarPageModule,
  ],
  exports: [
    TabsPageModule,
    Tab1PageModule,
    Tab2PageModule,
    Tab3PageModule,
    AdicionarPageModule,
    EditarPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}