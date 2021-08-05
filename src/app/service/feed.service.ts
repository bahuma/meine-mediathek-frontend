import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Video} from '../model/video.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private baseUrl: string;

  constructor(public httpClient: HttpClient) {
    this.baseUrl = environment.backendUrl;
  }

  getFeed(limit: number, offset: number): Observable<Video[]> {
    return new Observable<Video[]>(subscriber => {
      this.httpClient.get(`${this.baseUrl}/feed?limit=${limit}&offset=${offset}`)
        .subscribe((data: any) => {
          console.log(data);
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

  setWatched(videoId: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/watch-status`, {
      videoId
    });
  }

  setUnwatched(videoId: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/watch-status`, {
      body: {
        videoId,
      }
    });
  }
}
