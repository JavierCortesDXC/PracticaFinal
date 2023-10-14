import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:4200/'; 

  constructor(private http: HttpClient) { }

  // Método para obtener la lista de productos
  getProducts(token: string) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get(`${this.apiUrl}/products`, { headers });
  }

  // Método para agregar un nuevo producto
  addProduct(token: string, productData: any) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(`${this.apiUrl}/products`, productData, { headers });
  }

  // Método para actualizar un producto existente
  updateProduct(token: string, productId: number, productData: any) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.put(`${this.apiUrl}/products/${productId}`, productData, { headers });
  }

  // Método para eliminar un producto
  deleteProduct(token: string, productId: number) {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.delete(`${this.apiUrl}/products/${productId}`, { headers });
  }
}
