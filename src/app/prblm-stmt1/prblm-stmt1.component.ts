import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-prblm-stmt1',
  templateUrl: './prblm-stmt1.component.html',
  styleUrls: ['./prblm-stmt1.component.scss']
})
export class PrblmStmt1Component implements OnInit {

  title = 'hire-a-thon';
  excelList: any[] = [];
  teamProjects: any = {};
  teams: any[] = [];
  constructor() {

  }

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
    let totalTeamProjects: any = {};
    this.excelList.forEach((row: any, index: any) => {
      if (totalTeamProjects[row.Team] == undefined) {
        totalTeamProjects[row.Team] = [];
        this.teams.push(row.Team);
      }
      totalTeamProjects[row.Team].push(row);
    });
    // console.log(this.teams);
    Object.keys(totalTeamProjects)?.forEach(team => {
      this.teamProjects[team] = totalTeamProjects[team].reduce((prev: any, curr: any) => {
        const index = prev.findIndex((item: any) => item['Project Name'] === curr['Project Name']);
        // console.log(prev, curr, index);
        if (index > -1) {
          prev[index].Hours += curr.Hours;
          prev[index].noOfTerms = prev[index]['noOfTerms'] + 1,
            prev[index].mean = prev[index].Hours / prev[index].noOfTerms
        } else {
          prev.push({
            'Project Name': curr['Project Name'],
            'Hours': curr['Hours'],
            'Team': curr['Team'],
            'noOfTerms': 1,
            'mean': curr['Hours']
          })
        }
        return prev;
      }, [])
    });

    console.log(this.teamProjects);
  }
}
