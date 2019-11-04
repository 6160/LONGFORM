const gridGuides = 10;
const grid = {
  x_pan: Math.floor(window.innerWidth / gridGuides),
  y_pan: Math.floor(window.innerHeight/ gridGuides),
}




const items = [];
const itemData = {
  bg: {
    name: "bg",
    img: "bg",
    width: window.innerWidth,
    height: window.innerHeight,
    posStart: {
      x: 0,
      y: 0
    },
    posEnd: {
      x: 0,
      y: 0
    },
    alphaStart: 0,
    alphaEnd: 1,
    animationTime: 1000,
    animations: [],
    animationTriggered: false,
  },
  iconico: {
    name: "test",
    img: "iconico",
    width: 200,
    height: 50,
    posStart: {
      x: 1 * grid.x_pan,
      y: window.innerHeight + 100
    },
    posEnd: {
      x: 1 * grid.x_pan,
      y: 2 * grid.y_pan
    },
    alphaStart: 0,
    alphaEnd: 1,
    animationTime: 1000,
    animations: [],
    animationTriggered: false,
  },
  clevel: {
    name: "clevel",
    img: "clevel",
    width: 200,
    height: 50,
    posStart: {
      x: 8 * grid.x_pan,
      y: window.innerHeight + 100
    },
    posEnd: {
      x: 8 * grid.x_pan,
      y: 2 * grid.y_pan
    },
    alphaStart: 0,
    alphaEnd: 1,
    animationTime: 1000,
    animations: [],
    animationTriggered: false,
  },
  business: {
    name: "business",
    img: "business",
    width: 200,
    height: 50,
    posStart: {
      x: 1 * grid.x_pan,
      y: window.innerHeight + 100
    },
    posEnd: {
      x: 1 * grid.x_pan,
      y: 8 * grid.y_pan
    },
    alphaStart: 0,
    alphaEnd: 1,
    animationTime: 1000,
    animations: [],
    animationTriggered: false,
  },
  dissacrante: {
    name: "dissacrante",
    img: "dissacrante",
    width: 200,
    height: 50,
    posStart: {
      x: 4 * grid.x_pan,
      y: window.innerHeight + 100
    },
    posEnd: {
      x: 4 * grid.x_pan,
      y: 1 * grid.y_pan
    },
    alphaStart: 0,
    alphaEnd: 1,
    animationTime: 1000,
    animations: [],
    animationTriggered: false,
  },
  irriverente: {
    name: "irriverente",
    img: "irriverente",
    width: 200,
    height: 50,
    posStart: {
      x: 4 * grid.x_pan,
      y: window.innerHeight + 100
    },
    posEnd: {
      x: 4 * grid.x_pan,
      y: 9 * grid.y_pan
    },
    alphaStart: 0,
    alphaEnd: 1,
    animationTime: 1000,
    animations: [],
    animationTriggered: false,
  },
  preciso: {
    name: "preciso",
    img: "preciso",
    width: 200,
    height: 50,
    posStart: {
      x: 8 * grid.x_pan,
      y: window.innerHeight + 100
    },
    posEnd: {
      x: 8 * grid.x_pan,
      y: 8 * grid.y_pan
    },
    alphaStart: 0,
    alphaEnd: 1,
    animationTime: 1000,
    animations: [],
    animationTriggered: false,
  },
}



// ALIASES
let Application = PIXI.Application,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite;


let app;


const createObject = options => {
  const def = {
    name: "test",
    img: "iconico",
    width: 200,
    height: 50,
    posStart: {
      x: 100,
      y: window.innerHeight + 100
    },
    posEnd: {
      x: 100,
      y: 100
    },
    alphaStart: 0,
    alphaEnd: 1,
    animationTime: 1000,
    animations: [],
    animationTriggered: false,
  };

  if (!options) options = def;

  let instance = new Sprite(resources[options.img].texture);
  instance.width = options.width;
  instance.height = options.height;
  instance.position.set(options.posStart.x, options.posStart.y);
  instance.alpha = options.alphaStart;
  options.instance = instance;

  app.stage.addChild(instance);

  items[options.name] = options;

  let position = options.posStart;
  let tp = new TWEEN.Tween(position)
    .to(options.posEnd, options.animationTime)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate(function(object) {
    //   console.log("OBJ Y: ", object.y);
      instance.y = object.y;
    })
    

  let alpha = { alpha: 0 };
  let ta = new TWEEN.Tween(alpha)
    .to({ alpha: 1 }, 1000)
    .easing(TWEEN.Easing.Exponential.Out)
    .onUpdate(function(object, index) {
    //   console.log("OBJ alpha: ", object.alpha, index);
      instance.alpha = object.alpha;
    })
    
  options.animations.push(tp);
  options.animations.push(ta);

  // items.push(options);
  
};

// INIT
const init = () => {
  let type = "WebGL";
  if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
  }

  PIXI.utils.sayHello(type);

  app = new Application();
  document.body.appendChild(app.view);
  app.renderer.backgroundColor = 0x061639;
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.autoDensity = true;
  app.renderer.resize(window.innerWidth, window.innerHeight + 1);


  loader
  .add("bg", "../img/bg.png")
  .add("iconico", "../img/iconico.png")
  .add("clevel", "../img/clevel.png")
  .add("business", "../img/business.png")
  .add("dissacrante", "../img/dissacrante.png")
  .add("irriverente", "../img/irriverente.png")
  .add("preciso", "../img/preciso.png")
  .load(setup);

};


//This `setup` function will run when the image has loaded
function setup() {
  console.log(window.innerWidth + "x" + window.innerHeight);
  console.log(document.body.clientWidth + "x" + document.body.clientHeight);
  console.log(grid)
  
  let center = new Sprite(loader.resources["bg"].texture);
  center.width = window.innerWidth;
  center.height = window.innerHeight;
  app.stage.addChild(center);

  Object.values(itemData).forEach(item => {
   if (item.name !== 'bg') createObject(item)
  })
}


function startTransition(scroll_pos) {
  Object.values(items).forEach(item => {
    if (!item.animations || item.animationTriggered) return;
    
    item.animations.forEach(anim => {
        console.log('##### STARTING TWEEN');
        anim.start();
        item.animationTriggered = true;
    })
  })
  animate();

}

document.body.addEventListener("wheel", function(event) {
  event.preventDefault();
  startTransition(event.deltaY);
});

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
}


init();
