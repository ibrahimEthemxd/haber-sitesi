import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class NewsService {
  private apiKey = '572aa4ccc5ad4788a98e34975aa4dc28';  
  private baseUrl = 'https://newsapi.org/v2/top-headlines';

  constructor(private http: HttpClient) {}

  getTopHeadlines(country = 'us', category = '', page = 1, pageSize = 20): Observable<any> {
    let url = `${this.baseUrl}?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${this.apiKey}`;
    if (category) { 
      url += `&category=${category}`;
    }
    return this.http.get(url);
  }

  searchEverything(query: string, page = 1, pageSize = 20): Observable<any> {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}
