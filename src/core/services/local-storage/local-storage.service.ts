import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public save(key: string, payload: any) {
    localStorage.setItem(key, JSON.stringify(payload));
  }

  public get(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public destroy() {
    localStorage.clear();
  }
}
