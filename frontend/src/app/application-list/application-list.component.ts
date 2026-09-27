import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicationService, JobApplication } from '../application.service';

@Component({
  selector: 'app-application-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css'],
})
export class ApplicationListComponent implements OnInit {
  applications: JobApplication[] = [];
  form: FormGroup;
  editingId: number | null = null;

  statuses = ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'];

  constructor(
    private appService: ApplicationService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      company: ['', Validators.required],
      role: ['', Validators.required],
      status: ['Applied', Validators.required],
      applied_date: [''],
      ctc_discussed: [''],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.appService.getAll().subscribe((data) => {
      console.log('Applications received:', data);
      this.applications = data;
      this.cdr.detectChanges();
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    if (this.editingId !== null) {
      this.appService.update(this.editingId, this.form.value).subscribe(() => {
        this.resetForm();
        this.loadApplications();
      });
    } else {
      this.appService.create(this.form.value).subscribe(() => {
        this.resetForm();
        this.loadApplications();
      });
    }
  }

  onEdit(app: JobApplication): void {
    this.editingId = app.id ?? null;

    this.form.patchValue({
      ...app,
      applied_date: app.applied_date ? app.applied_date.substring(0, 10) : '',
    });
  }

  onDelete(id: number): void {
    if (!confirm('Delete this application?')) return;

    this.appService.delete(id).subscribe(() => {
      this.loadApplications();
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.form.reset({ status: 'Applied' });
  }
}
