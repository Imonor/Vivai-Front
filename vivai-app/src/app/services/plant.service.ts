import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import { UserPlant } from '../models/user-plant';
import { SupportedPlant } from '../models/supported-plant';
import { AuthService } from '../auth/auth.service';
import { InfosPlant } from '../models/infos-plant';

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
    return this.httpClient.get<UserPlant>(this.API_URL + 'getPlantId', { params: { plantId: id.toString() } });
  }

  getSupportedPlants(): Observable<SupportedPlant[]> {
    return this.httpClient.get<SupportedPlant[]>(this.API_URL + 'getSupportedPlants');
  }

  getListUserPlants(): Observable<UserPlant[]> {
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
    params = params.append('species', plant.plantTypeControl.toString());
    params = params.append('nickname', plant.nickName.toString());
    params = params.append('location', plant.location.toString());
    params = params.append('temperature', plant.temperature.toString());
    params = params.append('sunExpo', plant.sunExpo.toString());
    return this.httpClient.request('PUT', this.API_URL + 'insertUserPlant', {responseType: 'json', params})
  }

  deleteUserPlant(plantUserId): Observable<any> {
    let params = new HttpParams();
    params = params.append('userId', this.user.getUsername());
    params = params.append('userPlantId', plantUserId.toString());
    console.log(params);
    return this.httpClient.request('PUT', this.API_URL + 'deleteUserPlant', {responseType: 'json', params})
  }

  getPlantInfos(plantId): Observable<InfosPlant> {
    return this.httpClient.get<InfosPlant>(this.API_URL + 'getPlantInfos', { params: { plantId: plantId.toString() } });
  }

  getRandomInfos(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + 'getRandomInfos');
  }

  async getUserInfo() {
    this.user = await Auth.currentAuthenticatedUser();
  }
}
