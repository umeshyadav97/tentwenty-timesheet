export type TaskEntry = {
  dayLabel: string;
  hours: number;
  id: string;
  projectName: string;
  taskName: string;
  typeOfWork: string;
};

export type TaskFormValues = {
  hours: number;
  projectName: string;
  taskName: string;
  typeOfWork: string;
};

export type WeekDay = {
  dateLabel: string;
  dayLabel: string;
  tasks: TaskEntry[];
};
