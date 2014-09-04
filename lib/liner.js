// Uses Transform streams to read a file line by line

var fs = require('fs');
var stream = require('stream');
// For Node 0.8 users
if(!stream.Transform) {
  stream = require('readable-stream');
}
 
var _transform = function (chunk, encoding, done) {
  var data = chunk.toString();
  if(this._lastLineData) {
    data = this._lastLineData + data;
  }

  var lines = data.split('\n');
  this._lastLineData = lines.splice(lines.length-1,1)[0];

  lines.forEach(this.push.bind(this));
  done();
}
 
var _flush = function (done) {
  if(this._lastLineData) {
    this.push(this._lastLineData);
  }
  this._lastLineData = null;
  done();
}

 
exports.getFileReader = function(path) {
  // Set up Transform stream
  var liner = new stream.Transform( { objectMode: true } );
  liner._transform = _transform;
  liner._flush = _flush;

  // Read input file
  var source = fs.createReadStream(path);

  source.pipe(liner);
  return liner;
}