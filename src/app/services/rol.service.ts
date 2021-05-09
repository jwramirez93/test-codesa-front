import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ResponseService } from '../responseService.model';
import { Rol } from '../rol.model';

import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  listRols : Rol[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getAllRols(){
    return this.http.get<ResponseService>(environment.apiUrl+'rol/all');
  }
}
