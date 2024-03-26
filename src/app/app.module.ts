import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {AuthHttpInterceptor, AuthModule} from '@auth0/auth0-angular';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { FeedComponent } from './feed/feed.component';
import { VideoComponent } from './video/video.component';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from '@angular/material/legacy-progress-spinner';
import { SubscriptionFormComponent } from './subscriptions/subscription-form/subscription-form.component';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import { SubscriptionPreviewComponent } from './subscriptions/subscription-preview/subscription-preview.component';
import {FormsModule} from '@angular/forms';
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    VideoComponent,
    SubscriptionsComponent,
    SubscriptionFormComponent,
    SubscriptionPreviewComponent,
    ConfirmDialogComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        AuthModule.forRoot(environment.authConfig),
        FormsModule,
        MatButtonModule,
        HttpClientModule,
        MatCardModule,
        MatExpansionModule,
        CdkAccordionModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatDialogModule,
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
