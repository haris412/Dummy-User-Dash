import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Users } from '../models/users';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }
    
    async GetUsers() {
        return await this.httpClient
            .get<any>(
              `${environment.backendUrl}/users`,
            ).toPromise();
    }
}
