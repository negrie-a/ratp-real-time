import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RATPService {
  private resourceUrl: string = '/api/product';

  constructor(private httpService: Http) {}

  getStationsInfo(name: string, id: string): Promise<any> {
    return this.httpService.get(`http://localhost:3000/stations/${name}/type/${id}`)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
