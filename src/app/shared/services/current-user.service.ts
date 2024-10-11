import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class CurrentUserService {

  currentUser$ = new Subject();


}
