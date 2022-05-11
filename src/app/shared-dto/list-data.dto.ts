export interface ListDataDto<T> {
  data: T[];
  current_page: number;
  last_page: number;
  total_count: number;
}
