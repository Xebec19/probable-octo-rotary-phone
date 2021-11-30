import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { HttpService } from 'src/app/global-services/httpRequest.service';
import { IApiResponse } from 'src/app/global-models/response.model';
import { IProducts } from 'src/app/global-models/products.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent implements OnInit, AfterViewInit {
  readonly pageSizeOptions = [10, 20, 40];
  pageSize: number = 5;
  pageIndex: number = 0;
  products: IProducts[] = [];
  totalProducts: number = 0;
  displayedColumns: string[] = [
    'ID',
    'Product Name',
    'Product Image',
    'Quantity',
    'Category',
    'Created On',
    'Updated On',
    'Status',
    'Price',
    'Delivery Price',
    'Country',
    'Action'
  ];
  dataSource = new MatTableDataSource<IProducts>(this.products);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private httpService: HttpService) {}

  async ngOnInit(): Promise<void> {
    this.setDataSource(this.pageIndex, this.pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  setDataSource = async (pageIndex: number, pageSize: number) => {
    this.products = await this.fetchProducts(pageSize, pageIndex);
    this.totalProducts = this.products[0].totalProducts ?? 0;
    this.dataSource = new MatTableDataSource<IProducts>(this.products);
  };

  fetchProducts = async (
    pageSize: number,
    pageIndex: number
  ): Promise<IProducts[]> => {
    const payload = {
      pageSize,
      pageIndex,
    };
    return new Promise((resolve) => {
      this.httpService
        .postRequest('/products/fetch-products', payload)
        .pipe(take(1))
        .subscribe((res: IApiResponse) => {
          resolve(res.data);
        });
    });
  };

  onPageChange = async (event: PageEvent) => {
    const { pageIndex, pageSize } = event;
    await this.setDataSource(pageIndex, pageSize);
  };
}
