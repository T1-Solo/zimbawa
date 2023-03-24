let zimbawa = products.slice(0, 2);
let template = renderElement("template").content;
let wrapper = renderElement(".parrots-wrapper");
let locals_tem = renderElement(".locals_tem").content;
let locals_ul = renderElement(".locals_ul");
let LocalsArray = [];
let form_1 = renderElement(".form_1");
let search = elementId("search");
let form_2 = renderElement(".form_2")
let parrotTitle = elementId("parrot-title")
let price = elementId("price")
let parrotDate = elementId("parrot-date")
let parrot_width = elementId("parrot_width")
let parrot_height = elementId("parrot_height")
let features = elementId("features")
let from = elementId("from");
let to = elementId("to");
let from_width = elementId("from_width")
let to_width = elementId("to_width")
let from_height = elementId("from_height")
let to_height = elementId("to_height")
let sortby = elementId("sortby")
const date = new Date()

const handleRemove = (event) => {
  locals_ul.innerHTMl = null
  let id = event.target.dataset.id - 0
  let parse = JSON.parse(window.localStorage.getItem("zimbawa"))
  parse.map((item, index) => {
    if (item.id === id) {
      parse.splice(index, 1)
      window.localStorage.setItem("zimbawa", JSON.stringify(parse))
      let parent = event.target.parentNode
      parent.remove() 
    }
  });
};
const handleLocals = (event) => {
  locals_ul.innerHTMl = null
  let id = Number(event.target.dataset.id)
  for (let i = 0; i < zimbawa.length; i++) {
    if (zimbawa[i].id === id) {
      if (!LocalsArray.includes(zimbawa[i])) {
        LocalsArray = [...LocalsArray, zimbawa[i]]
        window.localStorage.setItem("zimbawa", JSON.stringify(LocalsArray))
        let parse = JSON.parse(window.localStorage.getItem("zimbawa"))
        LocalsRender(parse)
        LocalsWindow()
      }
    }
  }
};
function LocalsRender(arr) {
  return arr
}
function LocalsWindow() {
  locals_ul.innerHTMl = null
  let result = LocalsRender(JSON.parse(window.localStorage.getItem("zimbawa")))
  if (result !== null) {
    for (i = 0; i < result.length; i++) {
      let clone = locals_tem.cloneNode(true)
      let name_locals = clone.querySelector(".name_locals")
      name_locals.textContent = result[i].title
      let remove_btn = clone.querySelector(".remove_btn")
      remove_btn.addEventListener("click", handleRemove)
      remove_btn.dataset.id = result[i].id
      locals_ul.appendChild(clone)
    }
  }
}
LocalsWindow();
const Errors = () => {
  wrapper.innerHTMl = null;
  let h1 = createTag("h1");
  h1.textContent = "Topilmadi";
  wrapper.appendChild(h1);
}

const renders = (arr) => {
  // if (arr.length > 0) {
    wrapper.innerHTML = null
    for (let i = 0; i < arr.length; i++) {
      let clone = template.cloneNode(true);
      let img = clone.querySelector("img");
      img.src = arr[i].img;
      let title = clone.querySelector(".title");
      title.textContent = arr[i].title;
      let price = clone.querySelector(".price mark");
      price.textContent = arr[i].price + "$";
      let width_height = clone.querySelector(".width_height");
      width_height.textContent = arr[i].sizes.width + "x" + arr[i].sizes.height;
      let date = clone.querySelector(".date");
      date.textContent = arr[i].birthDate;
      let icon_btn = clone.querySelector(".icon_button");
      icon_btn.dataset.id = arr[i].id;
      icon_btn.addEventListener("click", handleLocals);
      if (arr[i].isFavorite === false) {
        let icon = icon_btn.querySelector(".star")
        icon.className = "fa fa-star-o"
      } else if (arr[i].isFavorite === true) {
        let icon = icon_btn.querySelector(".star")
        icon.className = "fa-solid fa-star"
      }
      wrapper.appendChild(clone);
    }
  // } else {
  //   Errors();
  // }
};
renders(zimbawa);
window.addEventListener("click", (event) => {
  if (event.target.matches(".delete_zimbawa")) {
    let parent_remov = event.target.parentNode;
    let parent = parent_remov.parentNode;
    let ota = parent.parentNode.parentNode;
    ota.remove();
  }
});

let birth  =(date) =>{
  return new Date(date)
}
let sortObject = {
  name(a,b){
    if(a.title < b.title){
      return -1
    }else{
      return 1
    }
  },
  price_lowest(a,b){
    if(a.price < b.price){
      return -1
    }else{
      return 1
    }
  },
  price_hightes(a,b){
    if(a.price > b.price){
      return -1
    }else{
      return 1
    }
  },
  birth_heights(a,b){
    if(birth(a.birthDate) < birth(b.birthDate)){
      return -1
    }else {
      return 1
    }
  },
  birth_lowes(a,b) {
    if(birth(a.birthDate) > birth(b.birthDate)){
      return -1
    }else {
      return 1
    }
  }
}


const handleClick = (event) => {
    event.preventDefault()
    let rejex = new RegExp(search.value , "gi")
    let filter = []
    if(search.value !== "all"){
      filter = zimbawa.filter((item) => item.title.match(rejex))
    }else {
      filter = zimbawa
    }
    if(from.value !== null && to.value !== null){
      filter = zimbawa.filter((item) => item.price > from.value )
      filter.filter((item) => item.price < to.value)
    } 
    
    if(from_width.value !== null && to_width.value !== null){
      filter = zimbawa.filter((item) => item.sizes.width > Number(from_width.value-0 ))
      filter = filter.filter((item) => item.sizes.width < Number(to_width.value-0))
      console.log(filter) 
    }
    renders(filter)
}
form_1.addEventListener("click" , handleClick)

const handleAdd = (event)  =>{
  event.preventDefault()
let obj = [
{
    id: 1,
    title: parrotTitle.value,
    img: "https://media.istockphoto.com/photos/parrot-hyacinth-macaw-picture-id1359443019?b=1&k=20&m=1359443019&s=170667a&w=0&h=dteRZ9bM7sEvBbFE9it1r9O7IxlILXb1UnSoLNEVMAg=",
    price: price.value,
    birthDate: parrotDate.value,
    sizes: {
      width: parrot_width.value,
      height: parrot_height.value
    },
    isFavorite: false,
    features: features.value
  
},
]
  for(let i = 0 ; i<obj.length ; i++){
    zimbawa =[...zimbawa, obj[i]]
  }
  renders(zimbawa)
  console.log(zimbawa);
}
form_2.addEventListener("click" , handleAdd)