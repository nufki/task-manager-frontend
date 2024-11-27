import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {Task, TaskPriority, TaskStatus} from "../+state/task.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {
  }

  public fetchAllTasks(): Observable<Task[]> {
    return this.http.get<any[]>(environment.taskAPIUrl).pipe(
      map(data => this.mapToModelArray(data))
    );
  }

  private mapToModelArray(data: any[]): Task[] {
    return data.map(item => this.mapToModelSingle(item));
  }

  private mapToModelSingle(item: any): Task {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      status: item.status as TaskStatus,
      priority: item.priority as TaskPriority,
      dueDate: item.dueDate
    } as Task;
  }

  public addTask(item: Task): Observable<Task> {
    return this.http.post<Task>(environment.taskAPIUrl, item).pipe(
      tap(response => console.log('Server response for addTask:', response)),
      map(response => this.mapToModelSingle(response))
    );
  }

  public deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.taskAPIUrl}/${id}`).pipe(
      tap(() => console.log(`Deleted task with id: ${id}`))
    );
  }

  public updateTask(task: Task): Observable<Task> {
    return this.http.put<any>(`${environment.taskAPIUrl}/${task.id}`, task).pipe(
      tap(response => console.log('Server response for updateTask:', response)),
      map(response => this.mapToModelSingle(response))
    );
  }
}



