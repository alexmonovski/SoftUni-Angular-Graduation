import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from 'src/app/shared/interfaces/iarticle';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css'],
})
export class ArticleCreateComponent {
  createArticleFormGroup!: FormGroup;
  existingArticle: IArticle | null = null;
  formTitle = 'Create';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiCalls: ApiCallsService
  ) {}

  ngOnInit(): void {
    this.createArticleFormGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.email]),
      description: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });

    const articleId = this.route.snapshot.params['id'];

    if (articleId) {
      this.apiCalls.getSingleArticle(articleId).subscribe({
        next: (data) => {
          this.existingArticle = data;
          this.populateForm();
        },
        error: (err) => console.log(err),
        complete: () => console.log('Successfully fetched resources.'),
      });
      this.formTitle = 'Edit';
    }
  }

  populateForm() {
    this.createArticleFormGroup.patchValue({
      title: this.existingArticle?.title || '',
      description: this.existingArticle?.description || '',
      content: this.existingArticle?.content || '',
    });
  }

  onSubmit() {
    if (this.createArticleFormGroup.valid) {
      const formData = this.createArticleFormGroup.value;
      console.log('Form Data:', formData);
    }
  }
}
