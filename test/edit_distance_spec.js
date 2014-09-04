var expect = require("chai").expect;
var editDistance = require('../lib/edit_distance.js');

describe("Edit Distance Function", function() {
  it("should calculate distance of 0 for strings that are equal", function() {
    var result1 = editDistance("anticipation", "anticipation", 2), 
        result2 = editDistance("anticipation", "anticipation", 1),
        result3 = editDistance("anticipation", "anticipation", -1),
        result4 = editDistance("anticipation", "anticipation");

    expect(result1).to.equal(0);
    expect(result2).to.equal(0);
    expect(result3).to.equal(0);
    expect(result4).to.equal(0);
  });

  it("should calculate the correct distance when either of the arguments are empty", function() {
    var result1 = editDistance("anticipation", "", 1), 
        result2 = editDistance("", "anticipation");

    expect(result1).to.equal(12);
    expect(result2).to.equal(12);
  });

  it("should work when no max argument is passed", function() {
    var result1 = editDistance("back", "book"), 
        result2 = editDistance("baby", "car"),
        result3 = editDistance("student", "pasture"),
        result4 = editDistance("lunch", "chunk");

    expect(result1).to.equal(2);
    expect(result2).to.equal(3);
    expect(result3).to.equal(5);
    expect(result4).to.equal(4);
  });

  describe("when a max argument is passed", function() {
    it("should work when the difference between the inputs is greater than 'max'", function() {
      var result1 = editDistance("anticipation", "car", 1), 
          result2 = editDistance("car", "anticipation", 5),
          result3 = editDistance("anticipation", "car");

      expect(result1).to.equal(2);
      expect(result2).to.equal(6);
      expect(result3).to.equal(10);
    });

    it("should work when the difference between the inputs is NOT greater than 'max'", function() {
      var result1 = editDistance("book", "cook", 2),
          result2 = editDistance("back", "book", 2), 
          result3 = editDistance("baby", "car", 3),
          result4 = editDistance("student", "pasture", 1),
          result5 = editDistance("lunch", "chunk", 3);

      expect(result1).to.equal(1);
      expect(result2).to.equal(2);
      expect(result3).to.equal(3);
      expect(result4).to.be.gt(1);
      expect(result5).to.be.gt(3);
    }); 
  });


});