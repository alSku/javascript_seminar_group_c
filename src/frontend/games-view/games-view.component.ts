import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games-view',
  templateUrl: './games-view.component.html',
  styleUrls: ['./games-view.component.less']
})
export class GamesViewComponent implements OnInit {

  title = "Task List";
  tasks = ["task1", "task2", "task3"]; // to be initialized in the constructor below - service needed 
  constructor() { }

  /*constructor(service : ){
    this.tasks = service.getTasks();
  }*/

  ngOnInit(): void {
  }

}
