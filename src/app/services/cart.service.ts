import { Injectable } from '@angular/core';
import { Cart } from '../shared/model/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/model/Food';
import { CartItem } from '../shared/model/Cartitem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = new Cart();
  private cartSubject:BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  //add to cart Method
  addToCart(food: Food): void {
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    if (cartItem)
      return;

    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  //Remove Cart item
  removeFromCart(foodId:string):void{
    this.cart.items = this.cart.items.filter(item => item.food.id != foodId);
    this.setCartToLocalStorage();
  }

  //change Quantity
  changeQuantity(foodId:string, quantity:number){
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if(!cartItem)
    return;
    
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  //Clear Cart
  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  //get cart observable means check observable data
  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  //now set Localstorage data
  private setCartToLocalStorage(): void { //this.setCartToLocalStorage(); add this line in last ADD, REMOVE, CHANGE, CLEAR Cart 
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);//set in local storage
    this.cartSubject.next(this.cart);
  }

//Whenever set local storage data then also get data

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }

  
}
