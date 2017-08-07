import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RATPService {
  private resourceUrl: string = '/api/product';

  constructor(private httpService: Http) {}

  getHighLighted(): Promise<any> {
    return this.httpService.get(`${this.resourceUrl}/highlighted`)
      .toPromise()
      .then(response => response.json() as any);
  }
}
