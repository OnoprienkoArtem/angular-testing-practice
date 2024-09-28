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
;    });
  });
});
