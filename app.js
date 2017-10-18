// document.querySelector('#app').style.height = '400px'

// document.querySelector('#app').style.backgroundColor = '#ccc'

// document.body.addEventListener('click', function() {
//     console.log('The body was clicked')
// })

// document.querySelector('#app').addEventListener('click', function() {
//     console.log('#app was clicked')
// })

// document.querySelector('#theParagraph').addEventListener('click', function() {
//     console.log('#theParagraph was clicked')
//     event.stopPropagation()
// })

// document.querySelector('#theLink').addEventListener('click', function() {
//     event.preventDefault()
//     console.log('#theLink was clicked')
// })


// var listItems = document.querySelectorAll('#theList li')

// // Array.prototype.forEach.call(listItems, function(listItem) {
// //     listItem.addEventListener('click', function() {
// //         console.log('You clicked on: ' + this.innerText)
// //     })
// // })
// var theList = document.querySelector('#theList')
// theList.addEventListener('click', function(event) {
//     if (event.target.parentNode == theList) {
//         console.log('You clicked on: ' + event.target.innerText)
//     }
// })

fetch('https://www.reddit.com/r/montreal.json')
.then(function(response) {
    return response.json()
})
.then(function(jsonResponse) {
    jsonResponse.data.children
    .map(function(post) {
        post = post.data
        var linkBox = document.createElement('p')

        var link = document.createElement('a')
        link.setAttribute('href', post.url)
        link.setAttribute('target', '_blank')
        link.innerText = post.title

        linkBox.appendChild(link)

        return linkBox
    })
    .forEach(function(linkParagraph) {
        document.body.appendChild(linkParagraph)
    })
})