import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public fetchUsers(): Observable<string[]> {
    return this.http.get<{ users: string[] }>(environment.userAPIUrl).pipe(
      map(response => response.users) // Extracts the 'users' array from the response object
    );
  }
}
