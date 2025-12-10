const search_input = document.getElementById('search')
const search = document.getElementById('searchBtn')
const reset = document.getElementById('resetBtn')
const result_content = document.getElementById('content-blank')

function fetchApi(input) {
    fetch('./travel_recommendation_api.json')
        .then((response) => response.json())
        .then((data) => {
            result = data[input]
            console.log(result)

            if (input === "countries") {
                result = result.flatMap(country => country.cities);
            }
            console.log(result)

            result_content.innerHTML = result
                .map(element => {
                    console.log(element)
                    return `<div class="search-card"><img src="${element.imageUrl}" class="content-img" alt=""><h3 class="name">${element.name}</h3><p class="desc">${element.description}</p><button type="submit" class="role-btn">Visit</button></div>`
                }).join('')
        })
        .catch(err => { console.log(err.message) })
}

function searchBtn() {
    let input = search_input.value.toLowerCase()
    if (input === "beach" || input === "beaches") { fetchApi("beaches") }
    if (input === "temple" || input === "temples") { fetchApi("temples") }
    if (input === "country" || input === "countries") { fetchApi("countries") }
}

function resetBtn() {
    search_input.value = ""
    result_content.innerHTML = ''
}