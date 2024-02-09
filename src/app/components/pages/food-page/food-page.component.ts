import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/model/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food!:Food;
  constructor(activatedRoute:ActivatedRoute, private api:FoodService, private cartService:CartService, private router:Router){
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      this.food = api.getFoodById(params.id)
    })
  }


  ngOnInit(): void {
      
  }

  //ADD to Cart Button Code
  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page')
  }

}

