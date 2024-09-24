import { TestBed } from "@angular/core/testing";
import { ApiService } from "./api.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

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

    });
  });

  describe('createTag', () => {
    it('should create teg', () => {

    });
  });

});
