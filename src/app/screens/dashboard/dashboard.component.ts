import { Component, Input, OnInit } from '@angular/core';
import { IKeyValue } from 'src/app/interfaces/IKeyValue';
import { TransactionsService } from 'src/app/services/transactions/transactions.service';
import {
  ICategoryDash,
  ITransaction,
  ITransactionsDashboardResponse,
  ITransactionsDashboardRequest,
  getITransactionsDashboardResponseEmpty,
} from 'src/app/interfaces/ITransactionDashboard';
import { DateUtils } from 'src/app/utils/dateUtils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  @Input()
  selectedDates!: Date[];
  @Input()
  selectedAccount!: IKeyValue;

  chartsDrop: IKeyValue[] = [];
  transactionsChart: 'bar' | 'pie' | 'bar' | 'line' = 'line';
  dataTransactions: any;
  optionsTransactions: any;
  dataCategory: any;
  optionsCategory: any;
  datesSubHeader = '';
  dashboardsData: ITransactionsDashboardResponse = getITransactionsDashboardResponseEmpty();

  constructor(
    private transactionsService: TransactionsService,
  ) { }

  ngOnInit() {
    this.datesSubHeader = DateUtils
      .convertToRangeDisplay(this.selectedDates[0], this.selectedDates[1]);
    this.createDropDownCharts();
    const request = {
      accountId: this.selectedAccount.key.toString(),
      startDate: this.selectedDates[0],
      endDate: this.selectedDates[1]
    } as ITransactionsDashboardRequest;

    this.transactionsService.listByDateAndAccount$(request)
      .subscribe((data: ITransactionsDashboardResponse) => {
        this.dashboardsData = data;
        console.log(data);
        this.buildTransactionChart();
        this.buildCategoryChart();
      });

    this.buildTransactionChart();
    this.buildCategoryChart();
  }

  getLabelsCategories(): string[] {
    return this.dashboardsData
      .categories.map((value: ICategoryDash) => {
        return value.name;
      });
  }

  getDataCategories(): number[] {
    return this.dashboardsData
      .categories.map((value: ICategoryDash) => {
        return value.amount;
      });
  }

  getLabelsTransactions(): string[] {
    const labels: string[] = [];
    if (this.dashboardsData.transactions.income.length > 0) {
      this.dashboardsData.transactions.income.forEach((item: ITransaction) => {
        labels.push(DateUtils.convertToMMMd(item.date));
      });
    }
    if (this.dashboardsData.transactions.outcome.length > 0) {
      this.dashboardsData.transactions.outcome.forEach((item: ITransaction) => {
        labels.push(DateUtils.convertToMMMd(item.date));
      });
    }

    return labels;
  }

  getDataTransactionsIncome(): number[] {
    if (this.dashboardsData.transactions.income.length > 0) {
      return this.dashboardsData.transactions
        .income.map((value: ITransaction) => {
          return value.amount;
        });
    }
    return [];
  }

  getDataTransactionsOutcome(): number[] {
    if (this.dashboardsData.transactions.outcome.length > 0) {
      return this.dashboardsData.transactions
        .outcome.map((value: ITransaction) => {
          return value.amount;
        });
    }
    return [];
  }

  buildTransactionChart(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.dataTransactions = {
      labels: this.getLabelsTransactions(),
      datasets: [
        {
          label: 'Incomes',
          data: this.getDataTransactionsIncome(),
          fill: false,
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--blue-500')
        },
        {
          label: 'Outcomes',
          data: this.getDataTransactionsOutcome(),
          fill: true,
          borderColor: documentStyle.getPropertyValue('--orange-500'),
          tension: 0.4,
          backgroundColor: 'rgba(255,167,38,0.2)'
        }
      ]
    };

    this.optionsTransactions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }

  buildCategoryChart(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.dataCategory = {
      labels: this.getLabelsCategories(),
      datasets: [
        {
          data: this.getDataCategories(),
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400')
          ]
        }
      ]
    };
    this.optionsCategory = {
      cutout: '70%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
  }

  createDropDownCharts(): void {
    this.chartsDrop = [
      { key: 'line', value: 'line' },
      { key: 'bar', value: 'bar' },
      { key: 'pie', value: 'pie' },
      { key: 'doughnut', value: 'doughnut' }
    ];
  }
}
