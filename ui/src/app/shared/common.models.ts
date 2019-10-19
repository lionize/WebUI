export enum MATRIX_NUM {
    DO_FIRST = 1,
    SCHEDULE,
    DELEGATE,
    DONT_DO
}

export enum MATRIX_TYPE_COLORS {
    DO_FIRST = '#99cc11',
    SCHEDULE = '#4488ee',
    DELEGATE = '#ffaa22',
    DONT_DO = '#cc1111'
}

export enum TASK_TYPES {
    MATRIX = 1,
    BACKLOG,
    ARCHIVE
}

export interface IMatrixDetail {
    type: MATRIX_NUM;
    title: string;
    description: string;
    color: string;
}

export interface ITask {
    type: MATRIX_NUM;
    uuid: string;
    title: string;
    description: string;
    color: string;
}

export type MATRIX_TASK = {
    id: string;
    title: string;
    description: string;
    order: number;
    subtasks?: {
        id: string;
        title: string;
        completed: boolean;
        order: number;
    };
    important: boolean;
    urgent: boolean;
}

export type BACKLOG_TASK = {
    id: string;
    title: string;
    description: string;
    order: number;
    subtasks?: {
        id: string;
        title: string;
        completed: boolean;
        order: number;
    };
}

export interface MoveToMatrixRequest {
    taskId: string;
    order: number;
    important: boolean;
    urgent: boolean;
}

export interface MoveToBacklogRequest {
    taskId: string;
    order: number;
}