import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable()
export class CurrentUserService {

  currentUser$ = new BehaviorSubject<{ id: string; name: string } | null | undefined>(undefined);

  setCurrentUser() {
    if (localStorage.getItem('token')) {
      this.currentUser$.next({ id: '1', name: 'Fomm' });
    } else {
      this.currentUser$.next(null);
    }
  }
}
