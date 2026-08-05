'use strict'


//replace master movie pool with movie api
//replace title with api movie title


//API Key
const accessToken = TMDB_ACCESS_TOKEN;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
    }
};


let availableMovies = [];
let movieDeck = [];
const seenMovieIds = new Set();
const preMovie = document.querySelector('.previous-movie');
const movieYear = document.querySelector('.year-movie');

const shuffleDeck = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const cleanTitle = (str) => {
    return str
        .toLowerCase()
        .replace(/[_/!?]/g, ' ')
        .replace(/[أإآاً]/g, 'ا')
        .replace(/[\-_/!?،,]/g, ' ')
        .replace(/\s+/g, ' ')
        .replace('٠', '0')
        .replace('١', '1')
        .replace('٢', '2')
        .replace('٣', '3')
        .replace('٤', '4')
        .replace('٥', '5')
        .replace('٦', '6')
        .replace('٧', '7')
        .replace('٨', '8')
        .replace('٩', '9')
        .replace('·', '')
        .replace('ii', '2')
        .replace(/\./g, '')
        .replace(/viii/gi, '8')
        .replace(/vii/gi, '7')
        .replace(/iii/gi, '3')
        .replace(/vi/gi, '6')
        .replace(/iv/gi, '4')
        .replace(/ix/gi, '9')
        .replace(/ii/gi, '2')
        .replace(/v/gi, '5')
        .replace(/i/gi, '1')
        .replace(/\s+/g, ' ')
        .replace('زّ', 'ز')
        .trim()




}

const normalize = str => {
    const hasLetters = /[a-zA-Z\u0600-\u06FF]/.test(str);
    if (hasLetters) {
        return str
            .replace(/\s?\d+$/g, '')
            .replace('&', 'and')
            .replace(/ة/g, "ه")
            .replace(/ي/g, "ى")
            .replace(/'/g, "")
            .split('-')[0]
            .split(':')[0]
            .trim()
    }
    return str;
}


const formatedObj = function (movie) {
    const rawTitle = movie.original_language === "ar" ? (movie.original_title || movie.title) : movie.title;

    const shortTitle = rawTitle.split('(')[0].split(')')[0];
    const semi = shortTitle.split(':')[0]
    const cleanFull = cleanTitle(shortTitle);
    const cleanShort = cleanTitle(semi)
    return {
        title: cleanFull,
        altTitle: cleanShort !== cleanFull ? cleanShort : null,
        image: `https://image.tmdb.org/t/p/w1920${movie.backdrop_path || movie.poster_path}`,
        date: movie.release_date

    }

}
const movieElement = document.querySelector('.image');
const loaderElement = document.querySelector('.loader');
const errorImage = document.querySelector('.error-image');
const checkButton = document.querySelector('.check');
const movieNameHint = document.querySelector('.name-movie-hint')
let hitHint = 0;
let skipCount = 0;
const hintW = document.querySelector('.hint-wrapper');

movieElement.onload = () => {
    loaderElement.classList.add('hidden')
    movieElement.classList.remove('hidden');
    errorImage.classList.add('hidden');



};

movieElement.onerror = () => {
    // Hide the broken image tag and show your ghost error or fallback message!
    movieElement.classList.add('hidden');
    loaderElement.classList.add('hidden');
    errorImage.classList.remove('hidden');
    document.querySelector('.message').textContent = '⚠️ Image failed to load. Check your internet!';
    preMovie.classList.add('hidden')
    // document.querySelector('.check')
};
const generateFreshRound = async function () {
    try {
        document.body.classList.remove('flawless-victory');
        document.body.style.backgroundImage = 'none';
        hitHint = 0;
        skipCount = 0;
        movieNameHint.classList.add('hidden')
        loaderElement.classList.remove('hidden');
        movieElement.classList.add('hidden');
        preMovie.classList.add('hidden');
        errorImage.classList.add('hidden');
        hintW.classList.remove('show-tooltip');

        movieDeck = [];
        const roundLength = 10;
        movieYear.classList.add('hidden')

        const intUrl = `https://api.themoviedb.org/3/discover/movie?with_original_language=en&sort_by=popularity.desc&vote_count.gte=700&page=1`;

        const arabicUrl = `https://api.themoviedb.org/3/discover/movie?with_origin_country=EG&with_original_language=ar&sort_by=popularity.desc&vote_count.gte=30&page=1`;

        const [arabicMoviesRes, internMovieRes] = await Promise.all([
            fetch(arabicUrl, options),
            fetch(intUrl, options)
        ]);
        // console.log(arabicMoviesRes)

        if (!arabicMoviesRes.ok && !internMovieRes.ok) {
            throw new Error("Unable to load the movies 😞")
        }
        const intData = await internMovieRes.json();
        const arabicData = await arabicMoviesRes.json();

        const intMaxPage = Math.min(intData.total_pages || 1, 500)
        const arabicMaxPage = Math.min(arabicData.total_pages || 1, 500)

        const randomInt = Math.floor(Math.random() * intMaxPage) + 1;
        const randomArabic = Math.floor(Math.random() * arabicMaxPage) + 1;

        const intUrlRandom = `https://api.themoviedb.org/3/discover/movie?with_original_language=en&sort_by=popularity.desc&vote_count.gte=700&page=${randomInt}`;

        const arabicUrlRandom = `https://api.themoviedb.org/3/discover/movie?with_origin_country=EG&with_original_language=ar&sort_by=popularity.desc&vote_count.gte=30&page=${randomArabic}`;

        const [arabicMovies, intMovies] = await Promise.all([
            fetch(arabicUrlRandom, options),
            fetch(intUrlRandom, options)
        ]);
        // console.log(arabicUrlRandom)
        if (!arabicMovies.ok && !intMovies.ok) {
            throw new Error("Unable to load the movies 😞")
        }
        const arabData = await arabicMovies.json()
        const interData = await intMovies.json()

        availableMovies = [...arabData.results, ...interData.results]
        const moviebackdrops = availableMovies.filter(movie => movie.backdrop_path && !seenMovieIds.has(movie.id))

        shuffleDeck(moviebackdrops)

        const selectedMovies = moviebackdrops.splice(0, roundLength)

        selectedMovies.forEach(movie => seenMovieIds.add(movie.id))

        movieDeck = selectedMovies.map(formatedObj)
        // console.log(movieDeck)

        if (movieDeck.length > 0) {
            movieElement.src = movieDeck[0].image;
        }


    } catch (err) {
        loaderElement.classList.add('hidden');
        preMovie.classList.add('hidden')

        errorImage.classList.remove('hidden');

        console.error(`Something went wrong: ${err.message}`)
        document.querySelector('.message').textContent = `💢 Something went wrong: ${err.message} 💢`;
    }
};

// Initialize the first round
generateFreshRound();
// movieDeck = movieDeck.slice(0, 15);
// console.log(movieDeck)



let score = 20;
let currentMovie = 1;

let movieAnswer = true

let guess = document.querySelector('.guess');
let showTimeoutId;
let hideTimeoutId;
let highScore = 0;

const totalMovies = 10
movieElement.style.opacity = '0';
// movieElement.src = movieDeck[0].poster_path;
movieElement.style.opacity = '1';

const preMovieAnswer = document.querySelector('.previous-answer');


const previousMovie = function () {
    preMovieAnswer.textContent = movieDeck[0].title;
    preMovie.classList.remove('hidden')

}

let tooltipSuggestion = 0;
const checkGuess = function () {


    // let correctAnswer;

    const userGuess = guess.value.toLowerCase().trim();
    if (movieDeck.length === 0) {
        return;
    }

    if (score <= 0) {
        return;
    }

    if (userGuess === '') {

        document.querySelector('.message').textContent = "Please guess the Movie";

        return;

    }

    const cleanUser = cleanTitle(userGuess)
    const cleanTarget = movieDeck[0].title;
    const altTarget = movieDeck[0].altTitle;

    const correctAnswer = cleanUser === cleanTarget || normalize(cleanUser) === normalize(cleanTarget) || (altTarget && (cleanUser === altTarget || normalize(cleanUser) === normalize(altTarget)));

    if (correctAnswer) {
        hitHint = 0;
        movieYear.classList.add('hidden')
        movieNameHint.classList.add('hidden')
        score += 3;
        document.querySelector('.score').textContent = score;
        // console.log("correct");
        document.querySelector('.message').textContent = "Correct ✨"
        document.querySelector('.message').style.color = '#0fec1a';

        setTimeout(function () {
            document.querySelector('.message').style.color = 'white';
        }, 300);

        // console.log(currentMovie);
        previousMovie();

        guess.value = '';

        movieDeck.shift();


        if (movieDeck.length === 0) {
            // console.log("movie deck reached 0")
            document.querySelector('.message').textContent = "Victory 🎉";
            document.querySelector('.image').src = 'scott.jpg';
            document.querySelector('.image').style.borderColor = '#523fff';

            endGame();

            return;
        }

        // console.log(movieDeck);



        if (movieDeck.length > 0) {

            movieElement.src = movieDeck[0].image;


        }


    }

    else if (!correctAnswer) {
        // console.log("Not correct")
        score -= 2;
        tooltipSuggestion += 1

        if (tooltipSuggestion % 2 == 0) {

            clearTimeout(showTimeoutId)
            clearTimeout(hideTimeoutId)

            showTimeoutId = setTimeout(() => {
                hintW.classList.add('show-tooltip');

            }, 1000)
            hideTimeoutId = setTimeout(() => {
                hintW.classList.remove('show-tooltip');

            }, 3500)
        }
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
            previousMovie()
            document.querySelector('.score').textContent = 0
            movieYear.classList.add('hidden')
            movieNameHint.classList.add('hidden')

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

    if (skipCount === 0) {
        document.body.classList.add('flawless-victory')
        document.body.style.backgroundImage = "url('fireworks.gif')";
        document.body.style.backgroundSize = 'cover';       // Stretches GIF to cover full screen
        document.body.style.backgroundPosition = 'center'; // Centers the GIF
        document.body.style.backgroundRepeat = 'no-repeat';// Prevents repeating tiling
        document.body.style.backgroundAttachment = 'fixed';
        document.querySelector('.image').src = "respect.gif"
        // console.log("flawless")
        document.querySelector('.image').style.borderColor = '#523fff';
        document.querySelector('.message').textContent = "ABSOLUTE CINEMA! 🍿🏆"
        movieYear.classList.add('hidden')
        preMovie.classList.add('hidden')
        // console.log("Down here")

        return
    }
    if (skipCount >= 7) {
        document.querySelector('.image').src = "bahgat.png";
        document.querySelector('.message').textContent = "Lazy playing 🥱... Try harder! "
        // console.log(">=3")
    } else if (skipCount <= 6) {
        document.querySelector('.image').src = "scott.jpg";
        document.querySelector('.message').textContent = "Victory! 🎉"
        console.log("It happened")
        // console.log("skip count is less than 2 or less")
        document.querySelector('.image').style.borderColor = '#523fff';

    }
    if (score > highScore) {
        highScore = score;
        document.querySelector('.highscore').textContent = highScore;
    }
}


const skip = function () {
    if (score <= 0) {
        return
    }
    movieYear.classList.add('hidden')
    movieNameHint.classList.add('hidden')
    hintW.classList.remove('show-tooltip');

    if (movieDeck.length === 0) {

        // console.log("End of images");

        return;

    }
    // endGame();
    hitHint = 0;
    if (score === 0) {

        return;
    }
    score -= 2;
    skipCount++;
    document.querySelector('.score').textContent = score;
    preMovieAnswer.textContent = movieDeck[0].title;
    preMovie.classList.remove('hidden')


    // next image

    // console.log(skipCount);
    guess.value = '';
    document.querySelector('.message').textContent = "Skipped";
    document.querySelector('.message').style.color = '#ff4a4a';
    setTimeout(

        function () {

            document.querySelector('.message').style.color = 'white';

        }, 500);

    movieDeck.shift();
    if (score <= 0) {

        if (skipCount === totalMovies) {
            document.querySelector('.image').src = "sandwich.gif";
            document.querySelector('.message').textContent = "Did you even try? 🙄"

            // console.log("skip = 5")
            // return console.log("Skip 2 is working");
        } else {
            document.querySelector('.image').src = "damn.jpg";
            document.querySelector('.message').textContent = "DAMN!";
            document.querySelector('.new').textContent = "DAMN!";
        }
        document.querySelector('.score').textContent = 0
        return;
    }

    if (movieDeck.length > 0) {

        movieElement.src = movieDeck[0].image;

    }

    else {
        endGame();

    }


};



document.querySelector('.skip').addEventListener('click', skip);

const newGame = function () {
    // reset scores, highscore, score
    score = 20;
    skipCount = 0;
    document.querySelector('.score').textContent = score;
    document.querySelector('.highscore').textContent = highScore;
    document.querySelector('.new').textContent = "🎟 New Game!";

    // console.log("New game is working");
    document.querySelector('.message').textContent = "Start guessing...";
    document.querySelector('.image').style.borderColor = '#ffffff';
    guess.value = '';
    //reset images


    generateFreshRound();
    // console.log(movieDeck);
    // movieElement.src = movieDeck[0].image;

    // console.log(movieDeck)
}

document.querySelector('.new').addEventListener('click', newGame);



document.querySelector('.hint-wrapper').addEventListener('click', function () {
    hintW.classList.remove('show-tooltip');
    if (movieDeck.length === 0) {
        return
    }
    if (hitHint >= 3 || score <= 0) return;

    hitHint++;
    preMovie.classList.add('hidden');
    const title = movieDeck[0].title;

    const createMask = (title) => {
        const firstChar = title[0]
        const rest = title.slice(1)

        const maskedRest = rest.replace(/\S/g, '-')
        return firstChar + maskedRest
    }


    const createMask2 = (title) => {
        const firstChar = title[0]

        const secondChar = title[1]
        const rest = title.slice(2)
        const maskedRest = rest.replace(/\S/g, '-')
        return firstChar + secondChar + maskedRest
    }

    if (hitHint === 1) {
        score -= 1;
        movieYear.classList.remove('hidden')
        document.querySelector('.year-answer').textContent = movieDeck[0].date.split('-')[0];

    }

    if (hitHint === 2) {
        score -= 1;
        movieNameHint.classList.remove('hidden')
        document.querySelector('.name-answer').textContent = createMask(title);
    }

    if (hitHint === 3) {
        score -= 2;
        document.querySelector('.name-answer').textContent = createMask2(title);
    }

    document.querySelector('.score').textContent = score;

    if (score <= 0) {
        movieYear.classList.add('hidden')
        movieNameHint.classList.add('hidden')
        preMovie.classList.remove('hidden')
        preMovieAnswer.textContent = movieDeck[0].title;
        document.querySelector('.score').textContent = 0;
        document.querySelector('.image').src = 'middle.gif'
        document.querySelector('.message').textContent = "Congratulations, you bought your own defeat! 🛍️📉"

        return;
    }
    // previousMovie();


})