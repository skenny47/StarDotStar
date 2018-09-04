
/*global Phaser*/
function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}

function DrawGrid(game,parts){
  var gfx = game.add.graphics(0,0);
  gfx.lineStyle(10, 0x33FF00);
  /* draw 'now' vertical line */
  gfx.moveTo(game.width/5,game.height);
  gfx.lineTo(game.width/5,0);
  /* draw horizontal line for each part */
  if (parts>0){ // only draw if score (when score, pwrts > 0 )
    var step;
    for (step = 1; step < parts; step++) 
    {
        gfx.moveTo(0,step * (game.height/parts));
        gfx.lineTo(.80*game.width,step * (game.height/parts));
    }
  }
}


function PlaceEventIcon(game,iconName,x,y)
{
  if (iconName.length > 0){
    let sprite = game.add.sprite(x,y, iconName);
    //sprite.x += sprite.width;
    //sprite.y -= sprite.height;
    sprite.inputEnabled = true;
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.velocity.x = -50;
    sprite.lifespan = 15000;
  }
}

function getCurrentTime(){
    var currentdate = new Date(); 
    var time = currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    return time;
}

function convertEventYToAbsoluteY(y,p,numParts,height){
   var partSize = height / numParts;
   return ((p-1)*partSize) + (y*partSize);
}

function convertYToPercentageInPart(realY, numberOfParts, height){
  var partSize = height / numberOfParts;
  return frac(realY/partSize);
}

function determinePartNumberFromY(realY,numberOfParts, height){
  var partSize = height / numberOfParts;
  return Math.floor(realY/partSize) + 1;
}

function frac(f) {
    return f % 1;
}