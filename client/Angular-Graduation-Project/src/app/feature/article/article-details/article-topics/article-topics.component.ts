import { Component, Input } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-article-topics',
  templateUrl: './article-topics.component.html',
  styleUrls: ['./article-topics.component.css'],
})
export class ArticleTopicsComponent {
  @Input() topicIds!: any[];
  parsedTopics: any[] = [];

  constructor(private apiCalls: ApiCallsService) {}

  ngOnInit() {
    if (this.topicIds.length > 0) {
      this.topicIds.forEach((topicId) => {
        this.apiCalls.getSingleTopic(topicId).subscribe({
          next: (topic: any) => {
            this.parsedTopics.push(topic.topic.name);
          },
          error: (error: any) => {
            console.error('Error fetching comment:', error);
          },
          complete: () => {},
        });
      });
    }
  }
}
