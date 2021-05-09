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

    var alerts = this.validateFields();

    if(alerts.length > 1){
      alert("Solucione los siguiente errores: \n"+alerts);
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
    
    var alerts = this.validateFields();
    console.log(JSON.stringify(this.usuario))

    if(alerts.length > 1){
      alert("Solucione los siguiente errores: \n"+alerts);
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
    
    var alerts = this.validateFields();

    if(alerts.length > 1){
      alert("Solucione los siguiente errores: \n"+alerts);
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
    var alerts : string = '';

    if(this.usuario.nombre.trim() == ''){
      alerts += 'Debe de ingresar un nombre para el usuario \n';
    }

    if(this.usuario.activo == ''){
      alerts += 'Debe de escoger un estado para el usuario \n';
    }

    if(this.usuario.rol.id == 0){
      alerts += 'Debe de escoger un rol para el usuario \n';
    }

    return alert;
  }

}
