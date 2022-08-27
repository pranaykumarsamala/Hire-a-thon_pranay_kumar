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
    // expected output
    // {
    //   "0": [
    //     {
    //       "Project Name": "OOO",
    //       "Hours": 0.5,
    //       "Team": "0",
    //       "noOfTerms": 1,
    //       "mean": 0.5
    //     }
    //   ],
    //     "Design": [
    //       {
    //         "Project Name": "AAA ",
    //         "Hours": 35.75,
    //         "Team": "Design",
    //         "noOfTerms": 9,
    //         "mean": 3.9722222222222223
    //       },
    //       {
    //         "Project Name": "CCC",
    //         "Hours": 44,
    //         "Team": "Design",
    //         "noOfTerms": 11,
    //         "mean": 4
    //       },
    //       {
    //         "Project Name": "DDD",
    //         "Hours": 102.25,
    //         "Team": "Design",
    //         "noOfTerms": 39,
    //         "mean": 2.621794871794872
    //       },
    //       {
    //         "Project Name": "EEE",
    //         "Hours": 55,
    //         "Team": "Design",
    //         "noOfTerms": 12,
    //         "mean": 4.583333333333333
    //       },
    //       {
    //         "Project Name": "FFF",
    //         "Hours": 14.5,
    //         "Team": "Design",
    //         "noOfTerms": 3,
    //         "mean": 4.833333333333333
    //       },
    //       {
    //         "Project Name": "GGG",
    //         "Hours": 77.25,
    //         "Team": "Design",
    //         "noOfTerms": 28,
    //         "mean": 2.7589285714285716
    //       },
    //       {
    //         "Project Name": "HHH",
    //         "Hours": 78.95,
    //         "Team": "Design",
    //         "noOfTerms": 14,
    //         "mean": 5.639285714285714
    //       },
    //       {
    //         "Project Name": "III",
    //         "Hours": 11.5,
    //         "Team": "Design",
    //         "noOfTerms": 3,
    //         "mean": 3.8333333333333335
    //       },
    //       {
    //         "Project Name": "JJJ",
    //         "Hours": 254.5,
    //         "Team": "Design",
    //         "noOfTerms": 47,
    //         "mean": 5.414893617021277
    //       },
    //       {
    //         "Project Name": "KKK",
    //         "Hours": 109.5,
    //         "Team": "Design",
    //         "noOfTerms": 24,
    //         "mean": 4.5625
    //       },
    //       {
    //         "Project Name": "LLL",
    //         "Hours": 2,
    //         "Team": "Design",
    //         "noOfTerms": 2,
    //         "mean": 1
    //       },
    //       {
    //         "Project Name": "NNN",
    //         "Hours": 105.5,
    //         "Team": "Design",
    //         "noOfTerms": 26,
    //         "mean": 4.0576923076923075
    //       },
    //       {
    //         "Project Name": "OOO",
    //         "Hours": 163.10000000000002,
    //         "Team": "Design",
    //         "noOfTerms": 53,
    //         "mean": 3.0773584905660383
    //       },
    //       {
    //         "Project Name": "PPP",
    //         "Hours": 46.5,
    //         "Team": "Design",
    //         "noOfTerms": 9,
    //         "mean": 5.166666666666667
    //       },
    //       {
    //         "Project Name": "QQQ",
    //         "Hours": 61.17,
    //         "Team": "Design",
    //         "noOfTerms": 17,
    //         "mean": 3.598235294117647
    //       },
    //       {
    //         "Project Name": "RRR",
    //         "Hours": 243.76,
    //         "Team": "Design",
    //         "noOfTerms": 63,
    //         "mean": 3.869206349206349
    //       },
    //       {
    //         "Project Name": "SSS",
    //         "Hours": 120.75,
    //         "Team": "Design",
    //         "noOfTerms": 24,
    //         "mean": 5.03125
    //       },
    //       {
    //         "Project Name": "TTT",
    //         "Hours": 56.91,
    //         "Team": "Design",
    //         "noOfTerms": 13,
    //         "mean": 4.377692307692308
    //       },
    //       {
    //         "Project Name": "UUU",
    //         "Hours": 131.92,
    //         "Team": "Design",
    //         "noOfTerms": 70,
    //         "mean": 1.8845714285714283
    //       },
    //       {
    //         "Project Name": "VVV",
    //         "Hours": 159.25,
    //         "Team": "Design",
    //         "noOfTerms": 32,
    //         "mean": 4.9765625
    //       },
    //       {
    //         "Project Name": "WWW",
    //         "Hours": 16,
    //         "Team": "Design",
    //         "noOfTerms": 6,
    //         "mean": 2.6666666666666665
    //       },
    //       {
    //         "Project Name": "XXX",
    //         "Hours": 19.92,
    //         "Team": "Design",
    //         "noOfTerms": 6,
    //         "mean": 3.3200000000000003
    //       },
    //       {
    //         "Project Name": "ZZZ",
    //         "Hours": 14.5,
    //         "Team": "Design",
    //         "noOfTerms": 3,
    //         "mean": 4.833333333333333
    //       },
    //       {
    //         "Project Name": "AA1",
    //         "Hours": 280.21,
    //         "Team": "Design",
    //         "noOfTerms": 54,
    //         "mean": 5.189074074074074
    //       },
    //       {
    //         "Project Name": "BB1",
    //         "Hours": 232.82999999999998,
    //         "Team": "Design",
    //         "noOfTerms": 55,
    //         "mean": 4.233272727272727
    //       },
    //       {
    //         "Project Name": "CC1",
    //         "Hours": 45.25,
    //         "Team": "Design",
    //         "noOfTerms": 12,
    //         "mean": 3.7708333333333335
    //       },
    //       {
    //         "Project Name": "DD1",
    //         "Hours": 8.08,
    //         "Team": "Design",
    //         "noOfTerms": 4,
    //         "mean": 2.02
    //       },
    //       {
    //         "Project Name": "FF1",
    //         "Hours": 91.5,
    //         "Team": "Design",
    //         "noOfTerms": 16,
    //         "mean": 5.71875
    //       },
    //       {
    //         "Project Name": "GG1",
    //         "Hours": 24.259999999999998,
    //         "Team": "Design",
    //         "noOfTerms": 11,
    //         "mean": 2.205454545454545
    //       },
    //       {
    //         "Project Name": "HH1",
    //         "Hours": 108.5,
    //         "Team": "Design",
    //         "noOfTerms": 38,
    //         "mean": 2.8552631578947367
    //       },
    //       {
    //         "Project Name": "II1",
    //         "Hours": 224.5,
    //         "Team": "Design",
    //         "noOfTerms": 76,
    //         "mean": 2.9539473684210527
    //       },
    //       {
    //         "Project Name": "JJ1",
    //         "Hours": 51.5,
    //         "Team": "Design",
    //         "noOfTerms": 11,
    //         "mean": 4.681818181818182
    //       },
    //       {
    //         "Project Name": "KK1",
    //         "Hours": 1.5,
    //         "Team": "Design",
    //         "noOfTerms": 1,
    //         "mean": 1.5
    //       },
    //       {
    //         "Project Name": "LL1",
    //         "Hours": 44.67,
    //         "Team": "Design",
    //         "noOfTerms": 19,
    //         "mean": 2.3510526315789475
    //       },
    //       {
    //         "Project Name": "MM1",
    //         "Hours": 218.75,
    //         "Team": "Design",
    //         "noOfTerms": 41,
    //         "mean": 5.335365853658536
    //       },
    //       {
    //         "Project Name": "PP1",
    //         "Hours": 378.42,
    //         "Team": "Design",
    //         "noOfTerms": 133,
    //         "mean": 2.845263157894737
    //       },
    //       {
    //         "Project Name": "QQ1",
    //         "Hours": 836.0799999999999,
    //         "Team": "Design",
    //         "noOfTerms": 149,
    //         "mean": 5.611275167785235
    //       },
    //       {
    //         "Project Name": "TT1",
    //         "Hours": 80.5,
    //         "Team": "Design",
    //         "noOfTerms": 17,
    //         "mean": 4.735294117647059
    //       },
    //       {
    //         "Project Name": "UU1",
    //         "Hours": 519.92,
    //         "Team": "Design",
    //         "noOfTerms": 107,
    //         "mean": 4.859065420560747
    //       },
    //       {
    //         "Project Name": "VV1",
    //         "Hours": 259.25,
    //         "Team": "Design",
    //         "noOfTerms": 44,
    //         "mean": 5.892045454545454
    //       },
    //       {
    //         "Project Name": "WW1",
    //         "Hours": 199,
    //         "Team": "Design",
    //         "noOfTerms": 23,
    //         "mean": 8.652173913043478
    //       },
    //       {
    //         "Project Name": "YY1",
    //         "Hours": 90.33,
    //         "Team": "Design",
    //         "noOfTerms": 19,
    //         "mean": 4.75421052631579
    //       },
    //       {
    //         "Project Name": "AA2",
    //         "Hours": 132.25,
    //         "Team": "Design",
    //         "noOfTerms": 25,
    //         "mean": 5.29
    //       }
    //     ],
    //       "Dev": [
    //         {
    //           "Project Name": "BBB",
    //           "Hours": 135,
    //           "Team": "Dev",
    //           "noOfTerms": 23,
    //           "mean": 5.869565217391305
    //         },
    //         {
    //           "Project Name": "CCC",
    //           "Hours": 206,
    //           "Team": "Dev",
    //           "noOfTerms": 58,
    //           "mean": 3.5517241379310347
    //         },
    //         {
    //           "Project Name": "DDD",
    //           "Hours": 653.5,
    //           "Team": "Dev",
    //           "noOfTerms": 165,
    //           "mean": 3.9606060606060605
    //         },
    //         {
    //           "Project Name": "EEE",
    //           "Hours": 62.81999999999999,
    //           "Team": "Dev",
    //           "noOfTerms": 15,
    //           "mean": 4.188
    //         },
    //         {
    //           "Project Name": "FFF",
    //           "Hours": 194.05,
    //           "Team": "Dev",
    //           "noOfTerms": 30,
    //           "mean": 6.468333333333334
    //         },
    //         {
    //           "Project Name": "GGG",
    //           "Hours": 850.7299999999997,
    //           "Team": "Dev",
    //           "noOfTerms": 290,
    //           "mean": 2.93355172413793
    //         },
    //         {
    //           "Project Name": "HHH",
    //           "Hours": 117.25,
    //           "Team": "Dev",
    //           "noOfTerms": 35,
    //           "mean": 3.35
    //         },
    //         {
    //           "Project Name": "III",
    //           "Hours": 42.5,
    //           "Team": "Dev",
    //           "noOfTerms": 10,
    //           "mean": 4.25
    //         },
    //         {
    //           "Project Name": "JJJ",
    //           "Hours": 5,
    //           "Team": "Dev",
    //           "noOfTerms": 2,
    //           "mean": 2.5
    //         },
    //         {
    //           "Project Name": "KKK",
    //           "Hours": 20,
    //           "Team": "Dev",
    //           "noOfTerms": 9,
    //           "mean": 2.2222222222222223
    //         },
    //         {
    //           "Project Name": "LLL",
    //           "Hours": 25,
    //           "Team": "Dev",
    //           "noOfTerms": 11,
    //           "mean": 2.272727272727273
    //         },
    //         {
    //           "Project Name": "MMM",
    //           "Hours": 771.0799999999999,
    //           "Team": "Dev",
    //           "noOfTerms": 324,
    //           "mean": 2.3798765432098765
    //         },
    //         {
    //           "Project Name": "NNN",
    //           "Hours": 1043.2299999999998,
    //           "Team": "Dev",
    //           "noOfTerms": 390,
    //           "mean": 2.6749487179487175
    //         },
    //         {
    //           "Project Name": "OOO",
    //           "Hours": 1067.48,
    //           "Team": "Dev",
    //           "noOfTerms": 478,
    //           "mean": 2.233221757322176
    //         },
    //         {
    //           "Project Name": "PPP",
    //           "Hours": 10,
    //           "Team": "Dev",
    //           "noOfTerms": 4,
    //           "mean": 2.5
    //         },
    //         {
    //           "Project Name": "QQQ",
    //           "Hours": 1280.4700000000012,
    //           "Team": "Dev",
    //           "noOfTerms": 371,
    //           "mean": 3.451401617250677
    //         },
    //         {
    //           "Project Name": "RRR",
    //           "Hours": 1326.9299999999998,
    //           "Team": "Dev",
    //           "noOfTerms": 338,
    //           "mean": 3.9258284023668635
    //         },
    //         {
    //           "Project Name": "TTT",
    //           "Hours": 393.8,
    //           "Team": "Dev",
    //           "noOfTerms": 158,
    //           "mean": 2.492405063291139
    //         },
    //         {
    //           "Project Name": "UUU",
    //           "Hours": 455.32000000000005,
    //           "Team": "Dev",
    //           "noOfTerms": 196,
    //           "mean": 2.323061224489796
    //         },
    //         {
    //           "Project Name": "WWW",
    //           "Hours": 424.57999999999987,
    //           "Team": "Dev",
    //           "noOfTerms": 145,
    //           "mean": 2.928137931034482
    //         },
    //         {
    //           "Project Name": "XXX",
    //           "Hours": 22.5,
    //           "Team": "Dev",
    //           "noOfTerms": 6,
    //           "mean": 3.75
    //         },
    //         {
    //           "Project Name": "YYY",
    //           "Hours": 169.2,
    //           "Team": "Dev",
    //           "noOfTerms": 49,
    //           "mean": 3.4530612244897956
    //         },
    //         {
    //           "Project Name": "AA1",
    //           "Hours": 841.08,
    //           "Team": "Dev",
    //           "noOfTerms": 259,
    //           "mean": 3.2474131274131275
    //         },
    //         {
    //           "Project Name": "BB1",
    //           "Hours": 1492.99,
    //           "Team": "Dev",
    //           "noOfTerms": 311,
    //           "mean": 4.800610932475884
    //         },
    //         {
    //           "Project Name": "CC1",
    //           "Hours": 99.15,
    //           "Team": "Dev",
    //           "noOfTerms": 37,
    //           "mean": 2.67972972972973
    //         },
    //         {
    //           "Project Name": "DD1",
    //           "Hours": 120.25,
    //           "Team": "Dev",
    //           "noOfTerms": 35,
    //           "mean": 3.4357142857142855
    //         },
    //         {
    //           "Project Name": "EE1",
    //           "Hours": 2307.2200000000003,
    //           "Team": "Dev",
    //           "noOfTerms": 610,
    //           "mean": 3.7823278688524593
    //         },
    //         {
    //           "Project Name": "FF1",
    //           "Hours": 1025.25,
    //           "Team": "Dev",
    //           "noOfTerms": 228,
    //           "mean": 4.496710526315789
    //         },
    //         {
    //           "Project Name": "GG1",
    //           "Hours": 69,
    //           "Team": "Dev",
    //           "noOfTerms": 20,
    //           "mean": 3.45
    //         },
    //         {
    //           "Project Name": "HH1",
    //           "Hours": 1436.6000000000004,
    //           "Team": "Dev",
    //           "noOfTerms": 408,
    //           "mean": 3.52107843137255
    //         },
    //         {
    //           "Project Name": "II1",
    //           "Hours": 828.31,
    //           "Team": "Dev",
    //           "noOfTerms": 204,
    //           "mean": 4.060343137254901
    //         },
    //         {
    //           "Project Name": "JJ1",
    //           "Hours": 315,
    //           "Team": "Dev",
    //           "noOfTerms": 111,
    //           "mean": 2.8378378378378377
    //         },
    //         {
    //           "Project Name": "KK1",
    //           "Hours": 125.5,
    //           "Team": "Dev",
    //           "noOfTerms": 21,
    //           "mean": 5.976190476190476
    //         },
    //         {
    //           "Project Name": "LL1",
    //           "Hours": 455.56999999999994,
    //           "Team": "Dev",
    //           "noOfTerms": 134,
    //           "mean": 3.3997761194029845
    //         },
    //         {
    //           "Project Name": "NN1",
    //           "Hours": 583,
    //           "Team": "Dev",
    //           "noOfTerms": 113,
    //           "mean": 5.15929203539823
    //         },
    //         {
    //           "Project Name": "PP1",
    //           "Hours": 517.81,
    //           "Team": "Dev",
    //           "noOfTerms": 259,
    //           "mean": 1.999266409266409
    //         },
    //         {
    //           "Project Name": "RR1",
    //           "Hours": 200.46000000000004,
    //           "Team": "Dev",
    //           "noOfTerms": 97,
    //           "mean": 2.0665979381443305
    //         },
    //         {
    //           "Project Name": "SS1",
    //           "Hours": 590.74,
    //           "Team": "Dev",
    //           "noOfTerms": 166,
    //           "mean": 3.5586746987951807
    //         },
    //         {
    //           "Project Name": "TT1",
    //           "Hours": 1200.460000000001,
    //           "Team": "Dev",
    //           "noOfTerms": 316,
    //           "mean": 3.7989240506329143
    //         },
    //         {
    //           "Project Name": "UU1",
    //           "Hours": 478.00999999999993,
    //           "Team": "Dev",
    //           "noOfTerms": 155,
    //           "mean": 3.083935483870967
    //         },
    //         {
    //           "Project Name": "XX1",
    //           "Hours": 608,
    //           "Team": "Dev",
    //           "noOfTerms": 72,
    //           "mean": 8.444444444444445
    //         },
    //         {
    //           "Project Name": "ZZ1",
    //           "Hours": 73.72000000000001,
    //           "Team": "Dev",
    //           "noOfTerms": 47,
    //           "mean": 1.5685106382978726
    //         },
    //         {
    //           "Project Name": "AA2",
    //           "Hours": 108,
    //           "Team": "Dev",
    //           "noOfTerms": 53,
    //           "mean": 2.0377358490566038
    //         },
    //         {
    //           "Project Name": "BB2",
    //           "Hours": 209.3,
    //           "Team": "Dev",
    //           "noOfTerms": 61,
    //           "mean": 3.4311475409836065
    //         },
    //         {
    //           "Project Name": "CC2",
    //           "Hours": 29.38,
    //           "Team": "Dev",
    //           "noOfTerms": 13,
    //           "mean": 2.26
    //         }
    //       ],
    //         "PM": [
    //           {
    //             "Project Name": "CCC",
    //             "Hours": 12.030000000000001,
    //             "Team": "PM",
    //             "noOfTerms": 15,
    //             "mean": 0.802
    //           },
    //           {
    //             "Project Name": "DDD",
    //             "Hours": 142.49,
    //             "Team": "PM",
    //             "noOfTerms": 99,
    //             "mean": 1.4392929292929293
    //           },
    //           {
    //             "Project Name": "GGG",
    //             "Hours": 240.72,
    //             "Team": "PM",
    //             "noOfTerms": 118,
    //             "mean": 2.04
    //           },
    //           {
    //             "Project Name": "III",
    //             "Hours": 3,
    //             "Team": "PM",
    //             "noOfTerms": 1,
    //             "mean": 3
    //           },
    //           {
    //             "Project Name": "JJJ",
    //             "Hours": 867.3199999999998,
    //             "Team": "PM",
    //             "noOfTerms": 439,
    //             "mean": 1.975671981776765
    //           },
    //           {
    //             "Project Name": "NNN",
    //             "Hours": 34,
    //             "Team": "PM",
    //             "noOfTerms": 12,
    //             "mean": 2.8333333333333335
    //           },
    //           {
    //             "Project Name": "OOO",
    //             "Hours": 35.41,
    //             "Team": "PM",
    //             "noOfTerms": 32,
    //             "mean": 1.1065625
    //           },
    //           {
    //             "Project Name": "QQQ",
    //             "Hours": 314.9799999999999,
    //             "Team": "PM",
    //             "noOfTerms": 198,
    //             "mean": 1.5908080808080802
    //           },
    //           {
    //             "Project Name": "RRR",
    //             "Hours": 104.21000000000001,
    //             "Team": "PM",
    //             "noOfTerms": 52,
    //             "mean": 2.0040384615384617
    //           },
    //           {
    //             "Project Name": "SSS",
    //             "Hours": 181,
    //             "Team": "PM",
    //             "noOfTerms": 73,
    //             "mean": 2.4794520547945207
    //           },
    //           {
    //             "Project Name": "TTT",
    //             "Hours": 42.780000000000015,
    //             "Team": "PM",
    //             "noOfTerms": 48,
    //             "mean": 0.8912500000000003
    //           },
    //           {
    //             "Project Name": "VVV",
    //             "Hours": 7,
    //             "Team": "PM",
    //             "noOfTerms": 6,
    //             "mean": 1.1666666666666667
    //           },
    //           {
    //             "Project Name": "WWW",
    //             "Hours": 17.33,
    //             "Team": "PM",
    //             "noOfTerms": 22,
    //             "mean": 0.7877272727272726
    //           },
    //           {
    //             "Project Name": "YYY",
    //             "Hours": 26.909999999999997,
    //             "Team": "PM",
    //             "noOfTerms": 22,
    //             "mean": 1.223181818181818
    //           },
    //           {
    //             "Project Name": "ZZZ",
    //             "Hours": 81.25,
    //             "Team": "PM",
    //             "noOfTerms": 23,
    //             "mean": 3.532608695652174
    //           },
    //           {
    //             "Project Name": "AA1",
    //             "Hours": 324.84000000000003,
    //             "Team": "PM",
    //             "noOfTerms": 141,
    //             "mean": 2.3038297872340427
    //           },
    //           {
    //             "Project Name": "CC1",
    //             "Hours": 25.33,
    //             "Team": "PM",
    //             "noOfTerms": 26,
    //             "mean": 0.9742307692307691
    //           },
    //           {
    //             "Project Name": "DD1",
    //             "Hours": 26.75,
    //             "Team": "PM",
    //             "noOfTerms": 16,
    //             "mean": 1.671875
    //           },
    //           {
    //             "Project Name": "EE1",
    //             "Hours": 315.73,
    //             "Team": "PM",
    //             "noOfTerms": 290,
    //             "mean": 1.0887241379310346
    //           },
    //           {
    //             "Project Name": "HH1",
    //             "Hours": 148.02000000000004,
    //             "Team": "PM",
    //             "noOfTerms": 148,
    //             "mean": 1.0001351351351353
    //           },
    //           {
    //             "Project Name": "II1",
    //             "Hours": 205.95000000000002,
    //             "Team": "PM",
    //             "noOfTerms": 93,
    //             "mean": 2.2145161290322584
    //           },
    //           {
    //             "Project Name": "JJ1",
    //             "Hours": 89.41,
    //             "Team": "PM",
    //             "noOfTerms": 65,
    //             "mean": 1.3755384615384614
    //           },
    //           {
    //             "Project Name": "LL1",
    //             "Hours": 11.16,
    //             "Team": "PM",
    //             "noOfTerms": 21,
    //             "mean": 0.5314285714285715
    //           },
    //           {
    //             "Project Name": "MM1",
    //             "Hours": 40.59,
    //             "Team": "PM",
    //             "noOfTerms": 22,
    //             "mean": 1.8450000000000002
    //           },
    //           {
    //             "Project Name": "OO1",
    //             "Hours": 36.67,
    //             "Team": "PM",
    //             "noOfTerms": 12,
    //             "mean": 3.0558333333333336
    //           },
    //           {
    //             "Project Name": "PP1",
    //             "Hours": 116.89,
    //             "Team": "PM",
    //             "noOfTerms": 40,
    //             "mean": 2.92225
    //           },
    //           {
    //             "Project Name": "TT1",
    //             "Hours": 70.67,
    //             "Team": "PM",
    //             "noOfTerms": 55,
    //             "mean": 1.284909090909091
    //           },
    //           {
    //             "Project Name": "UU1",
    //             "Hours": 22.5,
    //             "Team": "PM",
    //             "noOfTerms": 18,
    //             "mean": 1.25
    //           },
    //           {
    //             "Project Name": "VV1",
    //             "Hours": 4.5,
    //             "Team": "PM",
    //             "noOfTerms": 1,
    //             "mean": 4.5
    //           },
    //           {
    //             "Project Name": "WW1",
    //             "Hours": 96.7,
    //             "Team": "PM",
    //             "noOfTerms": 22,
    //             "mean": 4.3954545454545455
    //           },
    //           {
    //             "Project Name": "XX1",
    //             "Hours": 3,
    //             "Team": "PM",
    //             "noOfTerms": 3,
    //             "mean": 1
    //           }
    //         ],
    //           "QA": [
    //             {
    //               "Project Name": "CCC",
    //               "Hours": 1,
    //               "Team": "QA",
    //               "noOfTerms": 1,
    //               "mean": 1
    //             },
    //             {
    //               "Project Name": "DDD",
    //               "Hours": 1,
    //               "Team": "QA",
    //               "noOfTerms": 1,
    //               "mean": 1
    //             },
    //             {
    //               "Project Name": "EEE",
    //               "Hours": 33.17,
    //               "Team": "QA",
    //               "noOfTerms": 12,
    //               "mean": 2.7641666666666667
    //             },
    //             {
    //               "Project Name": "FFF",
    //               "Hours": 58,
    //               "Team": "QA",
    //               "noOfTerms": 17,
    //               "mean": 3.411764705882353
    //             },
    //             {
    //               "Project Name": "GGG",
    //               "Hours": 48.33,
    //               "Team": "QA",
    //               "noOfTerms": 21,
    //               "mean": 2.301428571428571
    //             },
    //             {
    //               "Project Name": "HHH",
    //               "Hours": 13.5,
    //               "Team": "QA",
    //               "noOfTerms": 7,
    //               "mean": 1.9285714285714286
    //             },
    //             {
    //               "Project Name": "PPP",
    //               "Hours": 7,
    //               "Team": "QA",
    //               "noOfTerms": 3,
    //               "mean": 2.3333333333333335
    //             },
    //             {
    //               "Project Name": "QQQ",
    //               "Hours": 252.07000000000005,
    //               "Team": "QA",
    //               "noOfTerms": 35,
    //               "mean": 7.202000000000002
    //             },
    //             {
    //               "Project Name": "RRR",
    //               "Hours": 252.42000000000002,
    //               "Team": "QA",
    //               "noOfTerms": 50,
    //               "mean": 5.0484
    //             },
    //             {
    //               "Project Name": "TTT",
    //               "Hours": 19.92,
    //               "Team": "QA",
    //               "noOfTerms": 9,
    //               "mean": 2.2133333333333334
    //             },
    //             {
    //               "Project Name": "UUU",
    //               "Hours": 290.19,
    //               "Team": "QA",
    //               "noOfTerms": 99,
    //               "mean": 2.931212121212121
    //             },
    //             {
    //               "Project Name": "BB1",
    //               "Hours": 29,
    //               "Team": "QA",
    //               "noOfTerms": 8,
    //               "mean": 3.625
    //             },
    //             {
    //               "Project Name": "CC1",
    //               "Hours": 51.99,
    //               "Team": "QA",
    //               "noOfTerms": 21,
    //               "mean": 2.475714285714286
    //             },
    //             {
    //               "Project Name": "DD1",
    //               "Hours": 63.5,
    //               "Team": "QA",
    //               "noOfTerms": 16,
    //               "mean": 3.96875
    //             },
    //             {
    //               "Project Name": "EE1",
    //               "Hours": 521.6300000000001,
    //               "Team": "QA",
    //               "noOfTerms": 113,
    //               "mean": 4.616194690265488
    //             },
    //             {
    //               "Project Name": "FF1",
    //               "Hours": 1194.3300000000002,
    //               "Team": "QA",
    //               "noOfTerms": 266,
    //               "mean": 4.489962406015038
    //             },
    //             {
    //               "Project Name": "HH1",
    //               "Hours": 2,
    //               "Team": "QA",
    //               "noOfTerms": 1,
    //               "mean": 2
    //             },
    //             {
    //               "Project Name": "II1",
    //               "Hours": 1098.05,
    //               "Team": "QA",
    //               "noOfTerms": 162,
    //               "mean": 6.778086419753087
    //             },
    //             {
    //               "Project Name": "PP1",
    //               "Hours": 57.25,
    //               "Team": "QA",
    //               "noOfTerms": 19,
    //               "mean": 3.013157894736842
    //             },
    //             {
    //               "Project Name": "TT1",
    //               "Hours": 3.25,
    //               "Team": "QA",
    //               "noOfTerms": 2,
    //               "mean": 1.625
    //             },
    //             {
    //               "Project Name": "UU1",
    //               "Hours": 59,
    //               "Team": "QA",
    //               "noOfTerms": 7,
    //               "mean": 8.428571428571429
    //             },
    //             {
    //               "Project Name": "XX1",
    //               "Hours": 841,
    //               "Team": "QA",
    //               "noOfTerms": 105,
    //               "mean": 8.00952380952381
    //             },
    //             {
    //               "Project Name": "ZZ1",
    //               "Hours": 134.87,
    //               "Team": "QA",
    //               "noOfTerms": 62,
    //               "mean": 2.1753225806451613
    //             },
    //             {
    //               "Project Name": "AA2",
    //               "Hours": 13,
    //               "Team": "QA",
    //               "noOfTerms": 2,
    //               "mean": 6.5
    //             },
    //             {
    //               "Project Name": "BB2",
    //               "Hours": 1.25,
    //               "Team": "QA",
    //               "noOfTerms": 1,
    //               "mean": 1.25
    //             }
    //           ]
    // }
  }
}
