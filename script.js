document.querySelector('.controls-buttons span').onclick = function(){
    let yourName = prompt("what is your name") 

     
   if(yourName == "" || yourName == null){
    document.querySelector('.name span').innerHTML = 'user'
   }else {
    document.querySelector('.name span').innerHTML = yourName
   }

   document.querySelector('.controls-buttons').remove();
} 

let timer = 1000;

let blocksContainer = document.querySelector('.memory-game-blocks');
let blocks = Array.from(blocksContainer .children);

let orderRange = [...Array(blocks.length).keys()];

// console.log(orderRange)
shuffle(orderRange)
// console.log(orderRange)



blocks.forEach((block , index)=>{
    block.style.order = orderRange[index]

    block.addEventListener('click', function(){
        flip(block);
    })

});

    //flipped function 

    function flip(selectedBlock){
        selectedBlock.classList.add('is-flipped') ;

        let allBlocksFlipped = blocks.filter( flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if ( allBlocksFlipped.length === 2){

        noClicking();
        matchBlocks(allBlocksFlipped[0],allBlocksFlipped[1]);

    }
    }


// matchblocks function 
function matchBlocks(firstBlock,secondBlock){
    let triesElement = document.querySelector('.tries span');

    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        firstBlock.classList.remove('is-flipped')
        secondBlock.classList.remove('is-flipped')

        firstBlock.classList.add('has-match')
        secondBlock.classList.add('has-match')

        document.getElementById('success').play();
    } else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML)+ 1 ; 
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped')
            secondBlock.classList.remove('is-flipped')
        }, timer)
        document.getElementById('fail').play();

    }
}
//no clicking function 

function noClicking(){
    blocksContainer.classList.add('no-clicking')

    setTimeout(() => {
    blocksContainer.classList.remove('no-clicking')
    }, timer)
}




// shuffle function
function shuffle(array) {
    let current = array.length,
    temp,
    random;

    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--; 
       
       temp = array[current]; 
       array[current] = array[random];
       array[random] = temp;
    }
    return array;
}