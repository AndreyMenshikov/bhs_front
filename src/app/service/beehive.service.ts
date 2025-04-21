import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://158.160.151.134:8080/';

export interface BeehiveData {
    id: number;
    dateMeasurement: string;
    dateStation: string;
    idBaseStation: number;
    idHive: number;
    weight: number;
    temperatureInside: number;
    temperatureOutside: number;
    humidityInside: number;
    humidityOutside: number;
    voltageController: number;
    voltageBattery: number;
}

@Injectable({
    providedIn: 'root'
})
export class BeehiveService {

    constructor(private http: HttpClient) { }

    getAllBeehiveData(): Observable<BeehiveData[]> {
        // Получаем токен из LocalStorage
        const jwtToken = localStorage.getItem('token');
        console.log("Heloo epta" + jwtToken);
        // Если токен существует, добавляем его в заголовки
        let headers = new HttpHeaders();
        if (jwtToken) {
            headers = headers.set('Authorization', `Bearer ${jwtToken}`);
        } else {
            console.log("JWT token not found in the Local Storage");
        }

        // Отправляем запрос с добавлением заголовка Authorization
        return this.http.get<BeehiveData[]>(BASE_URL + 'mainpage', { headers });
    }
}
