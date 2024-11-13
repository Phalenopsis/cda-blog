import { Component, Input } from '@angular/core';
import { Article } from '../../models/article.model';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.scss'
})
export class ArticleDetailsComponent {
  @Input() $article!: Observable<Article>;
}
