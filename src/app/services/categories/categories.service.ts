import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_URLS } from 'src/app/constants/urls';
import { ICategory } from 'src/app/interfaces/ICategory';
import { IKeyValue } from 'src/app/interfaces/IKeyValue';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  list$(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(API_URLS.CATEGORIES);
  }

  listToDropdown$(): Observable<IKeyValue[]> {
    return this.list$().pipe(
      map((categories: ICategory[]) => {
        return categories.map(item => {
          return {
            key: item.id,
            value: item.name
          } as IKeyValue;
        })
      })
    );
  }

  create$(category: ICategory): Observable<void> {
    return this.http.post<void>(
      API_URLS.CATEGORIES,
      category
    );
  }

  update$(category: ICategory): Observable<void> {
    return this.http.put<void>(
      API_URLS.CATEGORIES,
      category
    );
  }

  delete$(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URLS.CATEGORIES}/${id}`)
  }
}
