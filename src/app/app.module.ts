import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './cmps/header/header.component';
import { MainComponent } from './cmps/main/main.component';
import { PickUserComponent } from './cmps/comments-cmps/pick-user/pick-user.component'
import { CommentsComponent } from './cmps/comments-cmps/comments/comments.component';
import { HttpClientModule } from '@angular/common/http';
import { CommentsListComponent } from './cmps/comments-cmps/comments-list/comments-list.component';
import { CommentsPreviewComponent } from './cmps/comments-cmps/comment-preview/comment-preview.component';
import { RepliesListComponent } from './cmps/comments-cmps/replies-list/replies-list.component';
import { AddComponent } from './cmps/comments-cmps/add/add.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    PickUserComponent,
    CommentsComponent,
    CommentsListComponent,
    CommentsPreviewComponent,
    RepliesListComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
