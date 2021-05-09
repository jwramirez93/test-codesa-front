import { 
  Component,
  Output,
  OnChanges,
  EventEmitter, 
  Input} from '@angular/core';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnChanges {

  @Input() txtNameValue: string;
  @Output() searchClicked: EventEmitter<any> = new EventEmitter();
  @Output() cleanClicked: EventEmitter<any> = new EventEmitter();
  
  txt_name_search = '';

  constructor() { }

  ngOnChanges(){
    this.txt_name_search = (typeof(this.txtNameValue)=='undefined')? '':this.txtNameValue;
  }

  showViewList(){
    this.searchClicked.emit(this.txt_name_search);
  }

  cleanViews(){
    this.cleanClicked.emit();
    this.txt_name_search = '';
  }

}
