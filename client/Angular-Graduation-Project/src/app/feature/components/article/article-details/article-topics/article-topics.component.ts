import { Component, Input, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { ITopic } from 'src/app/shared/interfaces/itopic';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-article-topics',
  templateUrl: './article-topics.component.html',
  styleUrls: ['./article-topics.component.css'],
})
export class ArticleTopicsComponent implements OnInit {
  @Input() topicIds!: string[];
  parsedTopics: string[] = [];

  constructor(
    private apiCalls: ApiCallsService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit() {
    if (this.topicIds.length > 0) {
      this.topicIds.forEach((topicId) => {
        this.apiCalls.getSingleTopic(topicId).subscribe({
          next: (topic: { topic: ITopic }) => {
            this.parsedTopics.push(topic.topic.name);
          },
          error: (err) => {
            console.error('Error fetching comment:', err);
            this.errorHandlerService.setErrorMessage(
              'An error occurred: ' + err.message
            );
          },
          complete: () => {},
        });
      });
    }
  }
}
