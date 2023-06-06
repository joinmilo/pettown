import { createFeatureSelector, createSelector } from '@ngrx/store';
import { filterStateKey } from '../constants/filter.constants';
import { createParams } from '../utils/param-builder.utils';
import { FilterState } from './filter.reducer';

export const selectFilterState = createFeatureSelector<FilterState>(filterStateKey);

export const selectFiltersActive = createSelector(
  selectFilterState,
  state => state?.params
    && Object.values(state.params).some((value) => !!value?.length)
);

export const selectTargetGroups = createSelector(
  selectFilterState,
  state => state.targetGroups
);

export const selectFilterParams = createSelector(
  selectFilterState,
  state => createParams(state?.params)
);