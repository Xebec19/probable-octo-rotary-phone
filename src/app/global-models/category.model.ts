export interface ICategory {
  category_id: number;
  category_name: string;
}
export interface ICategoriesTableEntity {
  category_id: number;
  category_name: string;
  created_on: string;
  category_image?: string;
  status: string;
  parent_category_id: number;
}
