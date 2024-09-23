import { TestBed } from "@angular/core/testing";
import { UserInterface } from "../types/user.interface";
import { UsersRxJsService } from "./users-rxjs.service";

describe('UsersRxJsService', () => {
  let usersService: UsersRxJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersRxJsService,
      ],
    });

    usersService = TestBed.inject(UsersRxJsService);
  });

  it('create a service', () => {
    expect(usersService).toBeTruthy();
  });

  describe('addUser', () => {
    it('should add a user', () => {
      const user: UserInterface = {
        id: '3',
        name: 'foo',
      };
      usersService.addUser(user);
      expect(usersService.users$.getValue()).toEqual([{id: '3', name: 'foo'}]);
    });
  });

  describe('removeUser', () => {
    it('should remove a user', () => {
      usersService.users$.next([
        { id: '3', name: 'foo' },
      ]);
      usersService.removeUser('3');
      expect(usersService.users$.getValue()).toEqual([]);
    });
  });


});
