import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-slider-news',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './slider-news.html',
  styleUrls: ['./slider-news.css']
})
export class SliderNewsComponent implements OnInit {
  @Input() newsList: any[] = [];

  currentIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.newsList.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.newsList.length) % this.newsList.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    clearInterval(this.intervalId);
    this.startAutoSlide(); 
  }
}
