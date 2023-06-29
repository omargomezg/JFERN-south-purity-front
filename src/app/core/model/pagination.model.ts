export class PaginationModel {
  pageIndex: number;
  pageSize: number;
  length: number;
  pageSizeOptions: number[];

  constructor() {
    this.pageIndex = 0;
    this.pageSize = 25;
    this.length = 10;
    this.pageSizeOptions = [10, 25, 50, 100];
  }
}
