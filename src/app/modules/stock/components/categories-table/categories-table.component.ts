import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  IApiResponse,
  ICategoriesTableEntity,
} from 'src/app/global-models/index.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.css'],
})
export class CategoriesTableComponent implements OnInit, AfterViewInit {
  constructor(private categoriesService: CategoriesService) {}
  displayedColumns: string[] = [
    'categoryId',
    'categoryName',
    'createdOn',
    'status',
    'parentCategoryId',
  ];
  categories: ICategoriesTableEntity[] = [];
  dataSource = new MatTableDataSource<ICategoriesTableEntity>(this.categories);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalCategories: number = 0;
  ngOnInit(): void {
    this.getAllCategories(40, 0);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllCategories = async (pageLimit: number = 40, pageSize: number = 0) => {
    this.categoriesService
      .fetchCategories(pageLimit, pageSize)
      .subscribe((res: IApiResponse) => {
        this.categories = res.data.map((category: ICategoriesTableEntity) => {
          return category;
        });
        this.totalCategories = res.data[0].total;
        this.dataSource = new MatTableDataSource<ICategoriesTableEntity>(
          this.categories
        );
      });
  };

  onPageChange = async (event: PageEvent) => {
    const { pageIndex, pageSize } = event;
    await this.getAllCategories(pageSize, pageIndex);
  };
}
