var expect = require("chai").expect;
var liner = require('../lib/liner.js');

describe("Liner Library", function() {
  it("should read lines correctly", function(done) {
    var result = [];
    var fileReader = liner.getFileReader(__dirname + '/test_files/test.csv');
    fileReader.on('readable', function() {
      result.push(fileReader.read());
    });

    fileReader.on('end', function() {
      expect(result).to.deep.equal(['love,52605','you,32694', 'to,30606', 'hello,27970', 'i,27049', 'are,26123']);
      done();
    });

  });
});