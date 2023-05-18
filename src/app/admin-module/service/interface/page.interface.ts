export interface PageInterface<T> {
  hasContent: boolean;
  hasNext: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  content: T[];
}
