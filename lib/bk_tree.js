// Implementation of the BK Tree data structure.
// This data structure speeds up the task of finding spelling suggestions for words

var editDistance = require('./edit_distance');

var bktree = function(term) {
  if(term instanceof Array) {
    var root = new bktree(term[0]);
    root.addTerms(term.slice(1));
    return root; 
  }
  this.name = term.name;
  this.freq = term.freq;
  this.children = {};
};

bktree.prototype.addTerms = function(terms) {
  terms.forEach(function(term) {
    this.addTerm(term);
  }.bind(this));
};

bktree.prototype.addTerm = function(term) {
  var distance = editDistance(this.name, term.name);
  var child = this.children[distance];
  if(child) {
    child.addTerm(term);
  } else {
    this.children[distance] = new bktree(term);
  }
};

bktree.prototype.query = function(query, maxDist) {
  var results = [];
  this._query(query, maxDist, results);
  results.sort(function(a, b) {
    return b.freq - a.freq;
  });

  return results.map(function(result) {
    return result.name;
  });
};

bktree.prototype._query = function(query, maxDist, results) {
  var distance = editDistance(this.name, query);
  if(distance <= maxDist) {
    results.push(this);
  }

  var from = distance - maxDist;
  var to = distance + maxDist;
  for(var i = from; i <= to; i++) {
    var child = this.children[i];
    if(child) {
      child._query(query, maxDist, results);
    }
  }
};

module.exports = bktree;
