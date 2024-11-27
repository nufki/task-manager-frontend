import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskManagerComponent} from './task-manager.component';
import {provideMockActions} from "@ngrx/effects/testing";
import {provideMockStore} from "@ngrx/store/testing";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import * as ViewModelSelectors from "../+state/view-model.selectors";
import {SortingType, TaskPriority, TaskStatus} from "../+state/task.model";
import {ActivatedRoute} from "@angular/router";

describe('TaskManagerComponent', () => {
  let component: TaskManagerComponent;
  let fixture: ComponentFixture<TaskManagerComponent>;
  let actions: Observable<Action>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskManagerComponent],
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
              selector: ViewModelSelectors.selectTasks,
              value: {
                loading: false,
                tasks: [{
                    id: '1',
                    name: 'Example Task',
                    description: 'Example Description',
                    status: TaskStatus.Completed,
                    priority: TaskPriority.High,
                    dueDate: new Date(),
                  }
                ],
                sortingType:SortingType.HIGHEST_PRIO
              },
            },
          ],
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            // Mock parameters or query parameters as needed
            snapshot: { paramMap: { get: () => '1' } }
          }
        }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
