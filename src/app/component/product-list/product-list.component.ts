import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = []; // Lista de productos
  newProduct: any = {}; // Datos de un nuevo producto
  errorMessage: string = '';
  selectedBrand: string = 'Todos';
  cart: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    const token = localStorage.getItem('token');
    if (token) {
      this.productService.getProducts(token).subscribe(
        (data: any) => {
          this.products = data;
        },
        (error) => {
          console.error('Error al obtener la lista de productos:', error);
          this.errorMessage = 'No se pudo cargar la lista de productos. Por favor, inténtalo de nuevo más tarde.';
        }
      );
    } else {
      console.error('El token no está presente en el almacenamiento local.');
      this.errorMessage = 'No se pudo obtener el token de autenticación. Por favor, inicia sesión.';
    }
  }

  // Método para agregar un nuevo producto
  addProduct(newProductData: any) {
    const token = localStorage.getItem('token');
    if (token) {
      this.productService.addProduct(token, newProductData).subscribe(
        (data: any) => {
          // Actualizar la lista de productos después de agregar
          this.products.push(data);
        },
        (error) => {
          console.error('Error al agregar un producto:', error);
        }
        );
      } else {
        console.error('El token no está presente en el almacenamiento local.');
      }
    }


  // Método para actualizar un producto existente
  updateProduct(productId: number, updatedProductData: any) {
    const token = localStorage.getItem('token');
    if (token) {
      this.productService.updateProduct(token, productId, updatedProductData).subscribe(
        (data: any) => {
        },
        (error) => {
          console.error('Error al actualizar el producto:', error);
        }
      );
    } else {
      console.error('El token no está presente en el almacenamiento local.');
    }
  }


  // Método para eliminar un producto
  deleteProduct(productId: number) {
    const token = localStorage.getItem('token');
    if (token) {
      this.productService.deleteProduct(token, productId).subscribe(
        (response) => {
          // Eliminar el producto de la lista
          this.products = this.products.filter((product) => product.id !== productId);
        },
        (error) => {
          console.error('Error al eliminar el producto:', error);
        }
      );
    } else {
      console.error('El token no está presente en el almacenamiento local.');
    }
  }

  addToCart(product: any) {
    this.cart.push(product);
  }
  

  filterByBrand(brand: string) {
    this.selectedBrand = brand;
    this.loadProducts(); 
  }
}
