import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FeedComponent} from './feed/feed.component';
import {SubscriptionsComponent} from './subscriptions/subscriptions.component';
import {SubscriptionFormComponent} from './subscriptions/subscription-form/subscription-form.component';

const routes: Routes = [
  {
    path: 'abos',
    component: SubscriptionsComponent,
  },
  {
    path: 'abos/edit/:subscriptionId',
    component: SubscriptionFormComponent,
    data: {
      'mode': 'edit',
    }
  },
  {
    path: 'abos/add',
    component: SubscriptionFormComponent,
    data: {
      'mode': 'add',
    }
  },
  {
    path: '',
    component: FeedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
