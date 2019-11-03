import { Lionize as Task } from 'src/app/shared/models/tasks/Lionize';

export type BacklogTask = Task.TaskManagement.ApiModels.V1.BacklogTask;
export type MatrixTask = Task.TaskManagement.ApiModels.V1.MatrixTask;
export type ArchiveTask = Task.TaskManagement.ApiModels.V1.ArchiveTask;

export interface UIBacklogTask extends BacklogTask {
    color: string;
}

export interface UIMatrixTask extends MatrixTask {
    color: string;
    // TODO remove type: string (use urgent: boolean, important: boolean)
    type: string;
}