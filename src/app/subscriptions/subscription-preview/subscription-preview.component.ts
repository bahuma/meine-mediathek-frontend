import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {debounce, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {SubscriptionsService} from '../../service/subscriptions.service';
import {Video} from '../../model/video.model';

@Component({
  selector: 'app-subscription-preview',
  templateUrl: './subscription-preview.component.html',
  styleUrls: ['./subscription-preview.component.scss']
})
export class SubscriptionPreviewComponent implements OnInit, OnChanges {

  @Input() topic?: string;
  @Input() channel?: string;
  @Input() duration?: number;

  dataChanged: Subject<{ topic?: string, channel?: string, duration?: number }> = new Subject<{ topic?: string, channel?: string, duration?: number }>();

  loadSubscription?: Subscription;
  public videos: Video[] = [];
  loading = true;

  constructor(private subscriptionsService: SubscriptionsService) { }

  ngOnInit(): void {
    this.dataChanged.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(properties => this.loadData(properties));

    if (this.topic) {
      this.loadData({
        topic: this.topic,
        channel: this.channel,
        duration: (this.duration && this.duration <= 0) ? undefined : this.duration,
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('topic') || changes.hasOwnProperty('channel') || changes.hasOwnProperty('duration')) {
      this.dataChanged.next({
        topic: this.topic,
        channel: this.channel,
        duration: (this.duration && this.duration <= 0) ? undefined : this.duration,
      });
    }
  }

  private loadData(properties: { topic?: string; channel?: string; duration?: number }) {
    if (this.loadSubscription) {
      this.loadSubscription.unsubscribe();
    }

    this.videos = [];

    if (!properties.topic) {
      return;
    }

    this.loading = true;

    this.loadSubscription = this.subscriptionsService.preview(properties.topic, properties.channel, properties.duration)
      .subscribe(videos => {
        this.loading = false;
        this.videos = videos;
      });
  }
}
