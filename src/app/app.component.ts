import { Component, OnInit } from '@angular/core';
import { Rol } from './rol.model';

import { RolService } from './services/rol.service';
import { UsuarioService } from './services/usuario.service';
import { Usuario } from './usuario.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'test-front';

  showViewListUser = false;
  showViewCrudUser = false;

  listRoles : Rol[] = [];
  listUsuarios : Usuario[] = [];
  userEdit : Usuario;
  txtNameValue : string;

  constructor(
    private rolService : RolService,  
    private usuarioService: UsuarioService
  ){}

  ngOnInit(){
    this.fetchAllRols();
  }

  changeStatusViewListUser(data : string){
    
    this.showViewCrudUser = false;
    this.fetchUsers(data);
    if(!this.showViewListUser){
      this.showViewListUser = true;
    }
    
  }

  changeStatusViewCrudUser(data : any){

    if(!this.showViewCrudUser){
      this.showViewCrudUser = true;
    }

    if(typeof(data) == 'object'){
      this.userEdit = data;
    }else{
      this.userEdit = {
        'id': 0,
        'nombre': '',
        'activo': '',
        'rol' : {
          'id': 0,
          'nombre': ''
        }
      }
    }

  }

  cleanAllView(){
    this.showViewListUser = false;
    this.showViewCrudUser = false;
    this.txtNameValue = '';
  }

  refreshView(){
    this.cleanAllView();
  }

  fetchUsers(name : string){

    if(name.trim() != ''){
      this.usuarioService.getUserByName(name).
      subscribe(responseService => {
        if(responseService.status != 200){
          alert('Ocurrio un error '+responseService.message)
        }else{
          this.listUsuarios = responseService.data;
        }
      })
    }else{
      this.usuarioService.getAllUsers().
      subscribe(responseService => {

        if(responseService.status != 200){
          alert('Ocurrio un error '+responseService.message)
        }else{
          this.listUsuarios = responseService.data;
        }

        console.log(this.listUsuarios);
      });
    }

    
  }

  fetchAllRols(){
    this.rolService.getAllRols().
      subscribe(responseService => {

        if(responseService.status != 200){
          alert('Ocurrio un error: '+responseService.message);
        }

        this.listRoles = responseService.data;
      });
  }

}
