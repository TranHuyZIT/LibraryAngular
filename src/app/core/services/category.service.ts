import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class CategoryService {
    constructor(private apiService: ApiService, private router: Router) {}
    getAll(filter?: any) {
        return this.apiService.get('/category');
    }
    add(body: any){
        return this.apiService.post('/category', body);
    }
    update(id: any, body: any) {
        return this.apiService.put(`/category/${id}`, body);
    }
    getOne(id: any) {
        return this.apiService.get('/category/' + id);
    }
}
