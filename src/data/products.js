export function fetchProducts(){
  return new Promise(resolve => {
    setTimeout(() =>{
      resolve([
        {id:1, title: "Macbook", price: 1999},
        {id:2, title: "Iphone", price: 899},
        {id:3, title: "Airpods", price: 249},
        {id:4, title: "Ipad", price: 1299}
      ])
    }, 2000)
  })
}