import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeVsExpenseChartComponent } from './income-vs-expense-chart.component';

describe('IncomeVsExpenseChartComponent', () => {
  let component: IncomeVsExpenseChartComponent;
  let fixture: ComponentFixture<IncomeVsExpenseChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomeVsExpenseChartComponent]
    });
    fixture = TestBed.createComponent(IncomeVsExpenseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
