import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {SubscriptionModel} from '../model/subscription.model';
import {Video} from '../model/video.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  private baseUrl: string;

  constructor(public httpClient: HttpClient) {
    this.baseUrl = environment.backendUrl;
  }

  getSubscriptions(): Observable<SubscriptionModel[]> {
    return new Observable<SubscriptionModel[]>(subscriber => {
      this.httpClient.get(`${this.baseUrl}/subscriptions`)
        .subscribe((data: any) => {
          let subscriptions: SubscriptionModel[] = [];

          data.forEach((item: any) => {
            subscriptions.push({
              id: item.id,
              topic: item.topic,
              duration: item.duration,
              channel: item.channel,
              user: item.user,
            });
          });

          subscriber.next(subscriptions);
        }, error => subscriber.error(error));
    });
  }

  preview(topic?: string, channel?: string, duration?: number): Observable<Video[]> {
    return new Observable<Video[]>(subscriber => {
      this.httpClient.post(`${this.baseUrl}/subscriptions/preview`, {
        topic,
        channel,
        duration
      }).subscribe((data: any) => {
        let videos: Video[] = [];

        data.videos.forEach((item: any) => {
          videos.push({
            id: item.id,
            channel: item.channel,
            description: item.description,
            duration: item.duration,
            timestamp: new Date(item.timestamp * 1000),
            title: item.title,
            topic: item.topic,
            urlVideo: item.urlVideo,
            urlVideoWebsite: item.urlVideoWebsite,
          });
        });

        subscriber.next(videos);
      }, error => subscriber.error(error));
    });
  }

  getSubscription(subscriptionId: string) {
    return new Observable<SubscriptionModel>(subscriber => {
      this.httpClient.get(`${this.baseUrl}/subscriptions/${subscriptionId}`)
        .subscribe((data: any) => {
          subscriber.next({
            id: data.id,
            topic: data.topic,
            duration: data.duration,
            channel: data.channel,
            user: data.user,
          });
        }, error => subscriber.error(error));
    })
  }

  create(subscription: SubscriptionModel): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/subscriptions`, {
      topic: subscription.topic,
      channel: subscription.channel,
      duration: subscription.duration,
    });
  }

  update(subscription: SubscriptionModel) {
    return this.httpClient.put(`${this.baseUrl}/subscriptions/${subscription.id}`, {
      topic: subscription.topic,
      channel: subscription.channel,
      duration: subscription.duration,
    });
  }

  delete(subscriptionId: number) {
    return this.httpClient.delete(`${this.baseUrl}/subscriptions/${subscriptionId}`);
  }
}
