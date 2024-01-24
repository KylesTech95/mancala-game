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
let counter;
let unitSize = 15
let handgrab = []
let comphand = []
let compRound = []
let i = 0;
let gameHeight = document.querySelector('#game-border').getBoundingClientRect().height;
let goals = document.querySelectorAll('.goal') // array 

for(let i in goals){
   let p1=(goals[i].id==='player-1')
   let p2=(goals[i].id==='player-2')
   if(p1){
      goals[i].style = `top:${gameHeight/10}px;`
   }
   else{
      goals[i].style = `bottom:${gameHeight/10}px`
   }
}

// Place pebbles in their perspective holes
const placePebbles = (min,max,type) => {
   holesArr.forEach(h =>{
   if(!h.classList.contains('goal')){
      let pebble = [...h.children];
      pebble.forEach(peb=>{
      peb.style=`left:${Math.round((Math.random()*(max-min)+min)*unitSize)/unitSize}px;top:${Math.round((Math.random()*(max-min)+min)*unitSize)/unitSize}px;background:${colors[Math.floor(Math.random()*colors.length)]}`
      })
   }
    
    
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
         if(h.id!=='player-1' ){
            h.addEventListener('mouseenter',pointerEventsFn)
         }
   })
}

// drop pebbles function
function movePebbles(event){
   // disable pointer events for player 1 immediately
   holesArr.forEach((h,index)=>{
      if(index<7 && !h.classList.contains('middle')){
         h.style.pointerEvents='none'
      }
      let length = h.children.length
      if(length>0){
      // click on hole with aleast 1 pebble
      h.addEventListener('click',movePebbles)
      }
   })
   let pebbles = [...event.currentTarget.children];
   let len = pebbles.length
   let hola = event.currentTarget;
   // uncomment to test player 1 pebble movement
   // p1Children.forEach(child => child.style.pointerEvents='auto')


   for(let i = 0; i < pebbles.length; i++){ 
   setTimeout(()=>{
      // grab all you pebbles to see what you have in the console
      handgrab.push(pebbles[i])
      // console.log(handgrab)
      // remove each pebble from its hole and put it in your 
      let take = hola.removeChild(pebbles[i])
      let lastPebDrop = handgrab[handgrab.length-1]
      holesArr = [...holesArr].filter((h,i)=>!h.classList.contains('middle'))
      holesArr.forEach((h,index)=>{
         // if target === hole
         if(hola === h){
            // console.log(counter)
            // console.log(index)
            // increment to the next hole
            nextHole = [...holesArr].filter((x,i)=>i!==13)[(index+counter)%(holesArr.length-1)]
            // append the pebble child in your hand
            nextHole.appendChild(take)
            if(nextHole.classList.contains('goal')&&nextHole.id!="player-2"){
               let score = nextHole.children[0]
               score.textContent=(Number(score.textContent))+1
            }
            // what happens if player pebbles end in goal?
            // if(nextHole.id=="player-1"){
            //    let goal1 = document.querySelector('#player-1');
            //    let lastChild = [...goal1.children][goal1.children.length-1]
            //    console.log(lastChild)
            //    console.log(lastPebDrop)
            //    if(lastChild===lastPebDrop){
            //       console.log('yaaas')
            //       playerTurn()
            //       holesArr.forEach((x,i)=>x.style.pointerEvents='auto')
            //    }
            // }
            
            counter++
         }
      })
   },600*i)
   // reset counter and handgrab
   counter=1;
   handgrab=[]
   }
      // computer's turn
      setTimeout(()=>{
         computerTurn()
      },(600*len)+250) 
   }
// player turn
function playerTurn(){
   console.log('players turn!')
   available_holes()
   // if the holes index is greater than player 1 side, set pointer events to none
   holesArr.forEach((h,index)=>{
      if(index>6 && !h.classList.contains('middle')){
         h.style.pointerEvents='none'
      }
      let length = h.children.length
      if(length>0){
      // click on hole with aleast 1 pebble
      h.addEventListener('click',movePebbles)
      }
   })
}
playerTurn()




const selectPlayables=(arr)=>{
   arr=arr.filter((hole,i)=>{
      if(hole.children.length>0&&i!==arr.length-1){
         return hole
      }
   })
   return arr;
}
// get valid hole (computer)
const getValidHoles = () =>{
   let arr = [...p2Side.children]
   arr=selectPlayables(arr)
   return arr
}

// drop pebbles function
function movePebbles_comp(arr){
  
   counter=1
   // disable pointer events for player 1 immediately
   holesArr.forEach((h,index)=>{
      if(index<7 && !h.classList.contains('middle')){
         h.style.pointerEvents='none'
      }
      let length = h.children.length
      if(length>0){
      // click on hole with aleast 1 pebble
      h.addEventListener('click',movePebbles)
      }
   })
   
   let pebbles = [...arr.children];
   let len = pebbles.length
   let hola = arr

   // computer's turn
   setTimeout(()=>{
       // enable pointer events for player 1 immediately
      holesArr.forEach((h,index)=>{
      if(index<7 && !h.classList.contains('middle')){
         h.style.pointerEvents='auto'
      }
     
   })
      playerTurn()
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
            // console.log(counter)
            // console.log(index)
            // increment to the next hole
            nextHole = [...holesArr].filter((x,i)=>i!==6)[(index+counter)%(holesArr.length-1)]
            // append the pebble child in your hand
            nextHole.appendChild(take)
            if(nextHole.classList.contains('goal')&&nextHole.id!="player-1"){
               let score = nextHole.children[0]
               score.textContent=(Number(score.textContent))+1
            }
            // console.log(nextHole)
            counter++
         }
      })
   },600*i)
   // reset counter and handgrab
   counter=0
   handgrab=[]
   }
   }
// computer picks a valid hole
function computerPicksHole(pick){
console.log(pick)
movePebbles_comp(pick)
}
// computer turn
function computerTurn(){
   let computerHoles = getValidHoles()
       for(let i = 0; i < computerHoles.length; i++){
         let h = computerHoles[i]
         h.style.pointerEvents='none'
         console.log(h)
         compRound.push(h)
       }
       let randomPick = compRound[Math.floor(Math.random()*compRound.length)]
       computerPicksHole(randomPick)
         compRound.splice(compRound.indexOf(randomPick),1)
         console.log(compRound)
         compRound=[]

}
