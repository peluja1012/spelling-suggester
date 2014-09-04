var expect = require("chai").expect;
var sinon = require("sinon");
var bktree = require('../lib/bk_tree.js');

var t;

describe("BK Tree", function() {
  it("should get initialized correctly when one term is passed", function() {
    var tree = new bktree({name: "book", freq: 2000});
    expect(tree.name).to.equal("book");
    expect(tree.freq).to.equal(2000);
    expect(tree.children).to.deep.equal({});
  });

  it("should get initialized correctly when a list of terms is passed", function() {
    var terms = [
      {name: "book", freq: 2000},
      {name: "books", freq: 3000},
      {name: "cake", freq: 3500},
      {name: "boo", freq: 500}
    ];
    var tree = new bktree(terms);

    expect(tree.name).to.equal("book");
    expect(tree.freq).to.equal(2000);
    expect(tree.children[1].name).to.equal("books");
    expect(tree.children[4].name).to.equal("cake");
    expect(tree.children[1].children[2].name).to.equal("boo");
  });

  describe("when querying", function() {
    beforeEach(function() {
      var terms = [
        {name: "book", freq: 2000},
        {name: "books", freq: 3000},
        {name: "cake", freq: 3500},
        {name: "boo", freq: 500},
        {name: "cape", freq: 400},
        {name: "boon", freq: 1000},
        {name: "cook", freq: 1500},
        {name: "cart", freq: 1600}
      ];
      t = bktree(terms);

      sinon.spy(bktree.prototype, "_query");
    });

    afterEach(function() {
      bktree.prototype._query.restore();
    });

    it("should only visit the required nodes", function() {
      t.query("caqe", 2)
      expect(t._query.callCount).to.equal(4);
    });

    it("should return the right suggestions", function() {
      var suggestions = t.query("caqe", 2);
      expect(suggestions).to.eql(["cake", "cart", "cape"])
    });

  });
});