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
}
