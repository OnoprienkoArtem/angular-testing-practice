import { TestBed } from "@angular/core/testing";
import { TodosService } from "./todos.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { FilterEnum } from "../types/filter.enum";

describe('TodosService', () => {
  let todosService: TodosService;
  let httpTestingController: HttpTestingController;

  const apiBaseUrl = 'http://localhost:3004/todos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TodosService,
      ],
    });

    todosService = TestBed.inject(TodosService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('create a service', () => {
    expect(todosService).toBeTruthy();
  });

  it('should set init data', () => {
    expect(todosService.apiBaseUrl).toBe(apiBaseUrl);
    expect(todosService.todosSig()).toEqual([]);
    expect(todosService.filterSig()).toEqual(FilterEnum.all);
  });

  describe('changeFilters', () => {
    it('should changes the filter', () => {
      todosService.changeFilters(FilterEnum.active);
      expect(todosService.filterSig()).toEqual(FilterEnum.active);
    });
  });

  describe('getTodos', () => {
    it('should get correct data', () => {
      const response = [{ text: 'foo', isCompleted: true, id: '1'}];
      todosService.getTodos();

      const request = httpTestingController.expectOne(apiBaseUrl);
      request.flush(response);

      expect(todosService.todosSig()).toEqual(response);
;    });
  });

  describe('addTodo', () => {
    it('should create todo', () => {
      const response = { text: 'foo', isCompleted: true, id: '1'};
      todosService.addTodo('text');

      const request = httpTestingController.expectOne(apiBaseUrl);
      request.flush(response);

      expect(todosService.todosSig()).toEqual([response]);
    });
  });

  describe('changeTodo', () => {
    it('should updates a todo', () => {
      const response = { text: 'bar', isCompleted: true, id: '1'};
      todosService.todosSig.set([{ text: 'foo', isCompleted: true, id: '1' }]);

      todosService.changeTodo('1', 'bar');

      const request = httpTestingController.expectOne(`${apiBaseUrl}/1`);
      request.flush(response);

      expect(todosService.todosSig()).toEqual([response]);
    });
  });

  describe('removeTodo', () => {
    it('should remove a todo', () => {
      todosService.todosSig.set([{ text: 'foo', isCompleted: true, id: '1' }]);
      todosService.removeTodo('1');

      const request = httpTestingController.expectOne(`${apiBaseUrl}/1`);
      request.flush({});

      expect(todosService.todosSig()).toEqual([]);
    });
  });

  describe('toggleTodo', () => {
    it('should toggles a todo', () => {
      const response = { text: 'bar', isCompleted: true, id: '1'};
      todosService.todosSig.set([{ text: 'foo', isCompleted: false, id: '1' }]);
      todosService.toggleTodo('1');

      const request = httpTestingController.expectOne(`${apiBaseUrl}/1`);
      request.flush(response);

      expect(todosService.todosSig()).toEqual([response]);
    });
  });

  describe('toggleAll', () => {
    it('should toggles all todo', () => {
      todosService.todosSig.set([
        { text: 'foo', isCompleted: false, id: '1' },
        { text: 'bar', isCompleted: false, id: '2' },
      ]);
      todosService.toggleAll(true);

      const requests = httpTestingController.match(request =>
        request.url.includes(apiBaseUrl),
      );
      requests[0].flush({ text: 'foo', isCompleted: true, id: '1' });
      requests[1].flush({ text: 'bar', isCompleted: true, id: '2' });

      expect(todosService.todosSig()).toEqual([
        { text: 'foo', isCompleted: true, id: '1' },
        { text: 'bar', isCompleted: true, id: '2' },
      ]);
    });
  });
});
