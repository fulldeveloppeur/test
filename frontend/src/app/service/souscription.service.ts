import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SouscriptionService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:3000/api/souscription';

  getAllDevis() {
    return this.http.get(this.url);
  }

  postSouscription(Souscription: any) {
    console.log('Souscription');
    this.http.post(this.url, Souscription).subscribe((data: any) => {
      return data;
    });
  }
}
