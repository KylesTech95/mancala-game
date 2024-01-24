let hole = document.querySelector('.hole')
let holesArr = document.querySelectorAll('.hole')
let hole_width = hole.clientWidth;
let hole_height = hole.clientHeight;
let pebblesArr = document.querySelectorAll('.pebble')
let colors= ['red','orange','yellow','green','blue','purple','indigo','cyan','lime']

let unitSize = 15
let repeated_positions = []
let i = 0;

// set pebble position to random.
const placePebbles = (min,max) => {
   holesArr.forEach(h =>{
    let pebble = [...h.children];
    pebble.forEach(peb=>{
    console.log(peb)
    peb.style=`left:${Math.round((Math.random()*(max-min)+min)*unitSize)/unitSize}px;top:${Math.round((Math.random()*(max-min)+min)*unitSize)/unitSize}px;background:${colors[Math.floor(Math.random()*colors.length)]}`
    })
    
   })
 

}
let X = placePebbles(0,(hole_width/2))
let Y = placePebbles(0,(hole_height/2))

