let hole = document.querySelector('.hole')
let holesArr = document.querySelectorAll('.hole')
let p1Side = document.getElementById('player-side1')
let p2Side = document.getElementById('player-side2')

let hole_width = hole.clientWidth;
let hole_height = hole.clientHeight;
let pebblesArr = document.querySelectorAll('.pebble')
let colors= ['red','orange','yellow','green','blue','purple','indigo','cyan','lime']
let nextHole;
let counter = 1;
let unitSize = 15
let handgrab = []
let i = 0;
let player1Active = true;

if(player1Active){
p1Side.style.pointerEvents='auto'
p2Side.style.pointerEvents='none'
}
else{
p2Side.style.pointerEvents='auto '
p1Side.style.pointerEvents='none'

}
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
      h.addEventListener('mouseenter',pointerEventsFn)
   })
}
// drop pebbles function
function movePebbles(event){
   let pebbles = [...event.target.children];
   let len = pebbles.length
   let hola = event.target;
   let p1Children = [...p1Side.children]
   let p2Children = [...p2Side.children]


   holesArr.forEach((h,index)=>{
      if(hola === h){
         nextHole = holesArr[index+1]
      }
   })
   // computer's turn
   setTimeout(()=>{
     p1Children.forEach(child => child.style.pointerEvents='none')
     p2Children.forEach(child => child.style.pointerEvents='auto')
      computerTurn()
   },(600*len)+250)
   for(let i = 0; i < pebbles.length; i++){ 
   setTimeout(()=>{
      // grab all you pebbles to see what you have in the console
      handgrab.push(pebbles[i])
      // console.log(handgrab)
      // remove each pebble from its hole and put it in your 
      let take = hola.removeChild(pebbles[i])
      holesArr.forEach((h,index)=>{
         // if target === hole
         if(hola === h){
            // increment to the next hole
            nextHole = holesArr[index+counter]
            // append the pebble child in your hand
            nextHole.appendChild(take)
            // when a pebble is dropped into nextHole
            // set the hole's pointerEvent to auto
            nextHole.style.pointerEvents='auto'
            counter++
         }
      })
   },600*i)
   // reset counter and handgrab
   counter=1
   handgrab=[]
   }
   }
// player turn
function playerTurn(){
   available_holes()
   holesArr.forEach((h,index)=>{
      let length = h.children.length
      if(length>0){
      // click on hole with aleast 1 pebble
      h.addEventListener('click',movePebbles)
      }
   })
}
playerTurn()



// get valid hole (computer)
const getValidHole = () =>{
   let arr = [...p2Side.children]
   arr.forEach((hole,i)=>{
      if(hole.children.length>0){
         console.log(hole)
      }
   })
}
// computer turn
function computerTurn(){
   getValidHole()
}
