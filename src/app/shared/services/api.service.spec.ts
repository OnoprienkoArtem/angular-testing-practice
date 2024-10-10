import { TestBed, waitForAsync } from "@angular/core/testing";
import { ApiService } from "./api.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TagInterface } from "../types/tag.interface";
import { HttpErrorResponse } from "@angular/common/http";

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
      ],
    });

    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('create a service', () => {
    expect(apiService).toBeTruthy();
  });

  describe('getTegs', () => {
    it('should get tegs', () => {
      const response = [
        { id: '1', name: 'foo' },
      ];
      let tags: TagInterface[] | undefined;
      apiService.getTegs().subscribe(response => {
        tags = response;
      });

      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush(response);

      expect(tags).toEqual(response);
      expect(req.request.method).toEqual('GET');
    });

    it('should return a list of tags with waitForAsync', waitForAsync(() => {
      const response = [
        { id: '1', name: 'foo' },
      ];
      apiService.getTegs().subscribe(response => {
        expect(response).toEqual(response);
        expect(req.request.method).toEqual('GET');
      });

      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush(response);
    }));

  });

  describe('createTag', () => {
    it('should create a teg', () => {
      const response = { id: '1', name: 'foo' };
      let tag: TagInterface | undefined;
      apiService.createTag('foo').subscribe(response => {
        tag = response;
      });

      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush(response);

      expect(tag).toEqual(response);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({name: 'foo'});
    });

    it('should throws an error if request is fails', () => {
      let actualError: HttpErrorResponse | undefined;
      apiService.createTag('foo').subscribe({
        next: () => fail('success should not be called'),
        error: err => actualError = err,
      });
      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush('Server error', {
        status: 422,
        statusText: 'Unprocessible entity'
      });

      if (!actualError) {
        throw new Error('Error needs to be defined');
      }

      expect(actualError.status).toEqual(422);
      expect(actualError.statusText).toEqual('Unprocessible entity');
    });
  });

});
