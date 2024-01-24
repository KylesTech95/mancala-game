let hole = document.querySelector('.space')
let holeSize = document.querySelector('.hole')
let holesArr = document.querySelectorAll('.space')
let p1Side = document.getElementById('player-side1')
let p2Side = document.getElementById('player-side2')
let goalWidth = document.querySelector('#player-1').clientWidth
let goalHeight = document.querySelector('#player-1').clientHeight
let hole_width = holeSize.clientWidth;
let hole_height = holeSize.clientHeight;
let pebblesArr = document.querySelectorAll('.pebble')
let colors= ['red','orange','yellow','green','blue','purple','indigo','cyan','lime']
let nextHole;
let counter = 1;
let unitSize = 15
let handgrab = []
let comphand = []
let i = 0;
let gameHeight = document.querySelector('#game-border').getBoundingClientRect().height;
let goals = document.querySelectorAll('.goal') // array 

for(let i in goals){
   let p1=(goals[i].id==='player-1')
   let p2=(goals[i].id==='player-2')
   if(p1){
      goals[i].style = `top:${gameHeight/10}px`
   }
   else{
      goals[i].style = `bottom:${gameHeight/10}px`
   }
}

// Place pebbles in their perspective holes
const placePebbles = (min,max,type) => {
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
   holesArr.forEach((h,i)=>{
      console.log(i)
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
      computerTurn()
   },(600*len)+250)
   for(let i = 0; i < pebbles.length; i++){ 
   setTimeout(()=>{
      // grab all you pebbles to see what you have in the console
      handgrab.push(pebbles[i])
      // console.log(handgrab)
      // remove each pebble from its hole and put it in your 
      let take = hola.removeChild(pebbles[i])
      holesArr = [...holesArr].filter((h,i)=>!h.classList.contains('middle'))
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
            console.log(nextHole)
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
const getValidHoles = () =>{
   let arr = [...p2Side.children]
   arr.filter((hole,i)=>{
      if(hole.children.length>0){
         return hole
      }
   })
   console.log(arr)
}
// computer turn
function computerTurn(){
   getValidHoles()
}
