let hole = document.querySelector('.hole')
let holesArr = document.querySelectorAll('.hole')
let p1Side = document.getElementById('player-side1')
let hole_width = hole.clientWidth;
let hole_height = hole.clientHeight;
let pebblesArr = document.querySelectorAll('.pebble')
let colors= ['red','orange','yellow','green','blue','purple','indigo','cyan','lime']
let nextHole;

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
// // drop pebbles function
function movePebbles(event){
   let pebbles = [...event.target.children];
   let hola = event.target;
   holesArr.forEach((h,index)=>{
      if(hola === h){
         nextHole = holesArr[index+1]
      }
   })
   for(let i = 0; i < pebbles.length; i++){
   setTimeout(()=>{
      handgrab.push(pebbles[i])
      let take = hola.removeChild(pebbles[i])
      nextHole.appendChild(take)
   },600*i)
   }
   }
holesArr.forEach((h,index)=>{
   console.log(index)
   let length = h.children.length
   if(length>0){
   // click on hole with aleast 1 pebble
   h.addEventListener('click',movePebbles)
   }
})
