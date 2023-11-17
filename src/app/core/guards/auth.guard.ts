import { Injectable } from '@angular/core';
import {TokenStorageService} from "../services/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private tokenStorageService: TokenStorageService) {
  }
  canActivate() {
    return this.tokenStorageService.getToken() != null;
  }
}
