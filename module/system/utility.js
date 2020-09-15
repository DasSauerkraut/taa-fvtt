export default class TAAUtility {
  static skillSorter(a, b){
    const order = ["ws", "str", "con", "agi", "dex", "int", "will", "cha"]
    return order.indexOf( a.data.stat.value ) - order.indexOf( b.data.stat.value );
  }

  static alphabeticalSorter(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase())
          return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase())
          return 1;
        return 0;
      }
}