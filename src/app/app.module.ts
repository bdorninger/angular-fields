import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputNumberModule } from 'primeng/inputnumber';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrackVisibilityDirective } from './track-visibility.directive';
import { AutoFocusModule } from 'primeng/autofocus';
import { FocusTrapModule } from 'primeng/focustrap';
import { NumInputComponent } from './numinput.component';
import { ComponentMetaDirective } from './comp-meta.directive';
import { AutoCompleteInputComponent } from './autocomplete-input.component';
import { CompQueryDirective } from './comp-query.directive';

import '@angular/common/locales/global/fr';
import '@angular/common/locales/global/it';
import '@angular/common/locales/global/de';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AutoCompleteModule,
    InputNumberModule,
    BrowserAnimationsModule,
    AutoFocusModule,
    FocusTrapModule,
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    TrackVisibilityDirective,
    NumInputComponent,
    AutoCompleteInputComponent,
    ComponentMetaDirective,
    CompQueryDirective,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
