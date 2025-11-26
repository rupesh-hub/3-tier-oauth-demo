import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  createdBy: string
  createdAt: string
}

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private resourceServerUrl = "http://192.168.1.70:8181"

  constructor(private http: HttpClient) {
  }

  public getWelcomeMessage():Observable<any> {
    return this.http.get(`${this.resourceServerUrl}/welcome`);
  }
}
