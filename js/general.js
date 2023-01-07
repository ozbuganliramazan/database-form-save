
const nameLabel=document.getElementById("nameLabel")
const nameInput=document.getElementById("name")

const surnameLabel=document.getElementById("surnameLabel")
const surname=document.getElementById("surname")

const emailLabel=document.getElementById("emailLabel")
const email=document.getElementById("email")

const messageLabel=document.getElementById("messageLabel")
const message=document.getElementById("message")


const contactForm=document.getElementById("contactForm")

const emailError=document.getElementById("emailError")
const messageError=document.getElementById("messageError")


const responseContainer=document.getElementById("responseContainer")
const submitBtn=document.getElementById("submitBtn")
const responseText=document.getElementById("responseText")


const closeResponse=document.getElementById("closeResponse")


nameInput.addEventListener('focusin',()=>{
    nameLabel.style.color='#000'
})

nameInput.addEventListener('focusout',()=>{
    nameLabel.style.color="#777"
})

surname.addEventListener('focusin',()=>{
    surnameLabel.style.color="#000"

})
surname.addEventListener('focusout',()=>{
    surnameLabel.style.color="#777"
})


email.addEventListener('focusin',()=>{
    emailLabel.style.color="#000"
})
email.addEventListener('focusout',()=>{
    emailLabel.style.color="#777"
    emailError.innerText=""
})
message.addEventListener('focusin',()=>{
    messageLabel.style.color="#000"
})
message.addEventListener('focusout',()=>{
    messageLabel.style.color="#777"
    messageError.innerText=""
})


contactForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    if(email.value === ""){
    emailError.innerText="* Email alanı boş olamaz"
    email.focus()
    return
    }
    if(message.value === ""){
        messageError.innerText="* Mesaj alanı bırakılamaz "
        message.focus()
        return
    }
    const newForm={
        name:nameInput.value,
        surname:surname.value,
        email:email.value,
        message:message.value,
        date:new Date()
    }

     submitBtn.disabled = true
     submitBtn.classList.replace("submitBtnActive","submitBtnDisabled")
     submitBtn.innerText="Gönderiliyor..."

    fetch("http://localhost:3004/add-form",{
        method:'post',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        body:JSON.stringify(newForm)
    })
    .then((res)=>res.json())
    .then((data)=>{
    console.log(data);
    if(data.status === 200){
     responseContainer.style.display="block"
     responseContainer.classList.add("responseSuccess")
     responseText.innerText="Formunuz Başarıyla Gönderildi"
     
    }

    })
    .catch((err)=>{
        console.log(err);
        responseContainer.style.display="block"
        responseContainer.classList.add("responseFail")
        responseText.innerText="Formunuzu Gönderirken Bir Hata Oluştu"
    })
})

closeResponse.addEventListener("click",()=>{
    responseContainer.style.display="none"
        responseContainer.classList.remove("responseSuccess")
        responseText.innerText=""
        submitBtn.disabled=false
        submitBtn.classList.replace("submitBtnDisabled","submitBtnActive")
        submitBtn.innerText="Gönder"
        nameInput.value=""
        surname.value=""
        email.value=""
        message.value=""
});