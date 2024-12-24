import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SortingType, Task} from '../../+state/task/task.model';
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddTaskComponent} from "../add-task/add-task.component";
import {RouterLink} from "@angular/router";
import {DeviceService} from "../../services/device.service";
import {Subscription} from "rxjs";
import {DeviceType} from "../../services/device-type.enum";

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  imports: [
    AsyncPipe,
    FormsModule,
    NgIf,
    NgForOf,
    AddTaskComponent,
    RouterLink,
    DatePipe,
    NgClass
  ],
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  @Input() tasks: Task[] | undefined;
  @Input() loading: boolean = false;
  @Input() allTasksLoaded: boolean = false;
  @Input() sortingType: SortingType = SortingType.DUE_DATE;
  @Output() addTask = new EventEmitter<Task>();
  @Output() sortTasks = new EventEmitter<SortingType>();
  @Output() loadMoreTasks = new EventEmitter<void>();
  deviceType: DeviceType = DeviceType.DESKTOP;
  deviceSubscription: Subscription | undefined;
  today = new Date();
  protected readonly DeviceType = DeviceType;
  protected readonly SortingType = SortingType;

  constructor(private deviceService: DeviceService) {}

  ngOnInit() {
    this.deviceSubscription = this.deviceService.getDeviceType().subscribe(type => {
      this.deviceType = type;
      console.log('device type changed....', type)
    });
    this.deviceService.updateDeviceType(); // Ensure we get the device type on load
  }

  ngOnDestroy() {
    if (this.deviceSubscription) {
      this.deviceSubscription.unsubscribe();
    }
  }

  private isScrollBottom(): boolean {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    return scrollTop + clientHeight >= scrollHeight - 100;
  }

  trackByTaskId(index: number, task: Task): string | undefined {
    return task.id;
  }
}
