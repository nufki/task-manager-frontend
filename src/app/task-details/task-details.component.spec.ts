import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskDetailsComponent} from './task-details.component';
import {provideMockActions} from "@ngrx/effects/testing";
import {provideMockStore} from "@ngrx/store/testing";
import {SortingType, TaskPriority, TaskStatus} from "../+state/task.model";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import {selectSelectedTask} from "../+state/task.selectors";

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;
  let actions: Observable<Action>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetailsComponent],
      providers: [
        provideMockActions(() => actions),
        provideMockStore({
          initialState: {
            loading: false,
            selectedTaskId: null,
            sortingType: SortingType.DUE_DATE,
          },
          selectors: [
            {
              selector: selectSelectedTask,
              value: {
                tasks: [{
                  id: '1',
                  name: 'Example Task',
                  description: 'Example Description',
                  status: TaskStatus.Completed,
                  priority: TaskPriority.High,
                  dueDate: new Date(),
                }],
              },
            },
          ],
        })
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
