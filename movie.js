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

const shuffleDeck = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const cleanTitle = (str) => {
    return str
        .toLowerCase()

        .replace(/[-_:/!?]/g, ' ')
        .replace(/[أإآ]/g, 'ا')
        .replace(/[.\-_:/!?،,]/g, ' ')
        .replace(/ة/g, "ه")
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
        .replace('.', '')
        .replace(/\s+/g, ' ')
        .trim()




}

const normalize = str => {
    const hasLetters = /[a-zA-Z\u0600-\u06FF]/.test(str);
    if (hasLetters) {
        return str.replace(/\s?\d+$/g, '').replace('&', 'and').trim()
    }
    return str;
}


const formatedObj = function (movie) {
    const rawTitle = movie.original_language === "ar" ? (movie.original_title || movie.title) : movie.title;

    const shortTitle = rawTitle.split(':')[0].split('(')[0].split(')')[0];

    return {
        title: cleanTitle(shortTitle),
        image: `https://image.tmdb.org/t/p/w1920${movie.backdrop_path || movie.poster_path}`

    }

}
const movieElement = document.querySelector('.image');
const loaderElement = document.querySelector('.loader');
const errorImage = document.querySelector('.error-image');
const checkButton = document.querySelector('.check');

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
        loaderElement.classList.remove('hidden');
        movieElement.classList.add('hidden');
        preMovie.classList.add('hidden');
        errorImage.classList.add('hidden');
        movieDeck = [];
        const roundLength = 10;


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
        console.log(movieDeck)

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

let highScore = 0;
let skipCount = 0;
const totalMovies = 5
movieElement.style.opacity = '0';
// movieElement.src = movieDeck[0].poster_path;
movieElement.style.opacity = '1';

const preMovieAnswer = document.querySelector('.previous-answer');

const previousMovie = function () {
    preMovieAnswer.textContent = movieDeck[0].title;
    preMovie.classList.remove('hidden')

}

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

    const correctAnswer = cleanUser === cleanTarget || normalize(cleanUser) === normalize(cleanTarget)

    if (correctAnswer) {

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
            preMovieAnswer.textContent = movieDeck[0].title;
            preMovie.classList.remove('hidden')

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
        // console.log("skip = 5")
        // return console.log("Skip 2 is working");
    } else if (skipCount >= 6) {
        document.querySelector('.image').src = "bahgat.png";
        document.querySelector('.message').textContent = "Lazy playing 🥱... Try harder! "
        // console.log(">=3")
    } else {
        document.querySelector('.image').src = "scott.jpg";
        document.querySelector('.message').textContent = "Victory! 🎉"
        // console.log("skip count is less than 2 or less")
        document.querySelector('.image').style.borderColor = '#523fff';

    }
    if (score > highScore) {
        highScore = score;
        document.querySelector('.highscore').textContent = highScore;
    }
}


const skip = function () {


    if (movieDeck.length === 0) {

        // console.log("End of images");

        return;

    }
    if (score === 0) {

        return;
    }
    score -= 2;
    document.querySelector('.score').textContent = score;
    preMovieAnswer.textContent = movieDeck[0].title;
    preMovie.classList.remove('hidden')

    if (score === 0) {

        document.querySelector('.image').src = "damn.jpg";
        document.querySelector('.message').textContent = "DAMN!";
        document.querySelector('.new').textContent = "DAMN!";

        return;
    }
    // next image
    skipCount++;
    // console.log(skipCount);
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