import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Detail41Component} from "../components/offers/detail41/detail41.component";

@Injectable()
export class CanDeactivateGuardService implements CanDeactivate<Detail41Component> {

  constructor() { }

  canDeactivate(
    component: Detail41Component,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate();
  }
}
