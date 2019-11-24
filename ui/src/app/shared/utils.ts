import { MATRIX_NUM } from 'src/app/shared/ui-models/common.models';
import { UIMatrixTask } from './ui-models/task-card.models';

export class Utils {

    static uniqueArray(array) {
        return array.filter((item, index, self) => self.indexOf(item) == index);
    }

    static uniqueArraySet(array) {
        return Array.from(new Set(array));
    }

    static recursiveClone(val) {
        return Array.isArray(val) ? Array.from(val, Utils.recursiveClone(val)) : val;
    }

    static mapColor(item: UIMatrixTask, type: string): string {
        switch (type) {
            case MATRIX_NUM[1]:
                item.color = '#99cc11';
                break;

            case MATRIX_NUM[2]:
                item.color = '#4488ee';
                break;

            case MATRIX_NUM[3]:
                item.color = '#ffaa22';
                break;

            case MATRIX_NUM[4]:
                item.color = '#cc1111';
                break;

            default:
                item.color = '#99cc11';
                break;
        }
        return item.color;
    }

    static mapUrgentImportant(item: UIMatrixTask): UIMatrixTask {

        switch (item.type) {
            case MATRIX_NUM[1]:
                item.Urgent = true;
                item.Important = true;
                break;

            case MATRIX_NUM[2]:
                item.Urgent = true;
                item.Important = false;
                break;

            case MATRIX_NUM[3]:
                item.Urgent = false;
                item.Important = true;
                break;

            case MATRIX_NUM[4]:
                item.Urgent = false;
                item.Important = false;
                break;

            default:
                item.Urgent = true;
                item.Important = true;
                break;
        }
        
        return item;
    }

}