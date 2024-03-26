import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FeedService} from '../service/feed.service';
import {Video} from '../model/video.model';
import {Subscription} from 'rxjs';
import {MatLegacySnackBar as MatSnackBar} from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {
  private feedServiceSubscription: Subscription | null = null;
  @ViewChild('videoList') videoList?: ElementRef;

  videos: Video[] = [];
  loading = true;
  loadingMore = false;
  limit = 20;
  offset = 0;
  noMoreVideosAvailable = false;

  constructor(public feedService: FeedService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.feedServiceSubscription = this.feedService.getFeed(this.limit, this.offset)
      .subscribe(videos => {
        this.loading = false;
        this.videos = videos;
      })
  }

  ngOnDestroy(): void {
    if (this.feedServiceSubscription) {
      this.feedServiceSubscription.unsubscribe();
    }
  }

  loadMore() {
    this.loadingMore = true;
    this.offset += this.limit;
    this.feedService.getFeed(this.limit, this.offset)
      .subscribe(videos => {
        this.videos.push(...videos);
        if (videos.length > 0) {
          this.loadingMore = false;
          setTimeout(() => {
            this.videoList?.nativeElement.querySelector(`.item:nth-child(${this.offset})`)?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }, 200);
        } else {
          this.snackbar.open('Keine weiteren Videos verfügbar.', '', {duration: 4000});
          this.noMoreVideosAvailable = true;
        }

      }, error => {
        console.error(error);
        this.snackbar.open('Fehler beim Laden der Videos!', '', {duration: 4000})
      });
  }
}
