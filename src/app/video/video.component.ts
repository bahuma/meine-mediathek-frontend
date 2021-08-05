import {Component, Input, OnInit} from '@angular/core';
import {Video} from '../model/video.model';
import {FeedService} from '../service/feed.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  @Input() video: Video|null = null;
  public watched = false;
  public processing = false;
  public expanded = false;

  constructor(private feedService: FeedService) { }

  ngOnInit(): void {
  }

  openVideo($event: MouseEvent, urlVideo: string) {
    $event.stopPropagation();

    window.open(urlVideo, '_blank');
  }

  setWatched($event: MouseEvent) {
    $event.stopPropagation();

    if (this.video) {
      this.processing = true;

      this.feedService.setWatched(this.video.id)
        .subscribe(response => {
          this.watched = true;
          this.processing = false;
        });
    }
  }

  unsetWatched($event: MouseEvent) {
    $event.stopPropagation();

    if (this.video) {
      this.processing = true;

      this.feedService.setUnwatched(this.video.id)
        .subscribe(response => {
          this.processing = false;
          this.watched = false;
        });
    }
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }
}
