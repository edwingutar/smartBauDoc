import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAddViewComponent } from './project-add-view.component';

describe('ProjectAddViewComponent', () => {
  let component: ProjectAddViewComponent;
  let fixture: ComponentFixture<ProjectAddViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectAddViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectAddViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
