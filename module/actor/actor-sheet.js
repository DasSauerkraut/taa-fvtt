import { DiceTAA } from "../scripts/dice.js";
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class TAAActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["taa", "sheet", "actor"],
      template: "systems/taa/templates/actor/actor-sheet.html",
      width: 576,
      height: 611,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".tab-body", initial: "main" }]
    });
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = super.getData();
    mergeObject(data.actor, this.actor.prepare())
    data.dtypes = ["String", "Number", "Boolean"];
    for (let attr of Object.values(data.data.stats)) {
      attr.isCheckbox = attr.dtype === "Boolean";
    }
    data.isGM = game.user.isGM;
    console.log()
    return data;
  }


  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // Add Inventory Item
    html.find('.item-create').click(this._onItemCreate.bind(this));

    // Update Inventory Item
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.getOwnedItem(li.data("itemId"));
      item.sheet.render(true);
    });

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      const li = ev.currentTarget.parentNode.parentNode;
      this.actor.deleteOwnedItem(li.dataset.itemId);
      // li.slideUp(200, () => this.render(false));
    });

    // Rollable abilities.
    html.find('.rollable').mousedown(async ev => {
      if(ev.button == 0){
        console.log('roll')
        this._onRoll(ev)
      } else {
        const li = ev.currentTarget.parentNode;
        const item = this.actor.getOwnedItem(li.dataset.itemId);
        if(item)
          item.sheet.render(true);
      }
    });

    //select whole input field on click
    $("input[type=text]").focusin(function() {
      $(this).select();
    });

    html.find('.skill-input').focusout(async event => {
      event.preventDefault()
      if (!this.skillsToEdit)
        this.skillsToEdit = []

      console.log(event.target)
      let itemId = event.target.attributes["data-item-id"].value;
      let itemToEdit = duplicate(this.actor.getEmbeddedEntity("OwnedItem", itemId))
      console.log(itemToEdit)
      itemToEdit.data.improvements.value = Number(event.target.value);
      this.skillsToEdit.push(itemToEdit);

      // Wait for the listener above to set this true before updating - allows for tabbing through skills
      // if (!this.skillUpdateFlag)
      //   return;

      await this.actor.updateEmbeddedEntity("OwnedItem", this.skillsToEdit);

      console.log(this.actor)
      this.skillsToEdit = [];
    });

    // Increment/Decrement Fate
    html.find('#fate').mousedown(async ev => {
      let newValue;
      if(ev.button == 0){
        newValue = this.actor.data.data.status.fate.value + 1 < 3 ? this.actor.data.data.status.fate.value + 1 : 3
      } else {
        newValue = this.actor.data.data.status.fate.value - 1 > -1 ? this.actor.data.data.status.fate.value - 1 : 0
      }
      this.actor.update({ [`data.status.fate.value`]: newValue })
    });

    html.find('#resolve').mousedown(async ev => {
      let newValue;
      if(ev.button == 0){
        newValue = this.actor.data.data.status.resolve.value + 1 < 3 ? this.actor.data.data.status.resolve.value + 1 : 3
      } else {
        newValue = this.actor.data.data.status.resolve.value - 1 > -1 ? this.actor.data.data.status.resolve.value - 1 : 0
      }
      this.actor.update({ [`data.status.resolve.value`]: newValue })
    });

  }

  /* -------------------------------------------- */

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    let data = duplicate(header.dataset);
    // Get the type of item to create.
    const type = header.dataset.type;
    if(type == "skill"){
      data = mergeObject(data,
        {
          "data.advanced.value": event.currentTarget.attributes["data-skill-type"].value
        });
    }
    // Initialize a default name.
    data["name"] = `New ${type.capitalize()}`;

    // Finally, create the item!
    return this.actor.createOwnedItem(data);
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    console.log('rolling')
    event.preventDefault();
    const target = event.currentTarget.dataset.roll;

    DiceTAA.rollTest(target)
  }

}
