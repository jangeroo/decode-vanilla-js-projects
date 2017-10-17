var FLICKR_API_URL = `https://api.flickr.com/services/rest`
var FLICKR_API_PARAMS = `method=flickr.photos.search&format=json&nojsoncallback=1`
var API_KEY = `fc042f8aa30bb1940a5362baca37fed8`
// `https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=${API_KEY}&text=${query}`
var FLICKR_API_QUERY_URL = `${FLICKR_API_URL}/?${FLICKR_API_PARAMS}&api_key=${API_KEY}`


function getPhotosForSearch(query) {
    // console.log(`fetching photos from flickr that match '${query}'...`)
    var request = `${FLICKR_API_QUERY_URL}&text=${query}`
    // console.log(request)

    return (fetch(request)
        .then(response => response.json())
        .then(data => data.photos.photo)
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
        .then(photoData => photoData.map(photo => {
            return {
                thumb: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_s.jpg`,
                large: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
                title: photo.title
            }
        }))
    )
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

searchForm.addEventListener('submit', function() {
    event.preventDefault()
    
    var query = searchInput.value
    gallery.innerHTML = `Loading images matching '${query}'`
    getPhotosForSearch(query)
    .then(photos => {
        // console.log(photos)
        gallery.innerHTML = ''
        photos.forEach(photo => {
            gallery.appendChild(createFlickrThumb(photo))
            // console.log(photo)
        })
    })
})