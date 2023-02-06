import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})

export class PropertyService {
  client: HttpClient;
  baseUrl = 'http://localhost:8080/api/v1/properties';

  constructor(http: HttpClient) { this.client = http }

  getAllProperties(): Observable<Property[]> {
    return this.client.get<Property[]>(`${this.baseUrl}`);
  }
}
