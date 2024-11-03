import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostInterface } from './types/post.interface';
import { selectError, selectIsLoading, selectPosts } from './store/reducers';
import * as PostsActions from "./store/actions";

@Component({
  selector: 'posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.component.html',
})
export class PostsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  posts$: Observable<PostInterface[]>;

  constructor(private store: Store<PostInterface>) {
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    this.error$ = this.store.pipe(select(selectError));
    this.posts$ = this.store.pipe(select(selectPosts));
  }

  ngOnInit(): void {
    this.store.dispatch(PostsActions.getPosts());
  }
}
