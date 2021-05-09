import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../usuario.model';
import { ResponseService } from '../responseService.model';

import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listUsuarios : Usuario[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(){
    return this.http.get<ResponseService>(environment.apiUrl+'usuario/all');
  }

  getUserByName(name: string){
    return this.http.get<ResponseService>(environment.apiUrl+'usuario/byName/'+name);
  }

  saveUser(user: Usuario){
    return this.http.post<ResponseService>(environment.apiUrl+'usuario', user);
  }

  editUser(user: Usuario){
    return this.http.put<ResponseService>(environment.apiUrl+'usuario', user);
  }

  deleteUser(id: number){
    return this.http.delete<ResponseService>(environment.apiUrl+'usuario/'+id);
  }
}
