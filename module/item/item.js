/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class TAAItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    // Get the Item's data
    const itemData = this.data;
    const actorData = this.actor ? this.actor.data : {};
    const data = itemData.data;
    
    if (this.data.type == "skill")
      this.prepareSkill()
  }

  prepareSkill()
  {
    if (this.data.type != "skill")
      return

    const data = this.data;

    if(!hasProperty(data, "data.modifier.value"))
      setProperty(data, "data.modifier.value", 0)

    if (this.isOwned)
    {
      if (!data.data.total)
        data.data.total = {};
      data.data.total.value = data.data.modifier.value 
        + data.data.improvements.value 
        + this.actor.data.data.stats[data.data.stat.value].value
    }
  }

}
