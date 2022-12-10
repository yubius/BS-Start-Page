var _seed = new Date().getTime();
var __seed = _seed;

var $canvas;
var _width, _height;
var _color, _tree;
var _c, _scale = 1;

var _message = 0;

const _messages = [
  "你好",
  "涂思静同学",
  "祝你",
  "圣诞节快乐🎅",
  "Merry Christmas",
  "Glædelig Jul",
  "Prettige Kerstdagen",
  "Häid jõule",
  "Hauskaa joulua",
  "Joyeux Noël",
  "Frohe Weihnachten",
  "Χαρούμενα Χριστούγεννα",
  "Buon Natale",
  "メリー クリスマス",
  "메리 크리스마스",
  "Priecīgus Ziemassvētkus",
  "Linksmų%šv. Kalėdų",
  "Среќен Божиќ",
  "God%jul",
  "Wesołych Świąt!",
  "Feliz Natal",
  "Crăciun fericit",
  "Счастливого Рождества!",
  "Srećan Božić",
  "Kirismas Wanaagsan",
  "Feliz Navidad",
  "Heri%ya krismas",
  "God%jul",
  "Веселого Різдва",
  "Bon Nadal"
];

// utils

function random() {
  let x = Math.sin(__seed++) * 10000;
  return x - Math.floor(x);
}

function range( v = 0, omin = 0, omax = 1, nmin = 0, nmax = 1, clamp = false ) {
  let result = ( v - omin ) * ( nmax - nmin) / ( omax - omin ) + nmin;
  if ( clamp ) result = Math.min( Math.max( result, nmin ), nmax );
  return result;
}

function radians( degrees = 0 ) {
  return degrees * (Math.PI / 180);
}

function angleTo( p1, p2 ) {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}

function distance( p1, p2 ) {
  return Math.sqrt( Math.pow( p1.x - p2.x, 2 ) + Math.pow( p1.y - p2.y, 2 ));
}

function vectorOnCurve( time, p1, p2, p3 ) {
  let x = (1 - time) * ((1 - time) * p1.x + (time * p2.x)) + time * (((1 - time) * p2.x + (time * p3.x)));
  let y = (1 - time) * ((1 - time) * p1.y + (time * p2.y)) + time * (((1 - time) * p2.y + (time * p3.y)));
  return { x , y };
}

// constructor

( _ => {
  initCanvas();
  addHandlers();
  resize();
  
  setInterval( _ => {
    _seed = new Date().getTime();
    resize();
  }, 1000 );
  
})();

// setup

function initCanvas() {
  $canvas = document.createElement('canvas');
  document.body.appendChild( $canvas );
  _c = $canvas.getContext('2d');
}

function addHandlers() {
  window.addEventListener( 'resize', resize );
}

function resize() {
  let ratio = window.devicePixelRatio || 1;
  __seed = _seed;
  _width = window.innerWidth * ratio;
  _height = window.innerHeight * ratio;
  $canvas.setAttribute( 'width', _width );
  $canvas.setAttribute( 'height', _height );
  $canvas.style.width = `${_width / ratio }px`;
  $canvas.style.height = `${_height / ratio }px`;
  render();
}

// draw call

function render() {
  setColors();
  generateTree();
  drawBackground();
  drawBaubels();
  drawTrunk();
  drawPresents();
  drawNeedles( 2.0 );
  drawGarland( 10 );
  drawNeedles( 0.75 );
  drawGarland( -3 );
  drawBaubels();
  drawNeedles( 0.125 );
  drawStar();
  drawMessage();
}

function setColors() {
  _color = {};
  
  let wh = range( random(), 0, 1, 13, 60 );
  let ws = range( random(), 0, 1, 5, 25 );
  let wl = range( random(), 0, 1, 25, 32 );
  _color.branch = `hsla(${wh},${ws}%,${wl}%,1)`;
  
  let nh = range( random(), 0, 1, 90, 175 );
  let ns = range( random(), 0, 1, 15, 45 );
  let nl = range( random(), 0, 1, 25, 42 );
  _color.needle = `hsla(${nh},${ns}%,${nl}%,0.6)`;
  
  let bh = range( random(), 0, 1, -90, 90 );
  let bs = range( random(), 0, 1, 45, 55 );
  let bl = range( random(), 0, 1, 50, 65 );
  
  _color.bauble = `hsla(${bh},${bs}%,${bl}%,1.0)`;
  _color.garland = `hsla(${bh + 120},${bs}%,${bl + 15}%,0.75)`;
  _color.presents = `hsla(${bh - 120},${bs}%,${bl - 25}%,1.0)`;
  _color.star = `hsla(${bh + 120},${bs}%,90%,1.0)`;
  _color.background = `hsla(${nh},${ns * 0.5}%,85%,1.0)`
}

function generateTree() {
  _tree = {};
  generateTrunk();
  generateBranches();
}

function generateTrunk() {
  _tree.trunk = [];
  _tree.thickness = range( random(), 0, 1, 15, 21 );
  
  let steps = Math.floor( range( random(), 0, 1, 7, 16 ));
  let step = 0;
  
  let x = _width * 0.5;
  let y = 0;
  
  _tree.trunk.push({ x, y });
  while ( step < steps ) {
    let angle = radians( range( random(), 0, 1, 75, 105 ));
    let mult = range( steps - step, 0, steps, 35, 60 );
    let dist = range( random(), 0, 1, mult * 0.666, mult * 1.333 ) * _scale;
    x += Math.round( Math.cos( angle ) * dist );
    y -= Math.floor( Math.sin( angle ) * dist ) + 1;
    _tree.trunk.push({ x, y });
    step++;
  }
  
  let offset = Math.floor(( _height + Math.abs( y )) * 0.5 );
  for ( let step of _tree.trunk ) {
    step.y += offset;
  }
  
}

function generateBranches() {
  _tree.branches = [];
  
  let index = 0;
  for ( let step of _tree.trunk ) {
    let mult = Math.abs( range( index - _tree.trunk.length, 0, _tree.trunk.length, 0.1, 1 )) * _scale;
    let total = Math.round( range( random(), 0, 1, 4, range( mult, 0, 1, 4, 12 )));
    if ( index <= 1 ) total = 0;
    
    let i = 0;
    while ( i < total ) {
      let ox = step.x;
      let oy = step.y;
      let angle = range( mult, 0, 1, 45, 5 );
      let dist = range( random(), 0, 1, 100, 200 ) * range( mult, 0, 1, 0.35, 1.5 ) * _scale;
      angle += range( random(), 0, 1, -15, 15 );
      angle = radians( angle );
      
      let dx = ox + ( Math.cos( angle ) * dist ) * ( i / 2 === Math.round( i / 2) ? 1 : -1 );
      let dy = oy + Math.sin( angle ) * dist;
      
      _tree.branches.push({
        p1: { x: ox, y: oy },
        p2: { x: ox + ( dx - ox ) * 0.5, y: dy + ( dy - oy ) * 0.35 },
        p3: { x: dx, y: dy },
        thickness: _tree.thickness * ( 1 - (( index + 1 ) / _tree.trunk.length ))
      });
      
      i++;
    }
    
    index++;
  }
  
}

function drawBackground() {
  let fill = _color.background;
  _c.fillStyle = fill;
  _c.fillRect( 0, 0, _width, _height );
}

function drawTrunk() {
  let index = 0;
  _c.fillStyle = _color.branch;
  _c.strokeStyle = '';
  
  for ( let segment of _tree.trunk ) {
    let next = _tree.trunk[ index + 1 ];
    if ( !next ) break;
    
    let tThick = _tree.thickness * ( 1 - (( index + 1 ) / _tree.trunk.length ));
    let bThick = _tree.thickness * ( 1 - ( index / _tree.trunk.length ));
    
    _c.beginPath();
    _c.moveTo( segment.x - bThick, segment.y );
    _c.lineTo( next.x - tThick, next.y );
    _c.lineTo( next.x + tThick, next.y );
    _c.lineTo( segment.x + bThick, segment.y );
    _c.closePath();
    _c.fill();
    index++;
  }
}

function drawBranches() {
  let index = 0;
  _c.fillStyle = '';
  _c.strokeStyle = _color.branch;
  
  for ( let branch of _tree.branches ) {
    _c.beginPath();
    _c.moveTo( branch.p1.x, branch.p1.y );
    _c.quadraticCurveTo( branch.p2.x, branch.p2.y, branch.p3.x, branch.p3.y );
    _c.lineWidth = Math.max( branch.thickness * 0.8, 3 ) * _scale;
    _c.stroke();
  }
}

function drawNeedles( mult = 1 ) {
  _c.fillStyle = '';
  _c.strokeStyle = _color.needle;
  
  for ( let branch of _tree.branches ) {
    let total = distance( branch.p1, branch.p3 ) * mult;
    let i = 0;
    while ( i < total ) {
      let origin = vectorOnCurve( i / total, branch.p1, branch.p2, branch.p3 );
      let angle = radians( range( random(), 0, 1, 0, 360 ));
      let length = range( random(), 0, 1, 6, 18 ) * _scale;
      
      origin.x += Math.cos( angle ) * ( 5 + branch.thickness ) * _scale;
      origin.y += Math.sin( angle ) * ( 5 + branch.thickness ) * _scale;
      
      let x = origin.x + Math.cos( angle ) * length;
      let y = origin.y + Math.sin( angle ) * length;
      let thickness = range( random(), 0, 1, 1.5, 2 ) * _scale;
      
      _c.beginPath();
      _c.lineWidth = thickness;
      _c.moveTo( origin.x, origin.y );
      _c.lineTo( x, y );
      _c.stroke();
      
      i++;
    }
  }
}

function drawBaubels() {
  let total = _tree.branches.length;
  let index = 0;
  
  _c.strokeStyle = '';
  
  while ( index < total ) {
    
    if ( random() > 0.75 ) {
      let branch = _tree.branches[ index ];
      let point = vectorOnCurve( random(), branch.p1, branch.p2, branch.p3 );
      let radius = range( random(), 0, 1, 8, 10 ) * _scale;

      
      _c.fillStyle = '';
      _c.strokeStyle = _color.background;
      _c.lineWidth = 1;
      
      _c.beginPath();
      _c.moveTo( point.x, point.y + 10 );
      _c.lineTo( point.x, point.y - 5 );
      _c.stroke();
      
      _c.fillStyle = _color.bauble;

      _c.beginPath();
      _c.arc( point.x, point.y + 10, radius, 0, Math.PI * 2 );
      _c.fill();
    }
    
    index++;
  }
}

function drawGarland( mult = 1 ) {
  let index = Math.floor( range( random(), 0, 1, 5, 12 )) + mult;
  let past = _tree.branches[index];
  
  _c.fillStyle = '';
  _c.strokeStyle = _color.garland;
  _c.lineWidth = 4 * _scale;
  _c.lineCap = 'round';
  
  while ( index < _tree.branches.length ) {
    let current = _tree.branches[ index ];
    let p1 = vectorOnCurve( 1, past.p1, past.p2, past.p3 );
    let p3 = vectorOnCurve( 1, current.p1, current.p2, current.p3 );
    
    if ( 
      distance( p1, p3 ) > 100 &&
      (( p1.x < _width / 2 && p3.x > _width / 2 ) ||
      ( p1.x > _width / 2 && p3.x < _width / 2 ))
    ) {  
      let p2 = {
        x: ( p1.x + p3.x ) / 2,
        y: Math.max( p1.y, p3.y )
      }

      _c.beginPath();
      _c.moveTo( p1.x, p1.y );
      _c.quadraticCurveTo( p2.x, p2.y, p3.x, p3.y );
      _c.stroke();
      
      past = current;
      index += Math.floor( _tree.branches.length * 0.25 );
    } else {
      index++;
    }
  }
  
  _c.lineCap = 'butt';
}

function drawPresents() {
  let i = 0;
  let ox = _width * 0.5;
  let oy = _tree.trunk[0].y;
  let offset = 0;
  
  _c.fillStyle = _color.presents;
  _c.strokeStyle = '';
  
  
  let bs = range( random(), 0, 1, 35, 45 );
  let bh = range( random(), 0, 1, -120, 120 );
  
  while ( i < range( random(), 0, 1, 10, 16 )) {
    let w = Math.floor( range( random(), 0, 1, 30, 110 )) * _scale;
    let h = Math.floor( range( random(), 0, 1, 30, 110 )) * _scale;
    let x = Math.floor( ox + range( random(), 0, 1, -140, 140 ) - w * 0.5 ) * _scale;
    let y = Math.floor( oy - h );
    y += offset;
    
    let bl = range( random(), 0, 1, 35, 85 );
    _color.presents = `hsla(${bh - 120 },${bs}%,${bl - 15}%,1.0)`;
    
    _c.beginPath();
    _c.fillStyle = _color.presents;
    _c.fillRect( x, y, w, h );
    
    let ribbon = 5;
    _c.fillStyle = _color.garland;
    
    _c.fillRect( x, y + ( h - ribbon ) * 0.5, w, ribbon );
    _c.fillRect( x + ( w - ribbon ) * 0.5, y, ribbon, h );
    
    offset += range( random(), 0, 1, 3, 8 );
    
    i++;
  }
}

function drawStar() {
  let points = Math.floor( range( random(), 0, 1, 5, 12 ));
  let point = _tree.trunk[_tree.trunk.length - 1];
  let inner = range( random(), 0, 1, 15, 20 ) * _scale;
  let outer = inner + range( random(), 0, 1, 15, 25 ) * _scale;
  let step = 360 / points;
  
  _c.fillStyle = _color.star;
  _c.strokeStyle = _color.star;
  _c.lineWidth = 5;
  _c.lineCap = 'round';
  
  let angle = -90;
  while ( angle < 270 ) {
    
    let x = point.x + Math.cos( radians( angle )) * outer;
    let y = point.y + Math.sin( radians( angle )) * outer;
    
    let x2 = point.x + Math.cos( radians( angle + step * 0.5 )) * inner;
    let y2 = point.y + Math.sin( radians( angle + step * 0.5 )) * inner;
    
    let x3 = point.x + Math.cos( radians( angle - step * 0.5 )) * inner;
    let y3 = point.y + Math.sin( radians( angle - step * 0.5 )) * inner;
    
    _c.beginPath();
    _c.moveTo( x, y );
    _c.lineTo( x2, y2 );
    _c.lineTo( point.x, point.y );
    _c.lineTo( x3, y3 );
    _c.lineTo( x, y );
    //_c.fill();
    
    _c.beginPath();
    _c.moveTo( x, y );
    _c.lineTo( x2, y2 );
    _c.stroke();
    
    _c.beginPath();
    _c.moveTo( x, y );
    _c.lineTo( x3, y3 );
    _c.stroke();
    
    angle += step;
  }
  
  // _c.beginPath();
  // _c.moveTo( point.x, point.y );
  // _c.arc( point.x, point.y, inner, 0, Math.PI * 2 );
  // _c.fill();
  
  _c.lineCap = 'butt';
}

function drawMessage() {
  let size = range( _width, 600 * 2, 1400 * 2, 95, 120 );
  
  _c.globalCompositeOperation = 'multiply';
  _c.fillStyle = 'hsl(12, 85%, 56%)';
  _c.textAlign = 'center';
  _c.font = `normal 900 ${size}px "Playfair Display SC", Serif`;
  
  let string = _messages[ _message ];
   _message++;
  if ( _message > _messages.length - 1 ) _message = 0;
  
  
  let words = string.split(' ');
  
  let spacing = size * 0.85;
  let offset = words.length * ( 0.5 * spacing ) - size;
  
  let x = _width * 0.5;
  let y = _height * 0.5 - offset;
  
  let i = 0;
  for ( let word of words ) {
    word = word.replace(/%/g, " ");
    _c.fillText( word, x, y + i * spacing );
    i++;
  }
  
  _c.globalCompositeOperation = 'source-over';
}