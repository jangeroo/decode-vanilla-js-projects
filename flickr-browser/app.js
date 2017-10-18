var FLICKR_API_URL = `https://api.flickr.com/services/rest`
var FLICKR_API_PARAMS = `method=flickr.photos.search&format=json&nojsoncallback=1`
var API_KEY = `fc042f8aa30bb1940a5362baca37fed8`
// `https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=${API_KEY}&text=${query}`
var FLICKR_API_QUERY_URL = `${FLICKR_API_URL}/?${FLICKR_API_PARAMS}&api_key=${API_KEY}`

var pageCounter = 1
var totalPages
function getPhotosForSearch(query, page) {
    // console.log(`fetching photos from flickr that match '${query}'...`)
    var request = `${FLICKR_API_QUERY_URL}&text=${query}&page=${page}`
    // console.log(request)

    return (fetch(request)
        .then(response => {
            console.log('RESPONSE')
            console.log(response)
            return response.json()
        })
        // .then(whatever => console.log(whatever))
        .then(data => {
            console.log('DATA')
            console.log(`TOTAL PAGES: ${data.photos.pages}`)
            console.log(data)
            totalPages = data.photos.pages
            return data.photos.photo
        })
        /* This extracts each photo as an object with the following properties
        {
            farm: 5,
            id: "37709427306",
            isfamily: 0,
            isfriend: 0,
            ispublic: 1,
            owner: "99601760@N07",
            secret: "7439dbcb32",
            server: "4493",
            title: "Rose"
        } */
        .then(photoData => {
            console.log('PHOTODATA')
            console.log(photoData)
            return photoData.map(photo => {
                return {
                    thumb: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_s.jpg`,
                    large: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
                    title: photo.title
                }
            })
        })
    )
}

function searchAndDisplayPhotos(query, infinite) {
    console.log(`searching for photos matching: ${query}`)
    getPhotosForSearch(query)
    .then(photos => {
        // console.log(photos)
        if (!infinite) {
            gallery.innerHTML = ''
        }
        photos.forEach(photo => {
            gallery.appendChild(createFlickrThumb(photo))
            // console.log(photo)
        })
    })
}

function createFlickrThumb(photoData) {
    // Returns an element that looks like this:
    // <a href="URL OF THE LARGE IMAGE" target="_blank">
    //     <img src="URL OF THE THUMBNAIL" alt="TITLE OF THE IMAGE">
    // </a>

    var link = document.createElement('a')
    link.href = photoData.large
    link.target = "_blank"

    var thumb = document.createElement('img')
    thumb.src = photoData.thumb
    thumb.alt = photoData.title
    
    link.appendChild(thumb)

    return link
}


var app = document.querySelector('#app')
var gallery = app.querySelector('#gallery')
var searchForm = app.querySelector('.search-form')
var searchInput = app.querySelector('.search-input')

var query

searchForm.addEventListener('submit', function() {
    event.preventDefault()
    
    query = searchInput.value
    gallery.innerHTML = `Loading images matching '${query}'...`
    searchAndDisplayPhotos(query)
})

document.addEventListener('scroll', function () {
    var scrollHeight = document.documentElement.scrollHeight
    var scrollTop = document.documentElement.scrollTop
    var clientHeight = document.documentElement.clientHeight
    if (scrollHeight == (scrollTop + clientHeight)) {
        // alert(`Bottom! Query is still: ${query}`);
        searchAndDisplayPhotos(query, infinite=true)
    }
});