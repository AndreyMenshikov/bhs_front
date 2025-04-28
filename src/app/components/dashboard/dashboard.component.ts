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
      'recDate', 'stationId', 'hiveId', 'stationDate', 'clientDate', 'receivedDate',
    't1', 't2', 'h1', 'h2',
    'w0', 'w1', 'w2', 'w3', 'weight', 'voltage', 'stationVoltage', 'sign'
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
        id: 'recDate',
        start: 'desc',
        disableClear: true
      });
    });
  }

  logout() {
    this.router.navigate(['login']);
  }
}
