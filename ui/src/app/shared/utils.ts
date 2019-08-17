export class Utils {

    static uniqueArray(array) {
        return array.filter((item, index, self) => self.indexOf(item) == index);
    }

}