/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function() {

  // Define template paths to load
  const templatePaths = [

    // Actor Sheet Partials
    "systems/taa/templates/actor/actor-main.html",
    "systems/taa/templates/actor/actor-armament.html",
    "systems/taa/templates/actor/actor-description.html",
    "systems/taa/templates/actor/actor-items.html",
    "systems/taa/templates/actor/actor-combat.html",

    // Item Sheet Partials
    // "systems/dnd5e/templates/items/parts/item-action.html",
    // "systems/dnd5e/templates/items/parts/item-activation.html",
    // "systems/dnd5e/templates/items/parts/item-description.html",
    // "systems/dnd5e/templates/items/parts/item-mountable.html"
  ];

  // Load the template parts
  return loadTemplates(templatePaths);
};
