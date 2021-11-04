import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  currentUser: any;
  currentStep = 1;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCode: string;
  cartData: any;
  products: any;
  loading = false;
  successMessage = '';
  orderId;

  constructor(private _auth: AuthService, private _cart: CartService) {
    this._auth.user.subscribe((user) => {
      if (user) {
        this.currentUser = user;
        this.billingAddress[0].value = user.full_name;
        this.billingAddress[1].value = user.email;
      }
    });

    this._cart.cartDataObs$.subscribe((cartData) => {
      this.cartData = cartData;
    });
  }

  ngOnInit(): void {}

  submitCheckout() {
    this.loading = true;
    setTimeout(() => {
      this._cart
        .submitCheckout(this.currentUser.user_id, this.cartData)
        .subscribe(
          (res: any) => {
            console.log('salam');
            console.log(res);
            this.loading = false;
            this.orderId = res.orderId;
            this.products = res.products;
            this.currentStep = 4;
            this._cart.clearCart();
          },
          (err) => {
            console.log('bye');
            console.log(err);
            this.loading = false;
          }
        );
    }, 750);
  }

  getProgressPrecent() {
    return (this.currentStep / 4) * 100;
  }

  submitBilling(): void {
    this.nextStep();
  }

  canBillingSubmit(): boolean {
    return this.billingAddress.filter((field) => field.value.length > 0)
      .length !== 7
      ? true
      : false;
  }

  submitPayment(): void {
    this.nextStep();
  }

  canPaymentSubmit(): boolean {
    return this.cardNumber && this.cardName && this.cardExpiry && this.cardCode
      ? true
      : false;
  }

  nextStep(): void {
    this.currentStep += 1;
    localStorage.setItem('checkoutStep', this.currentStep.toString());
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
      localStorage.setItem('checkoutStep', this.currentStep.toString());
    }
  }

  billingAddress = [
    {
      name: 'نام و نام خانوادگی',
      placeholder: 'نام خود را وارد کنید',
      type: 'text',
      value: '',
    },
    {
      name: 'ایمیل',
      placeholder: 'ایمیل خود را وارد کنید',
      type: 'email',
      value: '',
    },
    {
      name: 'آدرس',
      placeholder: 'آدرس خود را وارد کنید',
      type: 'text',
      value: '',
    },
    {
      name: 'شهر',
      placeholder: 'نام شهر',
      type: 'text',
      value: '',
    },
    {
      name: 'استان',
      placeholder: 'نام استان',
      type: 'text',
      value: '',
    },
    {
      name: 'کد پستی',
      placeholder: 'کد پستی خود را وارد کنید',
      type: 'text',
      value: '',
    },
    {
      name: 'تلفن',
      placeholder: 'شماره تلفن خود را وارد کنید',
      type: 'text',
      value: '',
    },
  ];
}
