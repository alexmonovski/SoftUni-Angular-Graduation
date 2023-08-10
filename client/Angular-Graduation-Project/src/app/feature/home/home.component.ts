import { Component } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  articles!: any[];

  constructor(private apiCalls: ApiCallsService) {}

  ngOnInit(): void {
    this.apiCalls.getAllArticles().subscribe((data) => {
      this.articles = data;
    });
  }
}
