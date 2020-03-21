(function () {
  const BASE_URL = 'https://lighthouse-user-api.herokuapp.com/'
  const INDEX_URL = BASE_URL + 'api/v1/users/'
  const data = []
  const dataPanel = document.getElementById('data-panel')
  const modalName = document.getElementById('show-user-name')
  const modalAvatar = document.getElementById('show-user-avatar')
  const modalDetail = document.getElementById('show-user-detail')

  axios.get(INDEX_URL)
    .then((response) => {
      data.push(...response.data.results)
      console.log(data)
      displayDataList(data)
    })
    .catch((error) => console.log(error))
  
  dataPanel.addEventListener('click', (event)=>{
    if (event.target.matches('.btn-show-user')){
      console.log(event.target)
      console.log(event.target.parentElement.dataset.id)
      showPerson(event.target.parentElement.dataset.id)
    }
  })
  
  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-1" data-id="${item.id}">
            <img class="card-img-top btn-show-user" src="${item.avatar}" alt="Card image cap" data-toggle="modal" data-target="#show-movie-modal">
              <h6 class="card-title">${item.name} ${item.surname}</h6>
          </div>
        </div>  
      `
    })
    dataPanel.innerHTML = htmlContent
  }

  function showPerson(id){
    const USER_URL = INDEX_URL +id
    console.log(USER_URL)

    axios.get(USER_URL).then((response=>{
      const data = response.data

      modalName.textContent = `Name detail`
      modalAvatar.innerHTML = `<img src="${data.avatar}" class="img-fluid" alt="Responsive image">`
      modalDetail.innerHTML = `<h4 class="col-sm-12 text-monospace">${data.name} ${data.surname}</h4>
          <div class="userInfo text-monospace">
            <i class="fas fa-map-marker-alt"> &nbsp;From: ${data.region}</i><br>
            <i class="fas fa-birthday"> &nbsp;Birthday: ${data.birthday}</i><br>
            <i class="fas fa-age"> &nbsp;Age: ${data.age}</i><br>
            <i class="fas fa-envelope"> &nbsp;Email: ${data.email}</i>    
          </div>  `
    }))
    .catch((error)=>console.log(error))
  }

})()