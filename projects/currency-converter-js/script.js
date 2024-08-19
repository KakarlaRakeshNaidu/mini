const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

//add all countries in select dropdwon
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.val = currCode;
        //when app is opened USD &INR should appear
        if (select.name === "from" && currCode === "USD")
            newOption.selected = "selected";
        if (select.name === "to" && currCode === "INR")
            newOption.selected = "selected";
        select.append(newOption);
    }
    //wrt option falg is also need to be changed
    select.addEventListener("change", (evt) => { //evt is event object
        updateFlag(evt.target);//returns the element where event occcured ,here event occured on "select" element
    })
}

const updateFlag = (element) => {
    //extract currCOde
    let currCode=element.value;
    //country code
    let countryCode=countryList[currCode];
    //change flag url
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    //update url of img
    //to access img ,element=select ,element's parent is "select-container" & img parent also "select-container" .so, by parent img is accessed
    let img=element.parentElement.querySelector("img");
    if(img)
    img.src=newSrc;
}
const updateExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input");//access input
    let amtVal=amount.value;//amount value =100 or 200 etc
    if(amtVal=== "" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
   
    const URL = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;//currency is excahnged using currency api(this api works on lowercase so change uppercase int lowercase)
     //responce is taken from currency api using fetch api 
     let responce=await fetch(URL);
    let data = await responce.json();
    //converted rate is tocurr in data
    let rate=data[toCurr.value.toLowerCase()];

    let finalAmt=rate*amtVal;

    //display  msg like 1USD=80INR
    msg.innerText=`${amtVal} ${fromCurr.value} =${finalAmt} ${toCurr.value}`;
}
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();//by default in form button is clicked it refreshes the page and in url it shows form to prevent those defaults
    //btn is clicked ,amount is need to be exchanged
    updateExchangeRate();
    
})

//when page loads ,in msg it should display some correct default value like 1usd=80.989INR
window.addEventListener("load", async (evt)=>{
    updateExchangeRate();
})
