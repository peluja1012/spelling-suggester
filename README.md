spelling-suggester
==================

How to run
----------

In order to run this program, you need to have `node`, `npm`, and `git` installed on your machine. After these dependencies are installed, execute the following commands in your terminal:

1. `git clone https://github.com/peluja1012/spelling-suggester.git`
2. `cd spelling-suggester`
3. `npm install`
4. `node spelling_suggester.js`

At this point, the program will run and will output suggestions to file `suggestions.txt`. When it finishes, it will print the total execution time to the terminal.

In order to run tests, type `npm test` on the terminal.

Background and Questions
------------------------

My initial solution to this problem was to iterate over each query and compare it to every word in the dictionary, adding the the words that met the edit distance requirement to the list of final suggestions. With my initial Levenshtein Distance implementation, which was based on the one from [Wikipedia](http://en.wikipedia.org/wiki/Wagner%E2%80%93Fischer_algorithm) the processing time was ~20s. The time complexity for each query was O(d * n * m), where d is the size of the dictionary, and n and m are the lengths of the words on which we perform the Lenvenshtein Distance calculation.

My first improvement to my original solution was to make my edit distance calculation faster. It was noted on several articles and blog posts like [this one](http://ntz-develop.blogspot.com/2011/03/fuzzy-string-search.html) that the algorithm could be optimized if we know that the edit distance can't exceed a limit k. In this case it is necessary to calculate only the diagonal band of width 2k+1 in the distance matrix. The time complexity becomes O(d * k * min(n,m)). The processing time was reduced to ~8s.

My last improvement came as result of my previous solution being largely susceptible to the size of the dictionary. I came across a data structure called BK Tree [here](http://vivekn.com/blog/2014/01/27/efficient-spelling-correction-using-bk-trees/) and [here](http://blog.notdot.net/2007/4/Damn-Cool-Algorithms-Part-1-BK-Trees). The idea behind the BK tree is to construct a k-ary tree, such that only nodes that are within a particular edit distance are searched. Tests show that searching with a distance of 1 queries no more than 5-8% of the tree, and searching with an edit distance of 2 queries no more than 17-25% of the tree. With this improvement, the processing time of my program came down to ~5s.

1. How would the code perform if the size of the dictionary were 1 million words?
  
  Given that the code uses the BK Tree data structure and assuming an edit distance of 2, the code would only query 17-25%   of the 1 million word dictionary. So the code would perform relatively well compared to other approaches that don't use a   BK Tree.

2. How would the code perform with an edit distance of 3?

  With an edit distance of 3, the code would have to query ~60% of the tree. As a result, performance would be slower        compared to running the code with an edit distance of 2 or less.
  
3. How does the code perform on long queries versus short queries and why?

  The edit distance calculation takes longer for longer queries, therefore the overall performance of the suggestion code    decreases when the queries are long.

Attributions
------------
- File reader code based on [this](http://strongloop.com/strongblog/practical-examples-of-the-new-node-js-streams-api/) blog post.
- BK Tree implementation based on [node-bktree](https://github.com/jonahharris/node-bktree)