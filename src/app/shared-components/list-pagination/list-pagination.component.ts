import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ListDataDto } from '../../shared-dto/list-data.dto';

@Component({
  selector: 'app-list-pagination',
  templateUrl: './list-pagination.component.html',
  styleUrls: ['./list-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPaginationComponent implements OnInit {
  @Input()
  dataList?: ListDataDto<any>;

  constructor() {}

  ngOnInit(): void {}
}
