import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public defaultModalParams = {
    panelClass: 'quant-dialog-container',
    width: '800px',
  };

  constructor() { }

  getDefaultModalParams() {
    return Object.assign({}, this.defaultModalParams);
  }

  keys(val: any): Array<number> {
    return Object.keys(val).map(Number).filter(f => !isNaN(Number(f)));
  }
}
