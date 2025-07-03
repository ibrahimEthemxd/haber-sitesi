import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewsService } from '../../core/services/news';
import { PaginationComponent } from '../../components/pagination/pagination';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, PaginationComponent],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  newsList: any[] = [];
  totalResults: number = 0;
  pageSize: number = 20;
  currentPage: number = 1;
  totalPagesArray: number[] = [];

  constructor(private route: ActivatedRoute, private newsService: NewsService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.searchTerm = params.get('q') || '';
      if (this.searchTerm) {
        this.loadSearchResults(this.currentPage);
      }
    });
  }

  loadSearchResults(page: number): void {
    this.currentPage = page;
    this.newsService.searchEverything(this.searchTerm, page, this.pageSize).subscribe(data => {
      this.newsList = data.articles || [];
      this.totalResults = data.totalResults || 0;
      this.calculatePagination();
    });
  }

  calculatePagination(): void {
    const totalPages = Math.ceil(this.totalResults / this.pageSize);
    this.totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    this.loadSearchResults(page);
  }
}
