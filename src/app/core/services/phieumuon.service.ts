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
            .set('sortBy', filters?.sortBy || '')
            .set('pageSize', filters?.pageSize || '')
            .set('reverse', !!filters?.reverse);
        return this.apiService.get('/librarian', queries);
    }
    add(body: any) {
        return this.apiService.post('/librarian', body);
    }
    delete(id: any) {
        return this.apiService.delete(`/librarian/${id}`)
    }
}
