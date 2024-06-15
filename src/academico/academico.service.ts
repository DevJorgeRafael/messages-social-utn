import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AcademicoService {
    private readonly apiUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) { 
        this.apiUrl = this.configService.get<string>('API_URL');
    }

    getFacultades(): Observable<AxiosResponse<any>> {
        return this.httpService.get(`${this.apiUrl}/facultades`);
    }

    getCarreras(): Observable<AxiosResponse<any>> {
        return this.httpService.get(`${this.apiUrl}/carreras`);
    }

    getNiveles(): Observable<AxiosResponse<any>> {
        return this.httpService.get(`${this.apiUrl}/niveles`);
    }

    
}
