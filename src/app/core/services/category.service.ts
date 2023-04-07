import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable()
export class CategoryService {
    constructor(private apiService: ApiService, private router: Router) {}
    getAll() {
        return this.apiService.get('/category');
    }
}
