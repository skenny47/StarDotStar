
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

function DrawIconPalette(game,globals){
  let n = globals.icons.length;
  let rows = (n/2);
  let x1 = .80 * game.width;
 
  var gfx = game.add.graphics(0,0);
  gfx.lineStyle(10, 0x33FF00);
  /* draw 'now' vertical lines */
  gfx.moveTo(x1,0);
  gfx.lineTo(x1,game.height);
  let x2 = .90 * game.width;
  gfx.moveTo(x2,0);
  gfx.lineTo(x2,game.height);
  // draw vertical lines for each row of palette
  if (rows>0){ // only draw if score (when score, pwrts > 0 )
    var step;
    for (step = 1; step <=rows; step++) 
    {
        gfx.moveTo(x1,step * (game.height/rows));
        let icon1 = globals.icons[(step-1)*2];
        let sprite = game.add.sprite(x1,(step * (game.height/rows)), icon1.name);
        sprite.x -= sprite.height;
        sprite.inputEnabled = true;
        game.physics.enable(sprite, Phaser.Physics.ARCADE);
        
        let icon2 = globals.icons[((step-1)*2)+1];
        let sprite2 = game.add.sprite(x2,(step * (game.height/rows)), icon2.name);
        sprite2.x -= sprite2.height;
        sprite2.inputEnabled = true;
        game.physics.enable(sprite2, Phaser.Physics.ARCADE);
        if (step<rows){ // draw one less line
          gfx.lineTo(game.width,step * (game.height/rows));
        }
    }
  }
}

function PlaceEventIcon(game,iconName,x,y)
{
  if (iconName.length > 0){
    var sprite = game.add.sprite(x,y, iconName);
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