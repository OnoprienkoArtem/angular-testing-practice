import { TestBed, waitForAsync } from "@angular/core/testing";
import { authGuard } from "./auth.guard";
import { of } from "rxjs";
import { CurrentUserService } from "../services/current-user.service";

describe('AuthGuard', () => {

  const mockCurrentUser = {
    currentUser$: of<{ id: string } | null>(null),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CurrentUserService,
          useValue: mockCurrentUser
        }
      ],
    });
  });

  it('returns true for logged in user', waitForAsync(() => {
    TestBed.runInInjectionContext(() => {
      return authGuard();
    }).subscribe(result => {
      expect(result).toBeTruthy();
    });
  }));


});
