export enum TaskPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high'
}

export enum TaskStatus {
  NotStarted = 'not-started',
  InProgress = 'in-progress',
  Completed = 'completed'
}

export enum SortingType {
  HIGHEST_PRIO = 'HIGHEST_PRIO',
  STATUS = 'STATUS',
  DUE_DATE = 'DUE_DATE'
}

export interface Task {
  id?: string;
  name: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
}


