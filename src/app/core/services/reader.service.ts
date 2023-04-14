import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ReaderService {
    constructor(private apiService: ApiService) {}
    getAll(filters?: any) {
        const queries = new HttpParams()
            .set('pageNo', filters?.pageNo || '')
            .set('name', filters?.name || '')
            .set('sortBy', filters?.sortBy || '')
            .set('pageSize', filters?.pageSize || '')
            .set('reverse', !!filters?.reverse);
        return this.apiService.get('/reader', queries);
    }
    add(body: any) {
        return this.apiService.post('/reader', body);
    }
    update(id: any, body: any) {
        return this.apiService.put(`/reader/${id}`, body);
    }
    getOne(id: any) {
        return this.apiService.get('/reader/' + id);
    }
}
