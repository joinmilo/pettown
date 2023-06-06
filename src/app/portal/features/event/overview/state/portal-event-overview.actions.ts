import { createActionGroup, emptyProps } from '@ngrx/store';
import { DisplayType } from 'src/app/core/typings/overview-display';
import { EventEntity, FilterSortPaginateInput, Maybe, PageableList_EventEntity } from 'src/schema/schema';

export const PortalEventOverviewActions = createActionGroup({
  source: 'Portal Event Overview',
  events: {
    'get sponsored event': emptyProps(),
    'set sponsored event': (event: Maybe<EventEntity>) => ({ event }),

    'display changed': (displayType?: DisplayType) => ({ displayType }),
    'set overview data': (events: PageableList_EventEntity) => ({ events }),

    'params updated': (params: FilterSortPaginateInput) => ({ params }),
  }
});




