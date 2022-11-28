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
  declarations: [AppComponent, HelloComponent, TrackVisibilityDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
