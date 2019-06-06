var fs = require('fs');

var numberAdding = process.argv[2];

function PbNumberAdd(numberAdding) {
  this.numberAdding = Number(numberAdding);
  this.fileName = fs.readdirSync('./originalText').filter(function(fileName) {
    return !/^\./.test(fileName);
  })[0];
  this.oldText = fs.readFileSync('./originalText/' + this.fileName, 'utf8');
  this.newText = '';
}

PbNumberAdd.prototype.addNumber = function() {
  this.newText = this.oldText.replace(/(<pb id=".*?)(\d+)([a-z]?"\/>)/g, function(tag, formerTag, numberStr, tagLater) {
    var zeroSuf = '';
    if('0' === numberStr[0]) {
      zeroSuf = numberStr.match(/^0+/g)[0];
    }
    var numberAdded = Number(numberStr) + this.numberAdding;
    return formerTag + zeroSuf + numberAdded + tagLater;
  }.bind(this));

  return this;
}

PbNumberAdd.prototype.output = function() {

  fs.writeFileSync('./' + this.fileName, this.newText, 'utf8');
  return this;
}

var pbNumberChange = new PbNumberAdd(numberAdding);

pbNumberChange.addNumber()
              .output();