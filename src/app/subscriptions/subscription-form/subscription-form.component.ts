import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubscriptionsService} from '../../service/subscriptions.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatLegacySnackBar as MatSnackBar} from '@angular/material/legacy-snack-bar';
import {SubscriptionModel} from '../../model/subscription.model';
import {Subscription} from 'rxjs';

enum Modes {
  'add',
  'edit',
}

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss']
})
export class SubscriptionFormComponent implements OnInit, OnDestroy {
  modes = Modes;
  mode: Modes = Modes.add;
  subscription?: SubscriptionModel;
  loadSubscription?: Subscription;

  constructor(private subscriptionsService: SubscriptionsService,
              private router: Router,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data['mode'] == 'edit') {
        this.mode = Modes.edit;
        this.route.paramMap.subscribe(params => {
          const subscriptionId = params.get('subscriptionId');
          if (!subscriptionId) {
            console.error('subscriptionId missing');
            this.snackBar.open('Abo konnte nicht geladen werden...', '', {duration: 4000})
            this.router.navigateByUrl('/abos');
          } else {
            if (this.loadSubscription) {
              this.loadSubscription.unsubscribe();
            }

            this.loadSubscription = this.subscriptionsService.getSubscription(subscriptionId)
              .subscribe(subscription => {
                this.subscription = subscription;
              }, error => {
                this.snackBar.open('Abo konnte nicht geladen werden...', '', {duration: 4000});
                this.router.navigateByUrl('/abos');
              });
          }
        })
      } else {
        this.mode = Modes.add;

        this.subscription = {
          topic: '',
          id: 12345,
          user: '12345',
        };
      }
    });
  }

  ngOnDestroy(): void {
    this.loadSubscription?.unsubscribe();
  }

  save() {
    if (this.subscription?.topic) {
      if (this.mode === Modes.add) {
        this.subscriptionsService.create(this.subscription)
          .subscribe(() => {
            this.router.navigateByUrl('/abos');
            this.snackBar.open('Abo gespeichert', '', {duration: 4000});
          }, e => {
            console.error(e);
            this.snackBar.open('Fehler beim Speichern', '', {duration: 4000})
          });
      }


      if (this.mode === Modes.edit) {
        this.subscriptionsService.update(this.subscription)
          .subscribe(() => {
            this.router.navigateByUrl('/abos');
            this.snackBar.open('Abo gespeichert', '', {duration: 4000});
          }, e => {
            console.error(e);
            this.snackBar.open('Fehler beim Speichern', '', {duration: 4000})
          });
      }
    }
  }
}
