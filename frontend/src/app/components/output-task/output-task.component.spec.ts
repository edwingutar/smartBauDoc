import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputTaskComponent } from './output-task.component';

describe('OutputTaskComponent', () => {
  let component: OutputTaskComponent;
  let fixture: ComponentFixture<OutputTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutputTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
