import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class LibrarianService {
    constructor(private apiService: ApiService) {}
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
    update(id: any, body: any) {
        return this.apiService.put(`/librarian/${id}`, body);
    }
    getOne(id: any) {
        return this.apiService.get(`/librarian/${id}`);
    }
}