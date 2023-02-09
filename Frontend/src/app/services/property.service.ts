import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})

export class PropertyService {
  client: HttpClient;
  baseUrl = 'http://localhost:8080/api/v1/properties';

  // Should at least be imported from a config on the file system, but exists for simplicity and portability here
  headers = new HttpHeaders({
    'Authorization' : 'Basic ' + btoa("Frontend:PatheticAuthentication"),
  });

  constructor(http: HttpClient) { this.client = http }

  getAllProperties(): Observable<Property[]> {
    return this.client.get<Property[]>(`${this.baseUrl}`, {'headers': this.headers});
  }

  addProperty(property: Property): Observable<any> {
    return this.client.post(`${this.baseUrl}`, property, {'headers': this.headers });
  }

  updateProperty(property: Property): Observable<any> {
    return this.client.put(`${this.baseUrl}/${property.id}`, property, {'headers': this.headers });
  }

  deleteProperty(id: String): Observable<any> {
    return this.client.delete(`${this.baseUrl}/${id}`, {'headers': this.headers });
  }
}
