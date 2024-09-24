import { TestBed } from "@angular/core/testing";
import { ApiService } from "./api.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TagInterface } from "../types/tag.interface";

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
      const request = [
        { id: '1', name: 'foo' },
      ];
      let tags: TagInterface[] | undefined;
      apiService.getTegs().subscribe(response => {
        tags = response;
      });

      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      req.flush(request);

      expect(tags).toEqual(request);
    });
  });

  describe('createTag', () => {
    it('should create teg', () => {

    });
  });

});
