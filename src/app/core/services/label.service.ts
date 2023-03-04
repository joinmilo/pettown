import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, of } from 'rxjs';
import { Maybe } from 'src/schema/schema';
import { CoreActions } from '../state/core.actions';
import { selectLabels, selectLanguage } from '../state/core.selectors';

@Injectable({ providedIn: 'root' })
export class LabelService {

  constructor(
    private store: Store,
  ) { }


  public lookup(tagId?: Maybe<string>): Observable<Maybe<string> | void> {
    return tagId 
      ? combineLatest([
          this.store.select(selectLabels),
          this.store.select(selectLanguage),
        ]).pipe(
          map(([labels, language]) => labels?.get(tagId)?.find(label => label?.language?.locale === language?.locale)),
          map((label) => label
            ? label['content'] as string
            : this.store.dispatch(CoreActions.saveLabel({ tagId }))
          )
        )
      : of(tagId);
  }
  
}
