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

}