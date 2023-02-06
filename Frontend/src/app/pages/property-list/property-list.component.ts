import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { HttpClient } from '@angular/common/http';
import { Property } from '../../models/property';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  propertyService: PropertyService;
  properties: Property[] | undefined;

  constructor(http: HttpClient) {
    this.propertyService = new PropertyService(http);
  }

  async ngOnInit() {
    await this.propertyService.getAllProperties().subscribe(properties => this.properties = properties, (err) => console.error(err), () => {
      console.log(this.properties);
    })

  }

}
