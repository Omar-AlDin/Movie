'use strict'

const MASTER_MOVIE_POOL = [
    { title: "dog day afternoon", image: "movie-1.jpg" },
    { title: "malena", image: "movie-2.jpg" },
    { title: "the mist", image: "movie-3.jpg" },
    { title: "you're next", image: "movie-4.jpg" },
    { title: "inception", image: "https://media.wired.com/photos/59341d3286599a3834f7cf6c/191:100/w_1280,c_limit/inception_paris_660.jpg" },
    { title: "borat", image: "https://static01.nyt.com/images/2020/10/23/arts/23borat-moments1/23borat-moments1-mediumSquareAt3X.jpg" },
    { title: "the substance", image: "https://decider.com/wp-content/uploads/2024/10/the-substance-ending-explained.jpg?quality=80&strip=all&w=646&h=430&crop=1" },
    { title: "weapons", image: "https://static0.polygonimages.com/wordpress/wp-content/uploads/2025/08/rev-1-wpn-fp-0003r_high_res_jpeg.jpeg?w=1600&h=900&fit=crop" },
    { title: "the matrix", image: "https://m.media-amazon.com/images/M/MV5BNDQ4NTRmN2ItYjgzMS00MzY3LWEwNmYtYmE2ODllZDdhNGI1XkEyXkFqcGdeQXdvbmtpbQ@@._V1_.jpg" },
    { title: "interstellar", image: "https://eslvideo.com/quiz_images/1711232471-maxresdefault.jpg" },
    { title: "pulp fiction", image: "https://d50-a.sdn.cz/d_50/c_img_G_G/pR3Zp/pulp-fiction.jpeg?fl=cro,0,0,1457,1093%7Cres,1200,,1%7Cjpg,80,,1" },
    // { title: "gladiator", image: "https://substackcdn.com/image/fetch/$s_!9HQj!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa42df3f5-67bd-4f63-a15e-ad739cc7feae_3840x2160.jpeg" },
    { title: "terrifier", image: "https://static01.nyt.com/images/2024/10/11/multimedia/terrifier-1-zfmj/terrifier-1-zfmj-mediumSquareAt3X.jpg" },
    { title: "the dark knight", image: "https://static0.polygonimages.com/wordpress/wp-content/uploads/chorus/uploads/chorus_asset/file/11678861/darkknight_movie_screencaps.com_13204.jpg" },
    // { title: "jurassic park", image: "https://people.com/thmb/ZaDCClsPoc1buDSzf6biAdXhLJo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2)/jurassic-park-watn-tout-2000-26d6d3b1e08f458889f9497772ab477c.jpg" },
    { title: "titanic", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQZiZiTWmAUXdhx-rRpIwcoTL7xoNLMSlX8WKDyCNKdvuzgbvwUJpJCxVw&s=10" },
    // { title: "the human centipede", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhU7GhmHGyqeNNVP9xn5ywS2KEDDtxCOlLjNB-LyY09eHGxULbTuSs3oA&s=10" },
    { title: "jaws", image: "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/YKA3TVXRFSNG4AQJMD6EOVCBHY.jpg&w=1440&impolicy=high_res" },
    { title: "the shining", image: "https://decider.com/wp-content/uploads/2014/10/shining.png?w=680&h=356&crop=1" },
    { title: "alien", image: "https://static.wixstatic.com/media/86af76_ba8bab6498d54a559221cf0be7fdb60d~mv2.png/v1/fill/w_1920,h_811,al_c/86af76_ba8bab6498d54a559221cf0be7fdb60d~mv2.png" },
    { title: "fight club", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDz_QUsvUqivbnBkUf1POgApvOJCzBRMVvArOL4a8svdrR6hLLyvqWnm8gAfTn8M4TZ00BHAcd0IzTgNqluqHKdwd-9ifRezAM5DOrfS_mXZfvjVFT2t1e1UlhJq1aM64zovdkH8x4Luz-/s1600/Fight+Club+-+11.jpg" },
    { title: "whiplash", image: "https://savethecat.com/wp-content/uploads/2015/04/image_08boy-and-girl.jpg" },
    { title: "la la land", image: "https://www.hollywoodreporter.com/wp-content/uploads/2017/01/35422576_max-h_2017.jpg" },
    { title: "possession", image: "https://m.media-amazon.com/images/M/MV5BYTBmNDIzZjQtMTZmYS00MGRmLTkzNGItNTcyMTg5YzRhNzQyXkEyXkFqcGdeQWRpZWdtb25n._V1_.jpg" },
    { title: "flight", image: "https://i.guim.co.uk/img/static/sys-images/Arts/Arts_/Pictures/2013/2/8/1360339652280/Flight-010.jpg?width=465&dpr=1&s=none&crop=none" },
    { title: "sully", image: "https://www.denverpost.com/wp-content/uploads/2016/09/film-sully-review-adv09-8809af1e-753e-11e6-b786-19d0cb1ed06c.jpg?w=1800&resize=1800,1800" },
    { title: "سفاح التجمع", image: "https://mediaaws-live.almasryalyoum.com/almasryalyoum/uploads/images/2026/03/25/thumbs/600x600/1693770.jpg" },
    { title: "الهوى سلطان", image: "https://mediaaws-live.almasryalyoum.com/AMAYLivePictures/portalimages/news/original/2024/11/27/2544031_0.jpg" },
    { title: "ولاد رزق", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrts0znTq5wqasuxgQVENYASG7Q1PXg5sYG316oZHkpWzxSvjWkVLNz5Ix&s=10" },
    { title: "بنات العم", image: "https://gololy.com/gallery/14000/2012-05-16_00097.jpg" },
    { title: "اسد", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT325PSqp2LXqRQ5TOi6ooJLzA8WwnyVpMMBZjUv54d37719nsoQaVhrpIL&s=10" },
    { title: "برشامة", image: "https://www.fasllah.com/?fsf_og=36659" },
    { title: "احمد واحمد", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqb7PSTqPvaEWQKEEDofbe7ekD3PYKgzCjYUTgDZnhrAejwpSKmna6XY&s=10" },
    { title: "روكي الغلابة", image: "https://img.youm7.com/ArticleImgs/2025/5/24/152126-%D8%AF%D9%86%D9%8A%D8%A7-%D8%B3%D9%85%D9%8A%D8%B1-%D8%BA%D8%A7%D9%86%D9%85-%D9%88%D9%85%D8%AD%D9%85%D8%AF-%D9%85%D9%85%D8%AF%D9%88%D8%AD.jfif" },
    { title: "الف مبروك", image: "https://vid.alarabiya.net/legacy/images/2009/08/15/5044_81829.jpg" }



];

// This holds the movies that HAVEN'T been seen across all rounds yet
let availableMovies = [...MASTER_MOVIE_POOL];

// This holds the 2 (or 15) movies for the current active round
let movieDeck = [];

const shuffleDeck = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const generateFreshRound = function () {
    const roundLength = 5; // Change this to 15 later!

    // EDGE CASE: If we don't have enough unseen movies left for a full round, 
    // reset the available pool back to the very beginning!
    if (availableMovies.length < roundLength) {
        console.log("All movies used up! Resetting global master pool.");
        availableMovies = [...MASTER_MOVIE_POOL];
    }

    // 1. Shuffle only the remaining available movies
    shuffleDeck(availableMovies);

    // 2. Extract a fresh batch using splice() instead of slice()
    // .splice(index, count) actually REMOVES items from availableMovies 
    // so they can never be pulled again in the next round!
    movieDeck = availableMovies.splice(0, roundLength);
};

// Initialize the first round
generateFreshRound();
// movieDeck = movieDeck.slice(0, 15);
// console.log(movieDeck)


const movieElement = document.querySelector('.image');

let score = 20;
let currentMovie = 1;

let movieAnswer = true

let guess = document.querySelector('.guess');

let highScore = 0;
let skipCount = 0;
const totalMovies = 5

movieElement.src = movieDeck[0].image;



const checkGuess = function () {

    // let correctAnswer;

    const userGuess = guess.value.toLowerCase().trim();
    if (movieDeck.length === 0) {

        return console.log("zero images in the deck");
    }

    if (score <= 0) {
        return;
    }

    if (userGuess === '') {

        document.querySelector('.message').textContent = "Please guess the Movie";

        return;

    }

    const correctAnswer = movieDeck[0].title;


    if (userGuess === correctAnswer) {

        // console.log("correct");
        document.querySelector('.message').textContent = "Correct ✨"
        document.querySelector('.message').style.color = '#0fec1a';

        setTimeout(function () {
            document.querySelector('.message').style.color = 'white';
        }, 300);

        // console.log(currentMovie);


        guess.value = '';

        movieDeck.shift();


        if (movieDeck.length === 0) {
            console.log("movie deck reached 0")
            document.querySelector('.message').textContent = "Victory 🎉";
            document.querySelector('.image').src = 'scott.jpg';
            document.querySelector('.image').style.borderColor = '#523fff';


            // if (score > highScore) {
            //     highScore = score;
            //     document.querySelector('.highscore').textContent = highScore;
            // }
            endGame();

            return;
        }

        // console.log(movieDeck);



        if (movieDeck.length > 0) {

            movieElement.src = movieDeck[0].image;


        }


    }

    else if (userGuess !== correctAnswer) {

        score -= 2;


        document.querySelector('.message').textContent = "Try again";


        document.querySelector('.score').textContent = score;

        document.querySelector('.image').style.borderColor = '#ff0000';

        setTimeout(

            function () {

                document.querySelector('.image').style.borderColor = 'white';

            }, 700);


        if (score <= 0) {

            document.querySelector('.message').textContent = "You Lost 😥";

            document.querySelector('.image').src = 'angry.jpg';

            // console.log("score = 0")

            return;


        }


    }


    // if guessing is correct return green background

    // switch to the next movie image

    //keep the score untouched


    //if guess is incorrect

    //decrease 2 points from score

    //do not switch to any movie image

    //

    // }

};


document.querySelector('.check').addEventListener('click', checkGuess);


guess.addEventListener('keydown', function (e) {

    if (e.key === 'Enter') {

        checkGuess();

    }

});

const endGame = function () {
    document.querySelector('.message').style.color = 'white';
    if (skipCount === totalMovies) {
        document.querySelector('.image').src = "angry.jpg";
        document.querySelector('.message').textContent = "Did you even try? 🙄"
        console.log("skip = 5")
        // return console.log("Skip 2 is working");
    } else if (skipCount >= 3) {
        document.querySelector('.image').src = "bahgat.png";
        document.querySelector('.message').textContent = "Lazy playing 🥱... Try harder! "
        console.log(">=3")
    } else {
        document.querySelector('.image').src = "scott.jpg";
        document.querySelector('.message').textContent = "Victory! 🎉"
        console.log("skip count is less than 2 or less")
        document.querySelector('.image').style.borderColor = '#523fff';

    }
    if (score > highScore) {
        highScore = score;
        document.querySelector('.highscore').textContent = highScore;
    }
}

const skip = function () {


    if (movieDeck.length === 0) {

        console.log("End of images");

        return;

    }
    if (score === 0) {
        return;
    }

    score -= 2;
    document.querySelector('.score').textContent = score;
    // next image
    skipCount++;
    console.log(skipCount);
    guess.value = '';
    document.querySelector('.message').textContent = "Skipped";
    document.querySelector('.message').style.color = '#ff4a4a';
    setTimeout(

        function () {

            document.querySelector('.message').style.color = 'white';

        }, 500);
    movieDeck.shift();


    if (movieDeck.length > 0) {


        movieElement.src = movieDeck[0].image;

    }

    else {
        endGame();

        // if (skipCount === totalMovies) {
        //     document.querySelector('.image').src = "angry.jpg";
        //     document.querySelector('.message').textContent = "Did you even try? 🙄"
        //     console.log("skip = 5")
        //     // return console.log("Skip 2 is working");
        // } else if (skipCount >= 3) {
        //     document.querySelector('.image').src = "bahgat.png";
        //     document.querySelector('.message').textContent = "Lazy playing... Try harder! 🥱"
        //     console.log(">=3")
        // } else {
        //     document.querySelector('.image').src = "scott.jpg";
        //     document.querySelector('.message').textContent = "Victory! 🎉"
        //     console.log("skip count is less than 2 or less")
        // }
        // if (score > highScore) {
        //     highScore = score;
        //     document.querySelector('.highscore').textContent = highScore;
        // }
    }



};



document.querySelector('.skip').addEventListener('click', skip);

const newGame = function () {
    // reset scores, highscore, score
    score = 20;
    skipCount = 0;
    document.querySelector('.score').textContent = score;
    document.querySelector('.highscore').textContent = highScore;
    console.log("New game is working");
    document.querySelector('.message').textContent = "Start guessing...";
    document.querySelector('.image').style.borderColor = '#ffffff';
    guess.value = '';
    //reset images


    generateFreshRound();
    // console.log(movieDeck);

    movieElement.src = movieDeck[0].image;
    // console.log(movieDeck)
}

document.querySelector('.new').addEventListener('click', newGame);