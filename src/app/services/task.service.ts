import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {Task, TaskPriority, TaskStatus} from "../+state/task/task.model";
import {environment} from "../../environments/environment";


export interface TaskApiResponse {
  items: any[];
  nextToken: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {
  }

  public fetchAllTasks(limit?: number, paginationToken?: string): Observable<{ tasks: Task[]; nextToken: string | null }> {
    let url = `${environment.taskAPIUrl}?limit=${limit || 10}`;
    if (paginationToken) {
      url += `&paginationToken=${encodeURIComponent(paginationToken)}`;
    }

    return this.http.get<TaskApiResponse>(url).pipe(
      map((response) => ({
        tasks: this.mapToModelArray(response.items),
        nextToken: response.nextToken,
      }))
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
      dueDate: new Date(item.dueDate),
      assignedUser: item.assignedUser,
    };
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
    console.log('updateTask: ', task)
    return this.http.put<any>(`${environment.taskAPIUrl}/${task.id}`, task).pipe(
      tap(response => console.log('Server response for updateTask:', response)),
      map(response => this.mapToModelSingle(response))
    );
  }
}



