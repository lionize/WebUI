export class Utils {

    // constructor() {

    // }

    static uniqueArray(array) {
        return array.filter((item, index, self) => self.indexOf(item) == index);
    }

}