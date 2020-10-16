//Create map
const map = L.map('mapid').setView([-27.2091294,-49.6379171], 15);

// Create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//Create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170,2]
})

let marker;

//Create and add marker
map.on('click',(event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector('[name=lat]').value = lat;
  document.querySelector('[name=lng]').value = lng;

  // Remove icon
  marker && map.removeLayer(marker)

  // Add icon layer
  marker = L.marker([lat, lng], {icon})
  .addTo(map)
})

//Add photos field
function addPhotoField() {
  //Pegar o container de fotos #images
  const container = document.querySelector('#images')
  //Pegar o container para duplicar .new-image
  const fieldsContainer = document.querySelectorAll('.new-upload')
  //Realizar o clone da última imagem adicionada
  const newFieldContainer = fieldsContainer[fieldsContainer.length-1].cloneNode(true)
  //Verificar se o campo está vazio, se sim, não adicionar ao container de imagens
  const input = newFieldContainer.children[0]
  if(input.value == ""){
    return
  }
  //Limpar o campo antes de adicionar ao container de imagens
  input.value = ""
  //Adicionar o clone ao container de #images
  container.appendChild(newFieldContainer)
}

function deleteField(event){
  const span = event.currentTarget
  const fieldsContainer = document.querySelectorAll('.new-upload')
  if(fieldsContainer.length <= 1){
    //Limpar o valor do campo
    span.parentNode.children[0].value = ""
    return
  }
  //Remover o campo
  span.parentNode.remove()
}

//Select yes or no
function toggleSelect(event){
  //Retirar a classe .active dos botões
  /* Quando a função tem apenas 1 linha pode remover as {} e quando tem só 1 argumento pode remover os () */
  document.querySelectorAll('.button-select button')
  .forEach(button => button.classList.remove('active'))
  //Colocar a classe .active no botão clicado
  const button = event.currentTarget
  button.classList.add('active')
  //Atualizar o meu input hidden com o valor selecionado
  const input = document.querySelector('[name="open_on_weekends"]')
  //Verificar se é sim ou não
  input.value = button.dataset.value
}

//Validar se marcou um lugar no mapa
function validate(event) {
   if(document.querySelector('[name=lat]').value == '' || document.querySelector('[name=lng]').value == ''){
    event.preventDefault()
    alert('Selecione um ponto no mapa')
   }
}