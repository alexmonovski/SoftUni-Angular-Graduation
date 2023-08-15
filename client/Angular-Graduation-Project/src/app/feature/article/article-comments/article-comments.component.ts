import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.css'],
})
export class ArticleCommentsComponent implements OnInit {
  @Input() comments!: any[];

  constructor(
    private apiCalls: ApiCallsService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}
}
