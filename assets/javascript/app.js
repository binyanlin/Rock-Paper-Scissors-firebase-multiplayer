  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCXZLIkwFjqD3KYtmrmBnf3nJq8Jtu0Hvc",
    authDomain: "rockpaperscissors-7c003.firebaseapp.com",
    databaseURL: "https://rockpaperscissors-7c003.firebaseio.com",
    projectId: "rockpaperscissors-7c003",
    storageBucket: "rockpaperscissors-7c003.appspot.com",
    messagingSenderId: "49446914675",
    appId: "1:49446914675:web:f12ed6c5b77fb3dc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

let nameEntered = true;
let choiceButton = true;
let username;
let rpsChoice = false;
let roundNum = 1;
let totalRounds = 5;
let userKey;

const displayer = () => {
  if (!nameEntered) {
    $('.main').hide();
    $('.findOpponent').hide();
  } if (nameEntered && !choiceButton) {
    $('.findOpponent').show();
  } if (nameEntered && choiceButton) {
    $('.main').show();
  }
};

displayer();


// on start after inputting a username
  $(document).on('click', '.startButton', function(event) {
    event.preventDefault();
    if ($('#name').val().trim() !== '') {
      username = $('#name').val().trim();
      $('.username').hide()
      $('.usernameSpot').html(`Welcome ${username}!`)
      database.ref('/users').push({
        'userId': username
      });
      database.ref().once('value', function(snapshot) {
        console.log(snapshot.val());
        let data = snapshot.val().users;
        let keys = Object.keys(data);
        console.log(keys);
        for (let i=0; i<keys.length; i++) {
          if (snapshot.val().users[keys[i]].userId === username) {
            userKey = keys[i];
          }
        }
        console.log(userKey);
      });
    };
    nameEntered = true;
    displayer();
  });

  
  $(document).on('click', '#playOpponent', function() {
    //looks for opponent for 1 minute and sets a timer
    //if find opponent, load game screen
    //if don't find opponent after 1 min, play computer 
  })

  $(document).on('click', '#playComputer', function() {
    playComputer();
  })

const playComputer = () => {
  choiceButton = true;
  displayer();
  //fill out computer functions here 
}

const timeStart = () => {
  var countDownDate = moment().add(30, 'seconds');

  var x = setInterval(function() {
    diff = countDownDate.diff(moment());

    if (diff <= 0) {
      clearInterval(x);
      // If the count down is finished, write some text 
      $('.countdown').text("Time Up!");
      timeUp();
    } else
      $('.countdown').text(moment.utc(diff).format("mm:ss"));

  }, 1000);
}

const timeUp = () => {
  //displays time is up
  //if a button is selected, use that button
    //otherwise, opponent wins +1
}

// const gameStart = () => {
//   roundNum = 1;
//   database.ref('game').set({
//     round1: '',
//     round2: '',
//     round3: '',
//     round4: '',
//     round5: ''
//   });
// }

$(document).on('click', '.btnChoice', function() {
  if (!rpsChoice) {
    rpsChoice = true;
    let choice = $('.btnChoice').attr('value');
    let currentRound = `round${roundNum}`
    console.log("current round: "+ currentRound);
    if (currentRound === "round1") {
      database.ref(`/game`).set({
        round1: choice
      });
    } else if (currentRound === "round2") {
      database.ref(`/game`).set({
        round2: choice
      });
    } else if (currentRound === "round3") {
      database.ref(`/game`).set({
        round3: choice
      });
    } else if (currentRound === "round4") {
      database.ref(`/game`).set({
        round4: choice
      });
    } else if (currentRound === "round5") {
      database.ref(`/game`).set({
        round5: choice
      });
    }
    console.log(choice);
  };
});
