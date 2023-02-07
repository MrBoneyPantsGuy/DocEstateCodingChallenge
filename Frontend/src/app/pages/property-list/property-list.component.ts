import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { HttpClient } from '@angular/common/http';
import { Property } from '../../models/property';
import { MatDialog } from '@angular/material/dialog';
import { EditPropertyComponent } from '../../components/edit-property/edit-property.component';
import { QuestionComponent } from '../../components/question/question.component';
import { NewPropertyComponent } from '../../components/new-property/new-property.component';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  propertyService: PropertyService;
  properties: Property[];
  stockimages: String[];

  constructor(http: HttpClient, public dialog: MatDialog) {
    this.propertyService = new PropertyService(http);
    this.stockimages = [];
    this.properties = [];
  }

  async ngOnInit() {
    this.propertyService.getAllProperties().subscribe(properties => this.properties = properties, (err) => console.error(err), () => {
      this.properties.forEach(() => {
        this.stockimages.push(this.getStockImage());
      })
    });
  }

  addProperty() {
    const dialogRef = this.dialog.open(NewPropertyComponent, {
      width: '500px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.properties.push(result);
        this.stockimages.push(this.getStockImage());
        this.propertyService.addProperty(result).subscribe();
      }
    })
  }

  editProperty(prop: Property): void {
    const dialogRef = this.dialog.open(EditPropertyComponent, {
      width: '500px',
      data: prop,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const index = this.properties.findIndex(props => props.id === result.id)
        this.properties[index] = result;
        this.propertyService.updateProperty(result).subscribe();
        console.log(result);
      }
    })
  }

  deleteProperty(prop: Property): void {
    const dialogRef = this.dialog.open(QuestionComponent, {
      data: prop,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const index = this.properties.findIndex(props => props.id === result.id);
        this.properties.splice(index, 1);
        this.stockimages.splice(index, 1);
        this.propertyService.deleteProperty(result.id).subscribe();
      }
    })
  }

  getStockImage(): String {
    return `https://api.lorem.space/image/house?w=600&h=400&hash=${Math.random()}`;
  }
}
