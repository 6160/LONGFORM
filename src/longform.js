



// ALIASES
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;


let app;


const items = {};



const createObject = (options) => {
    // 
    const def = {
        name: 'test',
        img: "../img/Iconico.png",
        width: 200,
        height: 50,
        posStart: {
            x: 100,
            y: window.innerHeight + 100,
        },
        posEnd: {
            x: 100,
            y: 100
        },
        alphaStart: 0,
        alphaEnd: 1,
        animationTime: 1000,
        animations: [],
    }

    if (!options) options = def;



    let instance = new Sprite(resources[options.img].texture);
    instance.width = options.width;
    instance.height = options.height;
    instance.position.set(options.posStart.x, options.posStart.y)
    instance.alpha = options.alphaStart;
    options.instance = instance;

    app.stage.addChild(instance);

    items[options.name] = options

    let position = options.posStart;
    // Create a tween for position first
    let tp = new TWEEN.Tween(position)
                    .to(options.posEnd, options.animationTime)
                    .repeat(1)
                    .easing( TWEEN.Easing.Cubic.InOut )
                    .onUpdate(function(object) {
                        console.log('OBJ Y: ',object.y);
                        instance.y = object.y;
                    })
                    .start()
    // Then tell the tween we want to animate the x property over 1000 milliseconds

    let alpha = {alpha: 0};
    let ta = new TWEEN.Tween(alpha)
                    .to({alpha: 1}, 1000)
                    .repeat(1)
                    .easing( TWEEN.Easing.Exponential.Out )
                    .onUpdate(function(object) {
                        console.log('OBJ alpha: ',object.alpha);
                        instance.alpha = object.alpha;
                    })
                    .start()

    options.animations.push(tp);
    options.animations.push(ta);

}



// INIT

const init = () => {
    let type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()){
        type = "canvas"
    }
    
    PIXI.utils.sayHello(type)

    app = new Application();
    document.body.appendChild(app.view);
    app.renderer.backgroundColor = 0x061639;
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoDensity = true;
    app.renderer.resize(window.innerWidth, window.innerHeight + 1);
}




loader
  .add("../img/IMG_2074.png")
  .add('../img/Iconico.png')
  .load(setup);







1
//This `setup` function will run when the image has loaded
function setup() {

  //Create the cat sprite
  let center = new Sprite(loader.resources["../img/IMG_2074.png"].texture);
  items.center = center;
  center.width = window.innerWidth;
  center.height = window.innerHeight;
  center.interactive = true;

  //Add the cat to the stage
  app.stage.addChild(center);

  createObject();

}



let last_known_scroll_position = 0;
let ticking = false;

function doSomething(scroll_pos) {
  // Do something with the scroll position
  
//   if (items.iconico) items.iconico.y += scroll_pos;
    animate();
//   console.log('ooooo')
}

window.addEventListener('scroll', function(e) {
    console.log('???')
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
    //   doSomething(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});

document.body.addEventListener("wheel", function(event){
   
    event.preventDefault()
    console.log('WHEEEL EVENT: ', event.deltaY)

    doSomething(event.deltaY)
    // items.iconico += event.deltaY * 3;
});

init();




function animate() {
    requestAnimationFrame(animate);
    // [...]
    TWEEN.update();
    // [...]
}



