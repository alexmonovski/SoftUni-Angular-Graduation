import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css'],
})
export class ArticleCreateComponent {
  createArticleFormGroup!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.createArticleFormGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.email]),
      description: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.createArticleFormGroup.valid) {
      const formData = this.createArticleFormGroup.value;
      console.log('Form Data:', formData);
    }
  }
}
