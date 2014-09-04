// Implementation of the Levenshtein Distance algorithm
// that optionally takes a max argument. Passing in a max arugment
// greatly reduces the time it takes to calculate the edit distance.

module.exports = function(a, b, max) {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  if (a.length > b.length) {
    var tmp = a;
    a = b;
    b = tmp;
  }

  if (!max || max < 0) max = b.length;
  if (b.length - a.length > max) return max + 1;


  var currentRow = [];
  var previousRow = [];

  for (var i = 0; i <= a.length; i++) {
    currentRow[i] = 0;
  }

  for (var i = 0; i <= a.length; i++) {
    previousRow[i] = i;
  }

  for (var i = 1; i <= b.length; i++) {
    currentRow[0] = i;
    // Math.min and Math.max are too slow
    var from = (i - max - 1) > 1 ? (i - max - 1) : 1
    var to = (i + max + 1) < a.length ? (i + max + 1) : a.length;
    for (var j = from; j <= to; j++) {
      var cost = a[j - 1] === b[i - 1] ? 0 : 1;
      var tmp;

      // Substitute
      var val = previousRow[j - 1] + cost;

      // Insert
      tmp = previousRow[j] + 1;
      if (val > tmp) {
        val = tmp;
      }

      // Delete
      tmp = currentRow[j - 1] + 1;
      if (val > tmp) {
        val = tmp;
      }

      currentRow[j] = val;
    }

    var tmpRow = previousRow;
    previousRow = currentRow;
    currentRow = tmpRow;
  }

  return previousRow[a.length];
}
