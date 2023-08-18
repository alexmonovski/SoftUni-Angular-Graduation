import { Component, Input } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { ITopic } from 'src/app/shared/interfaces/itopic';

@Component({
  selector: 'app-article-topics',
  templateUrl: './article-topics.component.html',
  styleUrls: ['./article-topics.component.css'],
})
export class ArticleTopicsComponent {
  @Input() topicIds!: string[];
  parsedTopics: string[] = [];

  constructor(private apiCalls: ApiCallsService) {}

  ngOnInit() {
    if (this.topicIds.length > 0) {
      this.topicIds.forEach((topicId) => {
        this.apiCalls.getSingleTopic(topicId).subscribe({
          next: (topic: { topic: ITopic }) => {
            this.parsedTopics.push(topic.topic.name);
          },
          error: (error) => {
            console.error('Error fetching comment:', error);
          },
          complete: () => {},
        });
      });
    }
  }
}
