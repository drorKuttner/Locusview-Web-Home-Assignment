import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SetPlayersComponent } from './set-players/set-players.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatIconRegistry, MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { SquareComponent } from './board/square/square.component';
import { MessagesComponent } from './messages/messages.component';
import { BoardComponent } from './board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    SetPlayersComponent,
    SquareComponent,
    MessagesComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  entryComponents: [
    SetPlayersComponent
  ],
  providers: [MatIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule { }
