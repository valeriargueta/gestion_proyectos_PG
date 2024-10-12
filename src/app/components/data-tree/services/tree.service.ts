import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  getDataTree = new BehaviorSubject({});
  selectedPermissions = new BehaviorSubject({});

  constructor() { }

  getSelectPermissions(){
    return this.getDataTree.next(true);
  }

  resetValues() {
    this.getDataTree.next({});
  }
}