import { stringify } from '@angular/compiler/src/util';
import { 
    Component,  
    Input, 
    OnChanges,
    Output,
    EventEmitter
  } from '@angular/core';

import { Rol } from '../../rol.model';
import { Usuario } from '../../usuario.model';

import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.component.html',
  styleUrls: ['./crud-user.component.css']
})
export class CrudUserComponent implements OnChanges {

  @Input() listRoles: Rol[];
  @Input() userEdit: Usuario;
  @Output() saveClicked : EventEmitter<any> = new EventEmitter();

  disableBtn = "true";
  classBtnActive = "btnActive";
  classBtnActiveReverse = "";

  usuario : Usuario = {
    'id': 0,
    'nombre': '',
    'activo': '',
    'rol' : {
      'id': 0,
      'nombre': ''
    }
  };

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnChanges(){

    if(this.userEdit.id > 0){
      this.usuario.id = this.userEdit.id;
      this.usuario.nombre = this.userEdit.nombre;
      this.usuario.activo = this.userEdit.activo;
      this.usuario.rol = this.userEdit.rol;

      this.disableBtn = "";
      this.classBtnActive = "";
      this.classBtnActiveReverse = "btnActive";

    }else{
      this.usuario = {
        'id': 0,
        'nombre': '',
        'activo': '',
        'rol' : {
          'id': 0,
          'nombre': ''
        }
      }

      this.disableBtn = "true";
      this.classBtnActive = "btnActive";
      this.classBtnActiveReverse = "";

    }
  }


  saveUser(){

    var alertsField = this.validateFields();

    if(alertsField.length > 1){
      alert("Solucione los siguiente errores: \n"+alertsField);
    }else{
      this.usuarioService.saveUser(this.usuario).
        subscribe(responseService => {
          if(responseService.status == 200){

            alert('Usuario guardado');
            this.saveClicked.emit();

          }else{
            alert('Ocurrio un error: '+responseService.message);
          }
        });
    }
  }

  editUser(){
    
    var alertsField = this.validateFields();

    if(alertsField.length > 1){
      alert("Solucione los siguiente errores: \n"+alertsField);
    }else{
      this.usuarioService.editUser(this.usuario).
        subscribe(responseService => {
          if(responseService.status == 200){

            alert('Usuario editado');
            this.saveClicked.emit();

          }else{
            alert('Ocurrio un error: '+responseService.message);
          }
        });
    }

  }

  onChange(data : any){
    this.usuario.rol.id = data;
  }

  deleteUser(){
    
    var alertsField = this.validateFields();

    if(alertsField.length > 1){
      alert("Solucione los siguiente errores: \n"+alertsField);
    }else{

      if(window.confirm('¿Desea eliminar el usuario '+this.usuario.nombre+'?')){

        this.usuarioService.deleteUser(this.usuario.id).
          subscribe(responseService => {
            if(responseService.status == 200){

              alert('Usuario eliminado');
              this.saveClicked.emit();

            }else{
              alert('Ocurrio un error: '+responseService.message);
            }
          });
        }
    }
  }

  validateFields(){
    var alertsField : string = '';

    if(this.usuario.nombre.trim() == ''){
      alertsField += 'Debe de ingresar un nombre para el usuario \n';
    }

    if(this.usuario.activo.trim() == ''){
      alertsField += 'Debe de escoger un estado para el usuario \n';
    }

    if(this.usuario.rol.id == 0){
      alertsField += 'Debe de escoger un rol para el usuario \n';
    }

    return alertsField;
  }

}
