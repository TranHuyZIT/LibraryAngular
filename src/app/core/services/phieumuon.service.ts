import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class PhieuMuonService {
    constructor(private apiService: ApiService, private router: Router) {}
    customerSave(body: any) {
        return this.apiService.post('/phieumuon', body);
    }
    getAll(filters?: any) {
        const queries = new HttpParams()
            .set('pageNo', filters?.pageNo || '')
            .set('readerId', filters?.readerId || '')
            .set('sortBy', filters?.sortBy || '')
            .set('pageSize', filters?.pageSize || '')
            .set('reverse', !!filters?.reverse);
        return this.apiService.get('/phieumuon', queries);
    }
    add(body: any) {
        return this.apiService.post('/phieumuon', body);
    }
    delete(id: any) {
        return this.apiService.delete(`/phieumuon/${id}`);
    }
    getOne(id: any) {
        return this.apiService.get('/phieumuon/' + id);
    }
    check(id: any) {
        return this.apiService.put('/phieumuon/check/' + id);
    }
}
