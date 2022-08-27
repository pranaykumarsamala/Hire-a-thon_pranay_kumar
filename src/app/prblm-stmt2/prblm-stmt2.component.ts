import { Component, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-prblm-stmt2',
  templateUrl: './prblm-stmt2.component.html',
  styleUrls: ['./prblm-stmt2.component.scss']
})
export class PrblmStmt2Component implements OnInit {
  title = 'hire-a-thon';
  excelList: any[] = [];
  teamMembers: any = {};
  teams: any[] = [];
  lowestEffEmps: {} = {};
  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(ev: any) {
    let workBook: any = null;
    let jsonData = null;
    const reader: FileReader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(event.target?.result, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.excelList = jsonData['All Projects'];
      this.getTeamProjects();
    }
    reader.readAsBinaryString(file);
  }

  getTeamProjects() {
    let totalTeamMembers: any = {};
    this.excelList.forEach((row: any, index: any) => {
      if (totalTeamMembers[row.Owner] == undefined) {
        totalTeamMembers[row.Owner] = [];
      }
      totalTeamMembers[row.Owner].push(row);
    });

    Object.keys(totalTeamMembers)?.forEach(team => {
      this.teamMembers[team] = totalTeamMembers[team].reduce((prev: any, curr: any) => {
        prev['Hours'] = curr['Hours'] + (prev['Hours'] ?? 0);
        return prev;
      }, {})
    });

    let empHours: any = {};

    Object.entries(this.teamMembers).forEach((a: any) => {
      empHours[a[0]] = a[1]['Hours']
    });

    console.log(empHours);
    let sortable = [];
    for (var empH in empHours) {
      sortable.push([empH, empHours[empH]]);
    }

    sortable.sort(function (prev, curr) {
      return prev[1] - curr[1];
    });

    sortable.length = 5;
    this.lowestEffEmps = sortable.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    console.log(this.lowestEffEmps);
    // expect Output
    // {
    //   0: 0.5
    //   Gerard Benedict: 16.520000000000003
    //   akarthick: 44.75
    //   rajeshwaran: 23.5
    //   shalini: 40.790000000000006
    // }
  }
}
