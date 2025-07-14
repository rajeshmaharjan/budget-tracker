import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTransactionsComponent } from './top-transactions.component';

describe('TopTransactionsComponent', () => {
  let component: TopTransactionsComponent;
  let fixture: ComponentFixture<TopTransactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopTransactionsComponent]
    });
    fixture = TestBed.createComponent(TopTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
