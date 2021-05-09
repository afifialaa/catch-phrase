console.log('hello world');

const joinRandGameBtn = document.getElementById('joinRandomGameBtn');
const joinGameBtn = document.getElementById('joinGameBtn');
const createGameBtn = document.getElementById('createGameBtn');

const tokenInputField = document.getElementById('tokenInputField');

// Redirect to game with token
const getToken = () => {
    axios.get('http://localhost:4000/game/createGame').then(response =>{
        console.log(response.data.gameToken);
        localStorage.setItem('gameToken', response.data.gameToken);
        window.location.replace(`http://localhost:4000/game/${response.data.gameToken}`);
    })
}

// Adding click event to button
createGameBtn.addEventListener('click', event => {
    getToken();
});

// Adding click event to button
joinGameBtn.addEventListener('click', (event)=>{
    joinGame();
})

// Join random game button handler
const joinRandomGame = () =>{
    console.log('Joining random game');
}

// Join game button hanlder
const joinGame = () =>{
    console.log('Joining game with token');
    let gameToken = tokenInputField.value;

    axios.post('http://localhost:4000/game/join', {
        gameToken: gameToken
    }).then( reponse => {
        console.log('lets goo');
    })

    let socket = io();
}

// Create game button hanlder
const createGame = () =>{
    console.log('Creating game');
}
