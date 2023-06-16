import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardType } from 'src/app/shared/card/typings/card';
import { SortOption, SortPaginate } from 'src/app/shared/table/typings/table';
import { selectOverviewData } from '../../state/portal-organisation-overview.selectors';

@Component({
  selector: 'app-portal-organisation-overview-card',
  templateUrl: './portal-organisation-overview-card.component.html',
  styleUrls: ['./portal-organisation-overview-card.component.scss']
})
export class PortalOrganisationOverviewCardComponent {

  @Output()
  public sortPaginate = new EventEmitter<SortPaginate>();

  public cardType = CardType.Contact;

  public organisations = this.store.select(selectOverviewData);

  public sortOptions: SortOption[] = [
    {
      label: 'name',
      field: 'name',
    },
    {
      label: 'name',
      field: 'name',
      dir: 'desc'
    },
    {
      label: 'lastUpdated',
      field: 'modified',
    },
    {
      label: 'lastUpdated',
      field: 'modified',
      dir: 'desc'
    },
  ];
  
  constructor(
    private store: Store,
  ) { }

}