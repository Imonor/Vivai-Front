import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import { UserPlant } from '../models/user-plant';
import { SupportedPlant } from '../models/supported-plant';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  API_URL: string = 'https://2jfhg21asd.execute-api.eu-west-1.amazonaws.com/dev/app/';
  user: CognitoUser;

  constructor(private httpClient: HttpClient, private _authService: AuthService, ) {
    this.getUserInfo();
  }

  getPlant(id): Observable<UserPlant> {
    return this.httpClient.get<UserPlant>(this.API_URL + 'getPlantId', { params: { species: id.toString() } });
  }

  getSupportedPlants(): Observable<SupportedPlant[]> {
    return this.httpClient.get<SupportedPlant[]>(this.API_URL + 'getSupportedPlants');
  }

  getListPlants(): Observable<UserPlant[]> {
    return this.httpClient.get<UserPlant[]>(this.API_URL + 'getListPlants', { params: { userId: this.user.getUsername() } });
  }

  insertPlant(plant): Observable<any> {
    // Initialize Params Object
    // let params = new HttpParams();
    // Begin assigning parameters
    // params = params.append('firstParameter', parameters.valueOne);
    // params = params.append('secondParameter', parameters.valueTwo);
    // if (search.tempDePrep.toString() !== '') {
    //   params = params.append('tempDePrep', search.tempDePrep.toString());
    // }
    // Get Id of curent user.
    let params = new HttpParams();
    console.log(this.user.getUsername());
    params = params.append('userId', this.user.getUsername());
    params = params.append('plantId', "23");
    //params = params.append('nickName', plant.nickName.toString());
    params = params.append('location', plant.location.toString());
    params = params.append('temperature', plant.temperature.toString());
    params = params.append('sunExpo', plant.sunExpo.toString());
    console.log("parames", params);
    return this.httpClient.put(this.API_URL + 'insertPlant', { params: params });
  }

  async getUserInfo() {
    this.user = await Auth.currentAuthenticatedUser();
  }
}
