import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable()
export class PhieuTraService {
    constructor(private apiService: ApiService, private router: Router) {}
    getAll(filters?: any) {
        const queries = new HttpParams()
            .set('pageNo', filters?.pageNo || '')
            .set('sortBy', filters?.sortBy || '')
            .set('pageSize', filters?.pageSize || '')
            .set('reverse', !!filters?.reverse);
        return this.apiService.get('/phieutra', queries);
    }
    add(body: any){
        return this.apiService.post('/phieutra', body);
    }
    delete(id: any){
        return this.apiService.delete(`/phieutra/${id}`);
    }
    save(body: any) {
        return this.apiService.post('/phieutra', body);
    }
}