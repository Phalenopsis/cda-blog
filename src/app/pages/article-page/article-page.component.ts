import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../../models/article.model';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArticleDetailsComponent } from "../../components/article-details/article-details.component";
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [ArticleDetailsComponent],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss'
})
export class ArticlePageComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  #articleId!: number;

  #apiService: ApiService = inject(ApiService);

  #destroyRef: DestroyRef = inject(DestroyRef);

  $article!: Observable<Article>;

  $getArticleById(): Observable<Article> {
    return this.#apiService.$getArticleById(this.#articleId);
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe((params: ParamMap) => {
      this.#articleId = Number(params.get('id'));
      this.$article = this.$getArticleById();
    });
  }
}
