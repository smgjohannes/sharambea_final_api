const { create } = require("./property.create");
const { get } = require("./property.get");
const { getById } = require("./property.getById");
const { update } = require("./property.update");
const { destroy } = require("./property.destroy");
const { stats } = require("./property.stats");
const { getAll } = require("./property.getAll");
const { getRegions } = require("./property.getRegions");
class Property {
  constructor(image) {
    this.image = image;
  }
}
Property.prototype.getAll = getAll;
Property.prototype.get = get;
Property.prototype.getById = getById;
Property.prototype.create = create;
Property.prototype.update = update;
Property.prototype.destroy = destroy;
Property.prototype.stats = stats;
Property.prototype.getRegions = getRegions;
module.exports = Property;
