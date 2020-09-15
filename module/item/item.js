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
    console.log('item prep')
    console.log(data)
    if(!hasProperty(data, "data.modifier.value"))
      setProperty(data, "data.modifier.value", 0)

    if (this.isOwned)
    {
      if(this.actor.data.data.stats[data.data.stat.value].value == null)
      {
        this.actor.data.data.stats[data.data.stat.value].value = this.actor.data.data.stats[data.data.stat.value].initial + this.actor.data.data.stats[data.data.stat.value].modifier + this.actor.data.data.stats[data.data.stat.value].improvements
      }

      if (!data.data.total)
        data.data.total = {};
      data.data.total.value = data.data.modifier.value 
        + data.data.improvements.value 
        + this.actor.data.data.stats[data.data.stat.value].value
    }
  }

}
