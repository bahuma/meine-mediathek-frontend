import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubscriptionsService} from '../service/subscriptions.service';
import {SubscriptionModel} from '../model/subscription.model';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit, OnDestroy {
  public subscriptions: SubscriptionModel[] = [];
  private subscriptionsSubscription?: Subscription;

  constructor(public subscriptionsService: SubscriptionsService, private snackbar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscriptionsSubscription = this.subscriptionsService.getSubscriptions()
      .subscribe(subscriptions => {
        this.subscriptions = subscriptions.sort((a, b) => {
          return a.topic.localeCompare(b.topic);
        });
      });
  }

  ngOnDestroy(): void {
    if (this.subscriptionsSubscription) {
      this.subscriptionsSubscription.unsubscribe();
    }
  }

  delete(subscription: SubscriptionModel, index: number) {
    this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: new ConfirmDialogModel('Löschen bestätigen', `Möchten Sie das Abo "${subscription.topic}" wirklich löschen?`)
    }).afterClosed().subscribe((dialogResult: boolean) => {
      if (!dialogResult) {
        return;
      }

      this.subscriptionsService.delete(subscription.id)
        .subscribe(() => {
          this.subscriptions.splice(index, 1);
          this.snackbar.open('Das Abo wurde gelöscht.', '', {duration: 4000})
        }, error => {
          console.error(error);
          this.snackbar.open('Das Abo konnte nicht gelöscht werden...', '', {duration: 4000})
        });
    });
  }
}
