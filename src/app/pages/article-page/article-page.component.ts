import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../../models/article.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArticleDetailsComponent } from "../../components/article-details/article-details.component";

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [ArticleDetailsComponent],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss'
})
export class ArticlePageComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  articleId!: number;

  http: HttpClient = inject(HttpClient);

  destroyRef: DestroyRef = inject(DestroyRef);

  $article!: Observable<Article>;

  $getArticleById(): Observable<Article> {
    return this.http.get<Article>(`http://localhost:3000/articles/${this.articleId}`);
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((params: ParamMap) => {
      this.articleId = Number(params.get('id'));
      this.$article = this.$getArticleById();
    });
  }
}
