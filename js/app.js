var app = {
  init: function() {
    console.log('init');
    
    app.drawBoard();

    document.getElementById('launchScript').addEventListener('click',app.handleLaunchScriptButton);

  },
  handleLaunchScriptButton: function() {
    console.log('on a cliqué sur le script'); 
    let userCode = document.getElementById('userCode').value;
    codeLines = userCode.split('\n');
    console.log(codeLines);

    window.setTimeout(function() {
      app.codeLineLoop(codeLines, 0);
    }, 2000);
  },
  
  codeLineLoop: function(codeLines, index) {
    // Getting currentLine
      var currentLine = codeLines[index];
    console.log(currentLine);

    if (currentLine == 'turn right'){
      app.turnRight();
    }

    if (currentLine == 'turn left') {
      app.turnLeft();
    }

    if (currentLine == 'move forward'){
      app.moveForward();
    }

    // Increment
    index++;

    // if still a line to interpret
    if (index < codeLines.length) {
      // Recall same method (=> make a loop)
      window.setTimeout(function() {
        app.codeLineLoop(codeLines, index);
      }, 1000);
    } else {
      window.setTimeout(function() {
        app.checkSuccess();
      }, 1000);
    }
  },
  checkSuccess: function() {
    let pointeur=document.querySelector('.cellCurrent');
    console.log(pointeur);
    if (pointeur.className.includes('cellEnd')){
      console.log('YOU WIN');
      document.getElementById('result').innerHTML = "<p>"+"YOU WIN &#128516"+"</p>"
    } else {
      console.log('YOU LOOSE');
      document.getElementById('result').innerHTML = "<p>"+"YOU LOOSE &#128529 TRY AGAIN"+"</p>"
    }
  },

  drawBoard : function() {
    for (let i=1; i<5; i++){
      let divCellRow=document.createElement('div');
      divCellRow.setAttribute('class', 'cellRow');
      divCellRow.setAttribute('id', 'row'+i);
      let board=document.getElementById('board');
      board.prepend(divCellRow);
      for (let z=0; z<6; z++){
        let divCell=document.createElement('div');
        divCell.setAttribute('class', 'cell');
        let divCellRow=document.getElementById('row'+i);
        divCellRow.appendChild(divCell);
      }
    }
    let baseElement = document.getElementById('row4');
    let cellStart = baseElement.querySelector('div:first-child');
    cellStart.className += ' cellStart';
    let baseEndElement = document.getElementById('row1');
    let cellEnd = baseEndElement.querySelector('div:last-child');
    cellEnd.className += ' cellEnd';
    cellStart.className += ' cellCurrent'
    cellStart.className += ' cellCurrent-right'
  },

  moveForward : function(){

    // find the cell index where the pointer is to determine movements directions
    let pointeur=document.querySelector('.cellCurrent');
    let nodesArray = pointeur.parentNode.childNodes;
    console.log(nodesArray);
    let index = null;
    nodesArray.forEach((cell, indexCell) =>  {
      if (cell.className.includes('cellCurrent'))
      {
        index = indexCell;
      }
      console.log(index);
    });

    // determine the movement depending on the pointer direction
    if (pointeur.className.includes('cellCurrent-bottom'))
    {    
        let movePointeurBottom=pointeur.parentElement.nextSibling.children[index];
        pointeur.classList.remove('cellCurrent');
        pointeur.classList.remove('cellCurrent-bottom');
        movePointeurBottom.className += ' cellCurrent';
        movePointeurBottom.className += ' cellCurrent-right';
    }

    if (pointeur.className.includes('cellCurrent-top'))
    {    
        let movePointeurTop=pointeur.parentElement.previousSibling.children[index];
        pointeur.classList.remove('cellCurrent');
        pointeur.classList.remove('cellCurrent-top');
        movePointeurTop.className += ' cellCurrent';
        movePointeurTop.className += ' cellCurrent-right';
    }

    if (pointeur.className.includes('cellCurrent-left'))
    {    
        let movePointeurLeft=pointeur.previousSibling;
        pointeur.classList.remove('cellCurrent');
        pointeur.classList.remove('cellCurrent-left');
        movePointeurLeft.className += ' cellCurrent';
        movePointeurLeft.className += ' cellCurrent-right';
    }

    if (pointeur.className.includes('cellCurrent-right'))
    {
      pointeur.classList.remove('cellCurrent-right');
      pointeur.classList.remove('cellCurrent');
      let movePointeur = pointeur.nextSibling;
      movePointeur.className += ' cellCurrent'; 
      movePointeur.className += ' cellCurrent-right';
    }
  },

  turnRight : function(){

    let pointeur=document.querySelector('.cellCurrent');
   
    if (pointeur.className.includes('cellCurrent-right'))
    {
      pointeur.classList.remove('cellCurrent-right');
      pointeur.className +=' cellCurrent-bottom';
      return;
    }

    if (pointeur.className.includes('cellCurrent-left'))
    {
      pointeur.classList.remove('cellCurrent-left');
      pointeur.className +=' cellCurrent-top';
      return;
    }

    if (pointeur.className.includes('cellCurrent-top'))
    {
      pointeur.classList.remove('cellCurrent-top');
      pointeur.className +=' cellCurrent-right';
      return;
    }

    if (pointeur.className.includes('cellCurrent-bottom'))
    {
      pointeur.classList.remove('cellCurrent-bottom');
      pointeur.className +=' cellCurrent-left';
      return;
    }
  },

  turnLeft : function(){
    let pointeur=document.querySelector('.cellCurrent');
    if (pointeur.className.includes('cellCurrent-right'))
    {
      pointeur.classList.remove('cellCurrent-right');
      pointeur.className +=' cellCurrent-top';
      return;
    }

    if (pointeur.className.includes('cellCurrent-left'))
    {
      pointeur.classList.remove('cellCurrent-left');
      pointeur.className +=' cellCurrent-bottom';
      return;
    }

    if (pointeur.className.includes('cellCurrent-top'))
    {
      pointeur.classList.remove('cellCurrent-top');
      pointeur.className +=' cellCurrent-left';
      return;
    }

    if (pointeur.className.includes('cellCurrent-bottom'))
    {
      pointeur.classList.remove('cellCurrent-bottom');
      pointeur.className +=' cellCurrent-right';
      return;
    }
  },
};

document.addEventListener('DOMContentLoaded', app.init);
