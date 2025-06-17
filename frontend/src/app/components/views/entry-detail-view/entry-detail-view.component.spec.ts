import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryDetailViewComponent } from './entry-detail-view.component';

describe('EntryDetailViewComponent', () => {
  let component: EntryDetailViewComponent;
  let fixture: ComponentFixture<EntryDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryDetailViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
