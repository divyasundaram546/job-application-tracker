import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface JobApplication {
  id?: number;
  company: string;
  role: string;
  status: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Rejected';
  applied_date?: string;
  ctc_discussed?: string;
  notes?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private baseUrl = 'http://localhost:3000/applications';

  constructor(private http: HttpClient) {}

  getAll(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(this.baseUrl);
  }

  create(app: JobApplication): Observable<JobApplication> {
    return this.http.post<JobApplication>(this.baseUrl, app);
  }

  update(id: number, app: JobApplication): Observable<JobApplication> {
    return this.http.put<JobApplication>(`${this.baseUrl}/${id}`, app);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
