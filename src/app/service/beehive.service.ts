import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://158.160.151.134:8080/';

export interface BeehiveData {
    stationId: string;
    hiveId: string;
    stationDate: string;
    clientDate: string;
    receivedDate: string;
    t1: number;
    t2: number;
    h1: number;
    h2: number;
    w0: number;
    w1: number;
    w2: number;
    w3: number;
    weight: number;
    voltage: number;
    stationVoltage: number;
    sign: string;

}

@Injectable({
    providedIn: 'root'
})
export class BeehiveService {

    constructor(private http: HttpClient) { }

    getAllBeehiveData(): Observable<BeehiveData[]> {
        // Получаем токен из LocalStorage
        const jwtToken = localStorage.getItem('token');
        console.log("Token " + jwtToken);
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
