import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class StorageHelper {

  public static setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static getItem(key: string): any {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }

    return null;
  }

  public static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public static clear() {
    localStorage.clear();
  }

}
