// Import Modules
import { TAAActor } from "./actor/actor.js";
import { TAAActorSheet } from "./actor/actor-sheet.js";
import { TAAItem } from "./item/item.js";
import { TAAItemSheet } from "./item/item-sheet.js";

Hooks.once('init', async function() {

  game.taa = {
    TAAActor,
    TAAItem
  };

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };

  // Define custom Entity classes
  CONFIG.Actor.entityClass = TAAActor;
  CONFIG.Item.entityClass = TAAItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("taa", TAAActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("taa", TAAItemSheet, { makeDefault: true });

  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper('concat', function() {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });
});