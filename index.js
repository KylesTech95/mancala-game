let hole = document.querySelector('.hole')
let holesArr = document.querySelectorAll('.hole')
let hole_width = hole.clientWidth;
let hole_height = hole.clientHeight;
let pebblesArr = document.querySelectorAll('.pebble')
let colors= ['red','orange','yellow','green','blue','purple','indigo','cyan','lime']

let unitSize = 15
let handgrab = []
let i = 0;


// Place your pebbles in your perspective holes
const placePebbles = (min,max) => {
   holesArr.forEach(h =>{
    let pebble = [...h.children];
    pebble.forEach(peb=>{
    peb.style=`left:${Math.round((Math.random()*(max-min)+min)*unitSize)/unitSize}px;top:${Math.round((Math.random()*(max-min)+min)*unitSize)/unitSize}px;background:${colors[Math.floor(Math.random()*colors.length)]}`
    })
    
   })
 

}
placePebbles(0,((hole_width+50)/2))
placePebbles(0,((hole_height+50)/2))

// pointer events function
function pointerEventsFn(event){
   let len = event.target.children.length;
   let h = event.target
     // if pebbles are not there set no pointer events
     if(len < 1){
      h.style='pointer-events:none'
     }
     else{
      h.style='pointer-events:auto'
     }
}
// Pick a hole to grab pebbles from
const available_holes = () => {
   holesArr.forEach(h=>{
      h.addEventListener('mouseleave',pointerEventsFn)
      h.addEventListener('mouseenter',pointerEventsFn)
   })
}
available_holes()

// drop pebbles function
function dropPebbles(event){
   let hola = event.target;
   console.log(hola)
   let pebbles = [...event.target.children];
   // console.log(pebbles)
   for(let i = 0; i < pebbles.length; i++){
   setTimeout(()=>{
      handgrab.push(pebbles[i])
      hola.removeChild(pebbles[i])
      // console.log(handgrab)
   },600*i)
   }
   }
// click on hole with aleast 1 pebble
holesArr.forEach(h=>{
   let len = h.children.length;
   if(len > 0){
      h.addEventListener('click', dropPebbles)
   }  
})