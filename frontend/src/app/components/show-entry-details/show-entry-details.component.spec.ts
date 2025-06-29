import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEntryDetailsComponent } from './show-entry-details.component';

describe('ShowEntryDetailsComponent', () => {
  let component: ShowEntryDetailsComponent;
  let fixture: ComponentFixture<ShowEntryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowEntryDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowEntryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
