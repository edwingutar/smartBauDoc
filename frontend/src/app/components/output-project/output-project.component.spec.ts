import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputProjectComponent } from './output-project.component';

describe('OutputProjectComponent', () => {
  let component: OutputProjectComponent;
  let fixture: ComponentFixture<OutputProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutputProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
