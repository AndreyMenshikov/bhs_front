import {Component, OnInit, ViewChild} from '@angular/core';
import { BeehiveService, BeehiveData } from '../../service/beehive.service';
import { MatTableDataSource } from '@angular/material/table';
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 'dateMeasurement', 'dateStation', 'idBaseStation', 'idHive',
    'weight', 'temperatureInside', 'temperatureOutside', 'humidityInside',
    'humidityOutside', 'voltageController', 'voltageBattery'
  ];
  dataSource = new MatTableDataSource<BeehiveData>([]);

  constructor(
  private beehiveService: BeehiveService,
  private router: Router
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.beehiveService.getAllBeehiveData().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.sort.sort({
        id: 'dateMeasurement',
        start: 'desc',
        disableClear: true
      });
    });
  }

  logout() {
    this.router.navigate(['login']);
  }
}
