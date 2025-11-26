import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs"

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface RegisterResponse {
  id: string
  email: string
  firstName: string
  lastName: string
  username: string
  createdAt: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authServerUrl = "http://localhost:9000"

  constructor(private http: HttpClient) {
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.authServerUrl}/api/auth/register`, data)
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.authServerUrl}/oauth2/userinfo`)
  }
}
