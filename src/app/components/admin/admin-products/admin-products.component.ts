import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productsS: ProductsService) {
    this.subscription = this.productsS.getAll().subscribe((products: Product[]) => {
      this.filteredProducts = this.products = products;
      this.initializeTable(products);
    })
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 }).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) { return; }
    this.tableResource.query(params).then(items => this.items = items);
  }
  ngOnInit() {
  }

  filter(query) {

    this.filteredProducts = (query) ? this.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase()))
      : this.filteredProducts = this.products;


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
