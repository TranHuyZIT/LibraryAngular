import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable()
export class  BookItemService{
    constructor(private apiService: ApiService, private router: Router) {}
    getAll(filter?: any) {
        return this.apiService.get('/bookItem');
    }
    add(body: any){
        return this.apiService.post('/bookItem', body);
    }
    update(id: any, body: any) {
        return this.apiService.put(`/bookItem/${id}`, body);
    }
}