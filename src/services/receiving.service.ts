import { Observable } from 'rxjs';
import { User } from 'src/app/models/auth/user';
import { UserInfo } from './../app/models/user-info';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReceivingService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) { }

  getUserInfo(id: number): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.baseUrl);
  }
}
