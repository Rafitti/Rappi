import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionDataComponent } from './expansion-data.component';

describe('ExpansionDataComponent', () => {
  let component: ExpansionDataComponent;
  let fixture: ComponentFixture<ExpansionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansionDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
