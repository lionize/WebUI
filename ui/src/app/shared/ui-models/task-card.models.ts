import { Lionize as Task } from 'src/app/shared/models/tasks/Lionize';
import { Lionize as Realtime } from 'src/app/shared/models/tasks/realtime/Lionize';

export type BacklogTask = Task.TaskManagement.ApiModels.V1.BacklogTask;
export type MatrixTask = Task.TaskManagement.ApiModels.V1.MatrixTask;
export type ArchiveTask = Task.TaskManagement.ApiModels.V1.ArchiveTask;
export type MoveToMatrixRequest = Realtime.TaskManagement.RealtimeModels.MoveToMatrixRequest;
export type MoveToBacklogRequest = Realtime.TaskManagement.RealtimeModels.MoveToBacklogRequest;

export interface UIBacklogTask extends BacklogTask {
    color: string;
}

export interface UIMatrixTask extends MatrixTask {
    color: string;
    type: string;
}

// TODO ask, impossible to convet to expected type, need to map every field
// export class UIMatrixTask extends MatrixTask {
//     constructor() {

//     }
// }

// TODO remove unnecessary fields
export class MoveToMatrixRequestClass {
    constructor() {
        
    }
}