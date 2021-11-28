import { Component, OnInit } from '@angular/core';
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
export class CategoriesTableComponent implements OnInit {
  constructor(private categoriesService: CategoriesService) {}
  displayedColumns: string[] = [
    'categoryId',
    'categoryName',
    'createdOn',
    'status',
    'parentCategoryId',
  ];
  dataSource = new MatTableDataSource<ICategoriesTableEntity>();
  categories: ICategoriesTableEntity[] = [];
  ngOnInit(): void {
    this.getAllCategories(40, 0);
  }

  getAllCategories = async (pageLimit: number = 40, pageSize: number = 0) => {
    this.categoriesService
      .fetchCategories(pageLimit, pageSize)
      .subscribe((res: IApiResponse) => {
        this.categories = res.data.map((category: ICategoriesTableEntity) => {
          return category;
        });
        this.dataSource = new MatTableDataSource<ICategoriesTableEntity>(
          this.categories
        );
      });
  };
}
