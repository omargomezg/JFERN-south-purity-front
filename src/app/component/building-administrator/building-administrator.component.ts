import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-building-administrator',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './building-administrator.component.html',
  styleUrl: './building-administrator.component.scss',
})
export class BuildingAdministratorComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  isPlaying = false;

  toggleVideo() {
    const video = this.videoPlayer.nativeElement;
    if (video.paused) {
      video.play();
      this.isPlaying = true;
    } else {
      video.pause();
      this.isPlaying = false;
    }
  }
}