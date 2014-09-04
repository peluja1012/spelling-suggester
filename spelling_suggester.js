var fs = require('fs');
var Q = require('q');
var editDistance = require('./lib/edit_distance');
var liner = require('./lib/liner');
var bktree = require('./lib/bk_tree');
var output = fs.createWriteStream('suggestions.txt');

var dictBktree;

var getBktree = function() {
  if(!dictBktree) {
    var deferred = Q.defer();
    var fileReader = liner.getFileReader('./word_frequency.csv');
    var tree;
    fileReader.on('readable', function () {
      var line;
      while (line = fileReader.read()) {
        var term = line.split(',');
        var node = {name:term[0], freq:term[1]};
        if(!tree) {
          tree = new bktree(node);
        } else {
          tree.addTerm(node);
        }
      }
    });

    fileReader.on('end', function() {
      deferred.resolve(tree);
    });

    return deferred.promise;
  }
  return dictBktree;
};


var generateSuggestionsForFile = function(path) {
  var start = new Date();
  console.log("Processing misspelled queries for file '" + path + "'....");
  getBktree().then(function(tree) {
    var fileReader = liner.getFileReader(path);
    fileReader.on('readable', function () {
      var query;
      while (query = fileReader.read()) {
        var suggestions = tree.query(query, 2);
        output.write("* " + query + ": ['" + suggestions.join("', '") + "']\n");
      }
    });

    fileReader.on('end', function() {
      var end = new Date() - start;
      console.log("Total Processing Time: %dms", end);
      output.end();
    });

  });
};

generateSuggestionsForFile('./misspelled_queries.csv');

