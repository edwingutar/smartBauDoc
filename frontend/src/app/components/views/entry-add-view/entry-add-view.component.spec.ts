import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryAddViewComponent } from './entry-add-view.component';

describe('EntryAddViewComponent', () => {
  let component: EntryAddViewComponent;
  let fixture: ComponentFixture<EntryAddViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryAddViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryAddViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
