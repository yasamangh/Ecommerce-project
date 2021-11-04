import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Products, Product } from '../shared/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
//   categories ;
  categories: any[] = [
    {
      name: '1',
    },
    {
      name: '2',
    },
    {
      name: '3',
    },
    {
      name: '4',
    }
  ];

  loading = false;
  productPageCounter = 1;
  additionalLoading = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private _product: ProductService
  ) {}

  public screenWidth: any;
  public screenHeight: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.loading = true;
    setTimeout(() => {
      this.productService.getAllProducts(9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.products = res;
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
    }, 500);
    this.productService.getCategories().subscribe((category) => {
        for(let i=0; i<this.categories.length;i++){
            this.categories[i].name = category[i].title;
        }
        console.log(this.categories);
    })
  }

//   getCategories(){
//     return this._api.getTypeRequest('categories/');
// }

//   getCategories() {
//     this.httpClient.get<[]>('http://localhost:5000/api/v1/categories/')
//             .subscribe(response => {
//                 console.log(response);
//                 this.categories = response;
//             },
//             error => {
//         console.log(error);
//             }
//     );
//   }

  // postCategories(){
  //   this.httpClient.post<[]>('https://www.myapiurl.com/users', 'موادغذایی')
  //         .subscribe(response => {
  //             this.categories = response;
  //         },
  //         error => {
	// 		console.log(error);
  //         }
  //   );
  // }

  showMoreProducts(): void {
    this.additionalLoading = true;
    this.productPageCounter = this.productPageCounter + 1;
    setTimeout(() => {
      this.productService.getAllProducts(9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.products = [...this.products, ...res];
          this.additionalLoading = false;
        },
        (err) => {
          console.log(err);
          this.additionalLoading = false;
        }
      );
    }, 500);
  }
}
