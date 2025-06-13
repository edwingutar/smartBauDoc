import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEntriesViewComponent } from './project-entries-view.component';

describe('ProjectEntriesViewComponent', () => {
  let component: ProjectEntriesViewComponent;
  let fixture: ComponentFixture<ProjectEntriesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectEntriesViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectEntriesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
