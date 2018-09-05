
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

function DrawGrid(game,numParts){
  let gfx = game.add.graphics(0,0);
  gfx.lineStyle(10, 0x33FF00);
  /* draw 'now' vertical line */
  gfx.moveTo(game.width/5,game.height);
  gfx.lineTo(game.width/5,0);
  /* draw horizontal line for each part */
  if (numParts>0){ // only draw if score (when score, parts > 0 )
    let step = 0;
    for (step = 1; step < numParts; step++) 
    {
        gfx.moveTo(0,step * (game.height/numParts));
        if (isComposer()){
          // leave room for icon palette when 'composer'
          gfx.lineTo(.80*game.width,step * (game.height/numParts));
        }else{
          gfx.lineTo(game.width,step * (game.height/numParts));
        }
    }
  }
}

function isComposer(){
    let url = document.location.href;
    let composer = "composer";
    if (url.indexOf(composer) !== -1){
      return true;
    }else{
      return false;
    }
}

function PlaceEventIcon(game,iconName,x,y)
{
  if (iconName.length > 0){
     game.debug.text( "event at: ["+x+","+y+"]", 300, 300 );
    let sprite = game.add.sprite(x,y, iconName);
    sprite.x -= sprite.width/2;
    sprite.y -= sprite.height/2;
    sprite.inputEnabled = true;
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.velocity.x = -50;
    sprite.lifespan = 15000;
  }
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