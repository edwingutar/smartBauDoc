import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProjectEntrysComponent } from './show-project-entrys.component';

describe('ShowProjectEntrysComponent', () => {
  let component: ShowProjectEntrysComponent;
  let fixture: ComponentFixture<ShowProjectEntrysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowProjectEntrysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProjectEntrysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
