import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class PhieuGiaHanService {
    constructor(private apiService: ApiService, private router: Router) {}
    save(body: any) {
        return this.apiService.post('/phieughan', body);
    }
}
