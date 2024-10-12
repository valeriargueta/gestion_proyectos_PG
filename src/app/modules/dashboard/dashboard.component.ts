import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule, 
    FormsModule,
    MatIconModule,
    MatButtonModule
  ],
})
export class DashboardComponent {

  chartProjectStatus: ApexOptions;
  chartClientSolutions: ApexOptions;

  // Propiedades para los filtros
  selectedSolution: string = '';
  selectedStatus: string = '';

  // Datos originales sin filtros
  allProjectStatusData = [10, 2, 3, 5, 50]; // Cantidades de cada estado
  allProjectStatusLabels = ['Por iniciar', 'En progreso', 'En QA', 'Completado', 'Detenido']; // Estados
  allSolutionsData = {
    SmartID: [7, 2, 1],
    Dstoken: [8, 1, 4],
    SmartBanking: [6, 4, 5],
  };
  allClients = ['Banrural', 'BI', 'Inmobiliario'];

  constructor() {}

  ngOnInit(): void {
    this.loadCharts();  // Cargar gráficas inicialmente
  }

  // Función para cargar las gráficas por primera vez
  loadCharts(): void {
    // Gráfico circular de estados de proyectos (sin filtros inicialmente)
    this.chartProjectStatus = {
      chart: {
        type: 'pie',
        height: '100%',
      },
      labels: this.allProjectStatusLabels,
      series: this.allProjectStatusData,
      colors: ['#1E90FF', '#FFA500', '#FF6347', '#90EE90', '#FF4500'],
      tooltip: {
        enabled: true,
        theme: 'dark',
      },
      plotOptions: {
        pie: {
          expandOnClick: true,
        },
      },
    };

    // Gráfico de columnas apiladas para soluciones por cliente
    this.chartClientSolutions = {
      chart: {
        type: 'bar',
        height: '100%',
        stacked: true,
      },
      series: [
        { name: 'SmartID', data: this.allSolutionsData.SmartID },
        { name: 'Dstoken', data: this.allSolutionsData.Dstoken },
        { name: 'SmartBanking', data: this.allSolutionsData.SmartBanking },
      ],
      xaxis: {
        categories: this.allClients,
      },
      colors: ['#1E90FF', '#FFA500', '#32CD32'],
      tooltip: {
        enabled: true,
        theme: 'dark',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: 'top',
          },
        },
      },
    };
  }

  // Función para aplicar filtros
  applyFilters(): void {
    // Filtro por estado para la gráfica de "Estado de los Proyectos"
    let filteredStatusData = [...this.allProjectStatusData];
    let filteredStatusLabels = [...this.allProjectStatusLabels];

    if (this.selectedStatus) {
      // Si hay un estado seleccionado, filtrar los datos por ese estado
      const index = this.allProjectStatusLabels.indexOf(this.selectedStatus);
      filteredStatusData = [this.allProjectStatusData[index]];
      filteredStatusLabels = [this.selectedStatus];
    }

    this.chartProjectStatus.series = filteredStatusData;
    this.chartProjectStatus.labels = filteredStatusLabels;

    // Filtro por solución para la gráfica de "Soluciones por Cliente"
    let filteredSolutionData = [
      { name: 'SmartID', data: this.allSolutionsData.SmartID },
      { name: 'Dstoken', data: this.allSolutionsData.Dstoken },
      { name: 'SmartBanking', data: this.allSolutionsData.SmartBanking },
    ];

    if (this.selectedSolution) {
      // Si hay una solución seleccionada, mostrar solo esa barra
      filteredSolutionData = filteredSolutionData.filter(
        (series) => series.name === this.selectedSolution
      );
    }

    this.chartClientSolutions.series = filteredSolutionData;
    this.chartClientSolutions.xaxis.categories = this.allClients;

    // Actualizar las gráficas
    this.loadFilteredCharts(filteredStatusData, filteredStatusLabels, filteredSolutionData);
  }

  // Función para cargar las gráficas filtradas
  loadFilteredCharts(statusData: number[], statusLabels: string[], solutionData: any[]): void {
    // Actualizar gráfico de estado de proyectos
    this.chartProjectStatus = {
      ...this.chartProjectStatus,
      series: statusData,
      labels: statusLabels,
    };

    // Actualizar gráfico de soluciones por cliente
    this.chartClientSolutions = {
      ...this.chartClientSolutions,
      series: solutionData,
    };
  }
}
