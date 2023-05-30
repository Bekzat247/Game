let $startbtn = document.querySelector('#start')
let $game = document.querySelector('.game');
let $time = document.querySelector('#time');
let $result = document.querySelector('#result-header')
let $result2 = document.querySelector('#result')
let $gametime = document.querySelector("#game-time");
let $maintime = document.querySelector('#time-header')
let $reg = document.querySelector('.reg')
let $list = document.querySelector('.list')
let $regover = document.querySelector('#regover')
let $app = document.querySelector('.app')
let $showlistofusers = document.querySelector('#showlist')
let $regname = document.querySelector('#nameReg')
let user = {}
let list = []

$startbtn.addEventListener('click', start)

function start() {
    $startbtn.classList.add('hide')
    $game.style.backgroundColor = 'white';
    $maintime.classList.remove('hide')
    ch = 0
    $result.classList.add('hide')
    timer();
    createBox();

}

function createBox() {
    $game.innerHTML = ""
    let box = document.createElement('div')

    let size = getRandom(30, 50);
    let left = getRandom(0, 300 - size)
    let top = getRandom(0, 300 - size)

    box.style.backgroundColor = `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`
    box.style.width = box.style.height = size + 'px'
    box.style.position = 'absolute'
    box.style.left = left + 'px'
    box.style.top = top + 'px'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}
function getRandom(min, max) {
    return Math.ceil(Math.random() * (max - min) + min)
}

$game.addEventListener('click', clickedBox)
let ch = 0
function clickedBox(event) {
    ch++
    if (event.target.dataset.box) {
        createBox()
    }
}
function timer() {
    $time.textContent = $gametime.value
    let interval = setInterval(function () {
        $time.textContent = ($time.textContent - 0.1).toFixed(1)
        if ($time.textContent == '0.0') {
            clearInterval(interval)
            gameover()
        }
    }, 100)
}
$gametime.addEventListener('change', function (event) {
    $time.textContent = event.target.value
})

function gameover() {
    $startbtn.classList.remove('hide')
    $result.classList.remove('hide')
    $maintime.classList.add('hide')
    $game.innerHTML = ""
    $game.style.backgroundColor = '#ccc';
    $result2.textContent = ch
    user.name = $regname.value
    user.ch = ch
    list = getData('list')
    list.push(user)
    user = {}
    setData(list)
    console.log(list);
}

$regover.addEventListener('click', regOver)

function regOver(event) {
    if($regname.value == ""){
        alert('Пожалуйста напишите имя')
    }else{
        event.preventDefault()
        $reg.classList.add('hide')
        $app.style.display = 'block'
    
    }
}

function setData(list) {
    localStorage.setItem('list', JSON.stringify(list))
}
function getData(key) {
    let data = localStorage.getItem(key)
    return JSON.parse(data)
}

$showlistofusers.addEventListener('click', function () {
    list = getData('list')
    showlist(list)
})


function showlist(list) {
    $list.innerHTML = ""
    sort(list)
    for (let i = 0; i < list.length; i++) {
        //    list.length = 10    
        $list.insertAdjacentHTML('afterBegin',
        `<div class="listdiv">
            <h1>${list[i].name}</h1>
            <h1>${list[i].ch}</h1>
        </div>`)
    }    
}

function sort(list){
    for (k = 0; k < list.length; k++){
        for (j = k + 1; j < list.length; j++){
            if (list[k].ch > list[j].ch){
                let a = list[k]
                list[k] = list[j]
                list[j] = a
            }
        }
    }

}










// listofusers.innerHTML = ""
//     for (let i = 0; i < list.length; i++) {
//         listofusers.insertAdjacentHTML('afterbegin',
//             `<div class="user">
//         <h1>${list[i].name}</h1>
//         <h1>${list[i].surname}</h1>
//         <h1>${list[i].age}</h1>
//         <h1>${list[i].fornumber}</h3>
//         <h1>${list[i].email}</h1>
//     </div>
//     <div class="pustoi_div"></div>
//     `);  