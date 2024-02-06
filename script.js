const movieContainer = document.querySelector('.movie-container')
const movieContent = document.querySelector('.movie-content')
const movieMainContent = document.querySelector('.content')

const moviePoster = document.getElementById('poster')
const movieTitle = document.getElementById('movie-title')
const movielanguage = document.getElementById('language')
const movieDirector = document.getElementById('director')
const movieWriters = document.getElementById('writers')
const movieActors = document.getElementById('actors')
const rating = document.querySelector('.rating')
const year = document.querySelector('.year')
const review = document.querySelector('.review')
const plot = document.querySelector('.plot')


const searchBtn = document.querySelector('.btn')
const userInput = document.getElementById('moviename')
const err = document.querySelector('.error')

searchBtn.addEventListener('click', movieAPI)

userInput.addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        movieAPI()
    }
})


async function movieAPI() {
    const movieName = userInput.value

    if (movieName == "") {
        err.innerHTML = `<span>Please Enter the Movie Name!!!</span>`
        err.classList.add('fade-in')
        movieContainer.style.maxHeight = "150px"
        movieContainer.classList.add('responsiveLessthan450PX')
        movieMainContent.remove()
        movieContent.appendChild(err)
    }

    else {

        const APIKey = `1ed153eb`
        const APIURL = `http://www.omdbapi.com/?t=${movieName}&apikey=${APIKey}`
        const fetchingFromAPI = await fetch(APIURL)
        const responseFromAPI = await fetchingFromAPI.json()

        if (responseFromAPI.Response == "False") {
            err.innerHTML = `<span>Movie Not Found!!</span>`  // responseFromAPI.Error <-- this is another way to get this msg to display
            err.classList.add('fade-in')
            movieContainer.style.maxHeight = "150px"
            movieContainer.classList.add('responsiveLessthan450PX')
            movieMainContent.remove()
            movieContent.appendChild(err)
        }

        else {

            err.remove()
            movieContent.appendChild(movieMainContent)
            movieMainContent.classList.add('fade-in')
            moviePoster.classList.add('img')
            movieContainer.style.maxHeight = "1200px"
            moviePoster.src = `${responseFromAPI.Poster}`
            movieTitle.textContent = responseFromAPI.Title.trim()

            movielanguage.innerHTML = `
                    <h3 class="heading">Language :</h3>
                    <p>${responseFromAPI.Language.trim()}</p>
            `
            movieDirector.innerHTML = `
                    <h3 class="heading">Director :</h3>
                    <p>${responseFromAPI.Director.trim()}</p>

            `
            movieWriters.innerHTML = `
                    <h3 class="heading">Writers :</h3>
                    <p class="writer">${responseFromAPI.Writer}</p>
            `
            rating.innerHTML = `
                    <i class="fa-solid fa-star"></i>
                    <span>${responseFromAPI.imdbRating}</span>
            `
            year.innerHTML = `
                    <span class="tv">${responseFromAPI.Rated}</span>
                    <span class="movie-year">${responseFromAPI.Released}</span>
                    <span class="na">${responseFromAPI.Metascore}</span>
            `
            plot.innerHTML = `
                    <h2>Plot :</h2>
                    <p class="plot">${responseFromAPI.Plot}</p> 
            `
            movieActors.innerHTML = `
                    <h2 class="heading">Cast :</h2>
                    <p>${responseFromAPI.Actors}</p>
            `
            const reviewGenres = responseFromAPI.Genre.split(",")

            if (review.innerHTML == "") {
                reviewFunction()
            }
            else {
                review.innerHTML = ""
                reviewFunction()
            }

            function reviewFunction() {
                reviewGenres.forEach((value) => {
                    review.innerHTML += `
                        <button class="genre">${value.trim()}</button>
                    `
                })
            }

        }

    }

}

