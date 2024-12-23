import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
  private _activeRequests: number;

  get loading(): boolean {
    return !!this._activeRequests;
  }

  constructor() {
    this._activeRequests = 0;
  }

  push() {
    this._activeRequests++;
  }

  pop() {
    this._activeRequests--;
  }
}
