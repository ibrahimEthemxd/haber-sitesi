import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewsService } from '../../core/services/news';
import { PaginationComponent } from '../../components/pagination/pagination';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule,PaginationComponent],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  newsList: any[] = [];
  filteredNewsList: any[] = [];
  totalResults = 0;
  pageSize = 20;
  currentPage = 1;
  totalPagesArray: number[] = [];

  onlyWithImage: boolean = false;
  authorFilter: string = '';
  titleFilter: string = '';
  startDateFilter: string = '';
  endDateFilter: string = '';

  constructor(private route: ActivatedRoute, private newsService: NewsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.categoryName = params.get('name') || '';
      this.loadNews();
    });
  }

  loadNews(page: number = 1): void {
    this.currentPage = page;
    this.newsService.getTopHeadlines('us', this.categoryName, page, this.pageSize).subscribe((data: any) => {
      this.newsList = data.articles || [];
      this.totalResults = data.totalResults;
      this.applyFilters();
      this.calculatePagination();
    });
  }

  applyFilters(): void {
    this.filteredNewsList = this.newsList.filter(article => {
      if (this.onlyWithImage && !article.urlToImage) {
        return false;
      }
      if (this.authorFilter && article.author) {
        if (!article.author.toLowerCase().includes(this.authorFilter.toLowerCase())) {
          return false;
        }
      } else if (this.authorFilter) {
        return false;
      }
      if (this.titleFilter && article.title) {
        if (!article.title.toLowerCase().includes(this.titleFilter.toLowerCase())) {
          return false;
        }
      }
      if (this.startDateFilter) {
        const articleDate = new Date(article.publishedAt);
        const startDate = new Date(this.startDateFilter);
        if (articleDate < startDate) return false;
      }

      if (this.endDateFilter) {
        const articleDate = new Date(article.publishedAt);
        const endDate = new Date(this.endDateFilter);
        if (articleDate > endDate) return false;
      }

      return true;
    });

    this.calculatePagination();
  }

  calculatePagination(): void {
    const totalPages = Math.ceil(this.filteredNewsList.length / this.pageSize);
    this.totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.newsList = this.filteredNewsList.slice(start, end);
  }
}
