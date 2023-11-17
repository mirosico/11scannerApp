import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Violation} from "../models/violation";
import {Result} from "../models/result";

@Injectable({
  providedIn: 'root'
})
export class ScannerService {
  baseUrl = 'http://localhost:3000/scanner/';

  constructor(private http: HttpClient) {}
  scan(url: string, violationsToIgnore: Violation[]) {
    return this.http.post<Result>(this.baseUrl + 'scan', {
      url,
      violationsToIgnore,
    });
  }

  getScanOptions() {
    return this.http.get<Violation[]>(this.baseUrl + 'options');
  }

  getScanResults() {
    return this.http.get<Result[]>(this.baseUrl + 'results');
  }

  getScanResult(id: string) {
    return this.http.get<Result>(this.baseUrl + 'results/' + id);
  }

  saveScanResultsToPDF(id: string) {
    return this.http.get(this.baseUrl + 'results/' + id + '/pdf', {
      responseType: 'blob'
    });
  }

  deleteScanResult(id: string) {
    return this.http.delete(this.baseUrl + 'results/' + id);
  }
}
