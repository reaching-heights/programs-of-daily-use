let result=[];
let clicked;

document.querySelector('.js-roll-btn').addEventListener('click', () => {
    roll(clicked+1);
});
document.querySelector('.js-reset').addEventListener('click',()=>{
    result=[];
    saveToStorage();
    reloadPage();
});


reloadPage();
function reloadPage() {
    result = loadFromStorage();
    clicked = result[result.length-1] && result[result.length-1].move || 0;
    img = result[result.length-1] && result[result.length-1].face || 1;
    let html = '';
    start = result.length;
    if(start>=5){
        end = start-5;
    }
    else{
        end=0;
    }
    for (let i = start-1; i >= end; i--) {
        if (result[i] === undefined) continue;
        html += `<pre>Roll: ${result[i].move}    Face:${result[i].face}</pre>`;
    }
    document.querySelector('.js-stat-result').innerHTML = html; 
    document.querySelector('.js-img').innerHTML=`<img src="images/${img}.jpg">`;   
}



function roll(roll) {
    let num = Math.floor(Math.random() * 6) + 1;
    document.querySelector('.js-img').innerHTML=`<img src="images/${num}.jpg">`;
    result.push({
        move:roll,face:num
    });
    saveToStorage();
    reloadPage();
}

function saveToStorage() {
    localStorage.setItem('result', JSON.stringify(result));
}


function loadFromStorage() {
    result = JSON.parse(localStorage.getItem('result'));
    if (!result) {
        result = [{
            move: 1, face: 5
        }, {
            move: 2, face: 3
        }, {
            move: 3, face: 6
        },{
            move: 4, face: 6
        }];
    }
    return result;
}