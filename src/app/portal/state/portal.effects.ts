import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs';
import { portalUrl } from 'src/app/core/constants/core.constants';
import { GetMenuGQL, MenuItemEntity } from 'src/schema/schema';
import { PortalActions } from './portal.actions';

@Injectable()
export class PortalEffects implements OnInitEffects {

  ngrxOnInitEffects(): Action {
    return PortalActions.init();
  }

  getMenu = createEffect(() => this.actions.pipe(
    ofType(PortalActions.init),
    switchMap(() => this.getMenuService.watch().valueChanges),
    map(response => PortalActions.setMenu(response.data.getMenuItems?.result as MenuItemEntity[]))
  ));

  navigateDetails = createEffect(() => this.actions.pipe(
    ofType(PortalActions.navigateDetails),
    tap(action => this.router.navigate(['portal', action.feature?.code, action.slug ])),
  ), { dispatch: false });

  navigateMenu = createEffect(() => this.actions.pipe(
    ofType(PortalActions.navigateMenu),
    tap(action => {
      action?.item?.feature?.code
        ? this.router.navigate(['/', portalUrl, action.item.feature.code])
        : action?.item?.page?.slug
          ? this.router.navigate(['/', portalUrl, action.item.page.slug])
          : this.router.navigate(['/', portalUrl, '404']);
    }),
  ), { dispatch: false });

  notFound = createEffect(() => this.actions.pipe(
    ofType(PortalActions.notFound),
    tap(() => this.router.navigate(['/', portalUrl, '404'])),
  ), { dispatch: false });

  constructor(
    private actions: Actions,
    private getMenuService: GetMenuGQL,
    private router: Router,
  ) { }
}