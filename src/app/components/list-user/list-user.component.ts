import { Component, Output, EventEmitter, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../usuario.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {

  @Input() listUsuarios: Usuario[];
  @Output() createClicked : EventEmitter<any> = new EventEmitter();

  constructor() { }

  showViewCrud(user : any){
    this.createClicked.emit(user);
  }

}
