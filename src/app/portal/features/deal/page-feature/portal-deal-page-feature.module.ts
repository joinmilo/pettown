import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { CardModule } from 'src/app/shared/card/card.module';
import { DealPageFeatureComponent } from './component/deal-page-feature.component';
import { dealPageFeatureStateKey } from './constants/deal-page-feature.constants';
import { DealPageFeatureEffects } from './state/deal-page-feature.effects';
import { dealPageFeatureReducer } from './state/deal-page-feature.reducer';

const components = [
  DealPageFeatureComponent
];

const framework = [
  CommonModule,
];

const modules = [
  CoreModule,
  CardModule,
];

const libs = [
  StoreModule.forFeature(dealPageFeatureStateKey, dealPageFeatureReducer),
  EffectsModule.forFeature([DealPageFeatureEffects]),
]

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    ...modules,
    ...libs,
  ],
  exports: [...components],
})
export class PortalDealPageFeatureModule { }