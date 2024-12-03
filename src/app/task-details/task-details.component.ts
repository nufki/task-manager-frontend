import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectSelectedTask} from "../+state/task/task.selectors";
import {Observable, Subscription} from "rxjs";
import {Task, TaskPriority, TaskStatus} from "../+state/task/task.model";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TaskActions} from "../+state/task/task.actions";
import {LetDirective} from "@ngrx/component";
import {ToastrService} from "ngx-toastr";
import {Actions, ofType} from "@ngrx/effects";
import {filter} from "rxjs/operators";
import {selectUsers} from "../+state/user/user.selectors";

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
    LetDirective,
    NgForOf,
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  protected task$: Observable<Task | undefined | null>;
  protected userList$: Observable<string[]>;
  protected taskForm: FormGroup;
  protected readonly TaskStatus = TaskStatus;
  protected readonly TaskPriority = TaskPriority;
  // public users: string[] = [];  // Property to hold users

  private taskId: string | undefined;
  private taskSubscription: Subscription | null = null;

  constructor(
    private readonly store: Store,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private actions$: Actions
  ) {
    this.task$ = this.store.select(selectSelectedTask);
    this.userList$ = this.store.select(selectUsers);
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      status: [TaskStatus.NotStarted, Validators.required],
      priority: [TaskPriority.Medium, Validators.required],
      dueDate: [null, Validators.required],
      assignedUser: [''],
    });
  }

  ngOnInit() {
    this.taskSubscription = this.task$.subscribe(task => {
      if (task) {
        const dueDate = task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : null;

        this.taskId = task.id;
        this.taskForm.patchValue({
          name: task.name,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: dueDate,
          assignedUser: task.assignedUser || ''
        });
      }
    });

    // Listen to updateTaskSuccess action
    this.actions$.pipe(
      ofType(TaskActions.updateTaskSuccess),
      filter(action => action.task.id === this.taskId) // Optional filter for this task
    ).subscribe(() => {
      this.toastr.success('Task successfully updated!', 'Success');
      this.goBack();
    });

    // Same for the deelte to updateTaskSuccess action
    this.actions$.pipe(
      ofType(TaskActions.deleteTaskSuccess),
    ).subscribe(() => {
      this.toastr.success('Task successfully deleted!', 'Success');
      this.goBack();
    });
  }

  ngOnDestroy() {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }

  public goBack() {
    this.router.navigate(['../']);
  }

  public onDeleteTask() {
    if (confirm('Are you sure you want to delete this task?')) {
      if (this.taskId)
        this.store.dispatch(TaskActions.deleteTask({id: this.taskId}));
    }
  }

  public onUpdateTask() {
    if (this.taskForm.valid && this.taskId) {
      const updatedTask: Task = {
        id: this.taskId,
        ...this.taskForm.value
      };
      this.store.dispatch(TaskActions.updateTask({task: updatedTask}));
    }
  }
}
