/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class TAAActor extends Actor {

  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    const actorData = this.data;
    const data = actorData.data;
    const flags = actorData.flags;

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    
    data.status.absorption.total = data.status.absorption.base + data.status.absorption.armor
    // loop through stats, calculate total and bonus.
    for (let s of Object.values(data.stats)) {
      s.value = s.initial + s.improvements + (s.modifiers || 0)
      s.bonus = Math.floor(s.value / 10)
      //CALCULATE COST TO ADVANCE HERE
    }

    if (actorData.type === 'character') this._prepareCharacterData(actorData);

    let [hp, thp, bloodied, absorption, enc] = this._calculateDerivedStats(actorData);
    if (data.status.hp.max != hp) {// If change detected, reassign max and current wounds
      data.status.hp.max = hp;
    }
    if (data.status.thp.max != thp){
      data.status.thp.max = thp;
    }
    if (data.status.bloodied.value != bloodied){
      data.status.bloodied.value = bloodied;
    }
    if (data.status.absorption.base != absorption){
      data.status.absorption.base = absorption;
      data.status.absorption.total = data.status.absorption.base + data.status.absorption.armor
    }
    if (data.status.encumbrance.max != enc){
      data.status.encumbrance.max = enc;
    }
    console.log(this.data)
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    const data = actorData.data;
    data.details.experience.current = data.details.experience.total - data.details.experience.spent
    if(data.stats.agi.value > 60)
      data.details.move.value = 7;
  }

  _calculateDerivedStats(actorData) {
    const data = actorData.data;
    let strb = data.stats.str.bonus;
    let conb = data.stats.con.bonus;
    let willb = data.stats.will.bonus;

    let hp, thp, bloodied, absorption

    //HP
    if (data.details.species.value.toLowerCase().includes('nechen'))
      hp = conb*3 + strb + willb*3;
    else
      hp = conb*5 + strb*2 + willb;
    
      //THP
    thp = Math.floor(hp / 2);
    //Bloodied
    if (data.details.species.value.toLowerCase().includes('gore'))
      bloodied = thp;
    else
      bloodied = conb*2;
    //Absorption
    if (data.details.species.value.toLowerCase().includes('sahten'))
      absorption = (2 + Math.floor(conb*2)) > 5 ? 5 : 2 + Math.floor(conb*2);
    else
      absorption = Math.floor(conb*2) > 3 ? 3 : Math.floor(conb*2);
    //Encumberance
    let enc =  strb * 2;

    return [hp, thp, bloodied, absorption, enc]
  }

}