let hole = document.querySelector('.space')
let holeSize = document.querySelector('.hole')
let holesArr = document.querySelectorAll('.space')
let p1Side = document.getElementById('player-side1')
let p2Side = document.getElementById('player-side2')
let goalWidth = document.querySelector('#player-1').clientWidth
let goalHeight = document.querySelector('#player-1').clientHeight
let display = document.querySelector('#display')
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
let gameBorder = document.querySelector('#game-border')
let bg_colors = ['ghostWhite','silver','navy','none','red']
let gameHeight = document.querySelector('#game-border').getBoundingClientRect().height;
let goals = document.querySelectorAll('.goal') // array 
let playerScore = document.querySelector('#player-1 > h1')
let compScore = document.querySelector('#player-2 > h1')
let gameStarted = false;
let instructionsBtn = document.getElementById('instructions-container')
let leftOverArr=[]
let reduceRes;
// instructions appear/shrink
function appear(){
   console.log('approved')
   instructionsBtn.classList.toggle('appear-instructions')
}
// Check if player spaces are empty
const checkEmptySpaces = () => {
   let p1 = [...holesArr].filter((h,i)=>i < 6);
   let comp = [...holesArr].filter((h,i)=> i > 6 && i < 13)
   let isEmpty = (p1.filter((_,i)=>_.children.length > 0).length < 1 || comp.filter((_,i)=>_.children.length > 0).length < 1);
   return isEmpty
}
// compare scores
const compareScores = () => {
   let p1 = [...holesArr].filter((h,i)=>i < 6);
   let comp = [...holesArr].filter((h,i)=> i > 6 && i < 13)
   let playerEmpty = p1.filter((_,i)=>_.children.length > 0).length < 1
   let compEmpty = comp.filter((_,i)=>_.children.length > 0).length < 1
   
   
   let leftOver = [...holesArr].filter((x,i)=>[...x.children].length > 1)
   for(let i = 0; i < leftOver.length; i++){
      let pebs = [...leftOver[i].children];
      leftOverArr.push(pebs)

   }

   gameStarted = false;

      return playerScore.textContent > compScore.textContent ? display.textContent = 'Player Wins!' : playerScore.textContent < compScore.textContent ? display.textContent = 'Computer Wins!' : display.textContent = 'Tie'
   

}
if(checkEmptySpaces()){
   compareScores()
}
// window onload to change game board color
window.addEventListener('load',e=>{
   gameBorder.style=`background-color:${bg_colors[Math.floor(Math.random()*bg_colors.length)]}`
})
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
const placePebbles = (min,max) => {
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


   for(let i = 0; i < len; i++){ 
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
            // if goal contains handgrab[handgrab.length-1]
            if(nextHole.id==='player-1'){
               let children = [...nextHole.children].filter((_,i)=>i!==0)
               if(children.includes(lastPebDrop) && handgrab.indexOf(lastPebDrop)== len-1){
                  if(checkEmptySpaces()){
                     compareScores()
                  }
                  else{
                  playerTurn('Nice! Move Again')
                  holesArr.filter((x,i)=>i<6).forEach(h=>h.style.pointerEvents='auto')
                  }   
                }
               }
            else{
               if(checkEmptySpaces()){
                  compareScores()
               }
               else{
                  console.log(i)
                  if(i===(len-1)){  
                   setTimeout(()=>computerTurn("Computer's turn"),250)
                  holesArr.forEach(h=>h.style.pointerEvents='none')
                  }
               }
               
            }
            counter++
         }
      })
   },600*i)
   // reset counter and handgrab
   counter=1;
   handgrab=[]
   }
   

   
}
// indicate when player must to play
   const playerIndicator = () => {
       leftOverArr = []
      return [...holesArr].filter((x,i)=>i < 6).forEach((h,index)=>{
         h.style.pointerEvents='none'

         setTimeout(()=>{
            h.classList.add('glow')
            return [...holesArr].filter((x,i)=> i<6).forEach((h,index)=>{
               setTimeout(()=>{
               h.classList.remove('glow')
               },250)
            })
         },275*(index+1))
         
         setTimeout(()=>{
            [...holesArr].filter((x,i)=>i < 6).forEach((h,index)=>{
               h.style.pointerEvents='auto'
            })
         },3000)
      })
   } 
// player turn
function playerTurn(text){
   if(!gameStarted){
      playerIndicator()
      display.textContent = 'Welcome to Mancala';  
      setTimeout(()=>{
         display.textContent = 'Your turn';  
      },2750)
      gameStarted = true;
   }
   else if(gameStarted && goals.forEach(c=>+c[0] < 1)){
      display.textContent = 'Your turn';
   }
   else{
      display.textContent =  text
   }
   
   if(checkEmptySpaces()){
      compareScores()
   }
   else{
      console.log('players turn!')
      // available_holes()
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

// drop pebbles function for computer
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

   for(let i = 0; i < len; i++){ 
   let lastPebDrop = handgrab[handgrab.length-1]
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
            let children = [...nextHole.children].filter((_,i)=>i!==0)
            if(nextHole.id==='player-2' && counter==(len-1)&&!checkEmptySpaces()){
                  setTimeout(()=>computerTurn("Computer Moves Again"),(600*len)+250)
                  holesArr.filter((x,i)=>i<7).forEach(h=>h.style.pointerEvents='none')
               }
            else if(nextHole.id==='player-2' && counter==(len-1)&&checkEmptySpaces()){
                  compareScores()
                  holesArr.filter((x,i)=>i<7).forEach(h=>h.style.pointerEvents='none')
               }
            else{
               console.log(counter)
               if(counter===(len-1)){
                  if(checkEmptySpaces()){
                     compareScores()
                  }
                  else{
                     display.textContent = "Your turn";
                     setTimeout(()=>playerTurn("Your turn"),250)
                     holesArr.filter((x,i)=>i < 6).forEach(h=>h.style.pointerEvents='auto')
                  }
                  
               
               }
               
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
movePebbles_comp(pick)
}


// computer turn
function computerTurn(text){
   if(text){
      // setTimeout(()=>display.textContent=text,300)
      display.textContent = text;
   }
   else{
      display.textContent = "Computer's turn";
   }
   handgrab=[]
   counter=0;
   if(checkEmptySpaces()){
      compareScores()
   }
   else{
      let computerHoles = getValidHoles()
      for(let i = 0; i < computerHoles.length; i++){
        let h = computerHoles[i]
        h.style.pointerEvents='none'
        compRound.push(h)
      }
      let randomPick = compRound[Math.floor(Math.random()*compRound.length)]
        computerPicksHole(randomPick)
        compRound.splice(compRound.indexOf(randomPick),1)
        console.log(compRound)
        compRound=[]
   }
   
      
       
}


