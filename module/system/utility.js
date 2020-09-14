export default class TAAUtility {
    static alphabeticalSorter(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase())
          return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase())
          return 1;
        return 0;
      }
}