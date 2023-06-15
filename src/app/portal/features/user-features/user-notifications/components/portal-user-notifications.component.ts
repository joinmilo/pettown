import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Subject, takeUntil } from 'rxjs';
import { selectCurrentUser } from 'src/app/core/state/core.selectors';
import { UserContextEntity } from 'src/schema/schema';

@Component({
  selector: 'app-portal-user-notifications-creator',
  templateUrl: './portal-user-notifications.component.html',
  styleUrls: ['./portal-user-notifications.component.scss'],
})
export class PortalUserNotificationsComponent implements OnInit, OnDestroy {

  public currentUser?: Maybe<UserContextEntity> | undefined;

  private destroy = new Subject<void>(); 
  
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(selectCurrentUser).pipe(takeUntil(this.destroy)).subscribe(user => this.currentUser = user); 
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}