import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NewsService } from '../../core/services/news';
import { NewsCardComponent } from '../../components/news-card/news-card';
import { SliderNewsComponent } from '../../components/slider-news/slider-news';
import { PaginationComponent } from '../../components/pagination/pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule,NewsCardComponent,SliderNewsComponent,PaginationComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  sliderNews: any[] = [];
  newsList: any[] = [];
  totalResults = 0;
  pageSize = 20;
  currentPage = 1;
  totalPagesArray: number[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
  this.loadNews();
}


  loadNews(page: number = 1): void {
    this.currentPage = page;
    this.newsService.getTopHeadlines('us', '', page, this.pageSize).subscribe((data) => {
      
      this.sliderNews = data.articles.slice(0, 3);
      this.newsList = data.articles.slice(3);
      this.totalResults = data.totalResults;
      this.calculatePagination();
    });
  }

  calculatePagination(): void {
    const totalPages = Math.ceil(this.totalResults / this.pageSize);
    this.totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    this.loadNews(page);
  }
  
}

