import { Injectable } from '@angular/core';
import { Food } from '../shared/model/Food';
import { sample_foods, sample_tags } from 'src/data';
import { Tag } from '../shared/model/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }
  getAll():Food[]{
    return sample_foods
  }

  //Search Food
  getAllFoodBySearchTerm(searchTerm:string){
    return this.getAll().filter(food =>food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }



  //get ALL Tag
  getAllTags(): Tag[] {
    return sample_tags;
  }


  //Get food by Tags
  getAllFoodsByTag(tag: string): Food[] {
    return tag === "All" ? this.getAll() : this.getAll().filter(food => food.tags?.includes(tag)); //use colon(:) in case of if else 
  }

  // Get Food by Id {part 8}
  getFoodById(foodId:string):Food{
    return this.getAll().find(food => food.id == foodId) ?? new Food();
  }


}
