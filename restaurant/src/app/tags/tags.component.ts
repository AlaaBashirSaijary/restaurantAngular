import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../shared/models/Tag';
import { RouterModule } from '@angular/router';
import { FoodService } from '../Servises/food/food.service';
import { CommonModule } from '@angular/common'; // استيراد CommonModule

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './tags.component.html',
  styleUrl:'./tags.component.css'
})
export class TagsComponent implements OnInit{
  @Input()
  foodPageTags?:string[];
  @Input()
  justifyContent: string = 'center'; // التصحيح هنا
  tags?:Tag[];
  ngOnInit(): void {
    if(!this.foodPageTags)
   this.foodServices.getAllTagsServer().subscribe(
    serverTags=>{
    this.tags=serverTags;
  });
  /*this.tags=this.foodServices.getAllTags();*/

  }
  constructor(private foodServices: FoodService){}

}
