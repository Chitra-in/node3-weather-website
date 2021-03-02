const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
const messageThree=document.querySelector('#message-3')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const location = search.value
    
    messageOne.textContent=''
    messageTwo.textContent=''
    messageThree.textContent=''

    fetch('http://localhost:3000/weather?search='+location).then((response) => {
        response.json().then((data)=>{
            if(data.error){
                messageTwo.textContent=data.error
                }else{
               // messageOne.textContent=data.address,
                messageThree.textContent=data.place_name,
                messageTwo.textContent=data.forecast
                }
          
        })
    })

})