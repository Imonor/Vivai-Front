import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import { UserPlant } from '../models/user-plant';
import { SupportedPlant } from '../models/supported-plant';
import { AuthService } from '../auth/auth.service';
import { InfosPlant } from '../models/infos-plant';
import { PlantReport } from '../models/plant-report';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  API_URL: string = 'https://2jfhg21asd.execute-api.eu-west-1.amazonaws.com/dev/app/';
  user: CognitoUser;

  constructor(private httpClient: HttpClient, private _authService: AuthService, ) {
    this.getUserInfo();
  }

  getUserPlantInfos(id): Observable<UserPlant> {
    return this.httpClient.get<UserPlant>(this.API_URL + 'getUserPlantInfos', { params: { userId: this.user.getUsername() ,userPlantId: id.toString()  } });
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

  addReporting(plantId, reporting): Observable<any> {
    let params = new HttpParams();
    console.log(reporting);
    params = params.append('userPlantId', plantId.toString());
    params = params.append('water', reporting.water);
    params = params.append('prune', reporting.prune);
    params = params.append('repotting', reporting.repoting);
    params = params.append('harvest', reporting.harvest);
    params = params.append('comment', reporting.note);
    console.log('params : ' + params);
    return this.httpClient.request('PUT', this.API_URL + 'addReporting', {responseType: 'json', params});
  }

  getReportings(plantId): Observable<PlantReport[]> {
    let params = new HttpParams();
    params = params.append('userPlantId', plantId.toString());
    console.log(params);
    return this.httpClient.get<PlantReport[]>(this.API_URL + 'getReportings', {responseType: 'json', params });
  }

  updatePlant(plant): Observable<any> {
    console.log(plant);
    let params = new HttpParams();
    params = params.append('userPlantId', plant.currentPlant.id.toString());
    params = params.append('userId', plant.currentPlant.userId.toString());
    if(plant.nickname != "") params = params.append('nickname', plant.nickname);
    else params = params.append('nickname', plant.currentPlant.nickname);
    if(plant.location != "") params = params.append('location', plant.location);
    else params = params.append('location', plant.currentPlant.location);
    if(plant.temperature != "") params = params.append('temperature', plant.temperature.toString());
    else params = params.append('temperature', plant.currentPlant.temperature.toString());
    if(plant.sunExpo != "") params = params.append('sunExpo', plant.sunExpo.toString());
    else params = params.append('sunExpo', plant.currentPlant.sunExpo.toString());
    if(plant.shared != "") params = params.append('shared', plant.currentPlant.shared);
    else params = params.append('shared', plant.currentPlant.shared);
    console.log(params);
    return this.httpClient.request('PUT', this.API_URL + 'updatePlant', {responseType: 'json', params});
  }

  sharePlant(plant): Observable<any> {
    console.log(plant);
    let params = new HttpParams();
    params = params.append('userPlantId', plant.id.toString());
    params = params.append('userId', plant.userId.toString());
    params = params.append('nickname', plant.nickname);
    params = params.append('location', plant.location);
    params = params.append('temperature', plant.temperature);
    params = params.append('sunExpo', plant.sunExpo);
    params = params.append('shared', plant.shared);
    console.log(params);
    return this.httpClient.request('PUT', this.API_URL + 'updatePlant', {responseType: 'json', params});
  }

  getSharedPlants(plantId): Observable<UserPlant[]> {
    console.log(plantId);
    let params = new HttpParams();
    params = params.append('plantId', plantId.toString());
    params = params.append('userId', this.user.getUsername());
    return this.httpClient.get<UserPlant[]>(this.API_URL + 'getSharedPlants', {responseType : 'json', params});
  }
  getLilaResponse(userMessage): Observable<any> {
    let params = new HttpParams();
    console.log(userMessage);
    params = params.append('lilaRequest', userMessage);
    params = params.append('userId', this.user.getUsername());
    console.log(params);
    return this.httpClient.get<any>(this.API_URL + 'getLilaResponse', {responseType: 'json', params});
  }
}
