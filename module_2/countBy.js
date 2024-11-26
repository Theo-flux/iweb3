function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
      let name = groupName(item);
      let known = counts.find(c => c.name == name);
      if (!known) {
        counts.push({name, count: 1});
      } else {
        known.count++;
      }
    }
    return counts;
}

// This makes sure the data is exported in node.js —
// `require('./path/to/scripts.js')` will get you the array.
if (typeof module != "undefined" && module.exports && (typeof window == "undefined" || window.exports != exports))
  module.exports = countBy;
if (typeof global != "undefined" && !global.countBy)
  global.countBy = countBy;