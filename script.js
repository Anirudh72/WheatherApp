const yourbtn=document.querySelector("[data-yourbtn]");
const seartchbtn=document.querySelector("[ data-seartchbtn]");

const form=document.querySelector("[data-searchform]");

const grant=document.querySelector(".grant-container");

const discription=document.querySelector(".discription-container");

const loder=document.querySelector(".loading-container");

// function seartchclick(){
//     console.log("clicked");
//     form.classList.add("active");

// }

// function yourclick(){
//     form.classList.remove("active"); 
// }

// seartchbtn.addEventListener('click',()=>{
//     form.classList.add("active");
// });


// yourbtn.addEventListener('click',()=>{
//     form.classList.remove("active")

// });

  let currentTab= yourbtn;
  grant.classList.add("active");
  let API_KEY="5aba1df4dfd662bb4790b2cff4f475e4" ;
  currentTab.classList.add("current-tab");
  getfromsessionstorage();



    function swithTab(clicktab){
        if(clicktab!=currentTab){
        currentTab.classList.remove("current-tab");
        currentTab=clicktab;
        currentTab.classList.add("current-tab");


        // agar tab switch ho gaya hai matlab humhe form container visisbal karna padega...... ye condition isliye hai agar hum return  yourbtn 
          //  pe  chale gaye  toh  function phir se starting se execute hoga tab ye wali condition check nahi hogi (kyu ki us time form container me active pade rahega)  phir else wala part execute hoga
        if(!form.classList.contains("active")){
          
            grant.classList.remove("active");
            discription.classList.remove("active");
            form.classList.add("active");
        }

        else{

            //mai pahile seratch wale tab pe the ab seartch wala tab visibale karna hai
            form.classList.remove("active");
            discription.classList.remove("active");
            getfromsessionstorage();


        }


 

        }
    }



  yourbtn.addEventListener("click",()=>{
    swithTab(yourbtn);
  });

  seartchbtn.addEventListener("click",()=>{
    swithTab(seartchbtn);
  })



  // sessionstorage function declearation 


  function getfromsessionstorage(){
    const localcoordinates=sessionStorage.getItem("user-coordinates");

    if(!localcoordinates){
      grant.classList.add(".active");
    }

    else{
     const coordintes=JSON.parse(localcoordinates);
      fetchwetherinfo(coordintes);

    }
  }




   async  function fetchwetherinfo(coordintes){
    if (!coordintes) {
      console.error('Coordinates are not available');
      return; // Exit the function if coordintes is null
  }
    const {lat,lon}= coordintes;
    // grant locatinon wale container ko remove karna padega
    grant.classList.remove(".active");

    // loder wale container ko visibal karne padega jab tak api call ho raha hai
    loder.classList.add("active");

    // api call
      
    try{
      const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const data= await response.json();
    loder.classList.remove("active");
    discription.classList.add("active"); 
     randarinfo(data);
    }
   
    catch (err){

    }


  }


  function randarinfo(weatherInfo){

    const placename=document.querySelector("[data-name]");
    const countryflag=document.querySelector("[data-flag]");
    const climatetype=document.querySelector("[data-climate]");
    const climatetypeimage=document.querySelector("[data-climateimage]");
    const climatedegree=document.querySelector("[data-indegree]");
    const WINDSPEED=document.querySelector("[data-windspeed]");
    const HUMIDITYSPEED=document.querySelector("[data-humidity]");
    const CLOUDESPED=document.querySelector("[data-cloude]");



    placename.innerText=weatherInfo?.name;
    countryflag.src= `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    climatetype.innerText=weatherInfo?.weather?.[0]?.description;
    climatetypeimage.src=`http://openweathermap.org/ing/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    climatedegree.innerText=weatherInfo?.main?.temp;
    WINDSPEED.innerText=weatherInfo?.wind?.speed;
    HUMIDITYSPEED.innerText=weatherInfo?.main?.humidity;
    CLOUDESPED.innerText=weatherInfo?.clouds?.all;

    
  }



    function getlocation(){
      
      discription.classList.add("active");
      grant.classList.remove("active");

      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showpostion);
      }
      else{
        console.log("location is not found ");
      }
     }
    
     function showpostion(position){

      const usercoordinates = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      }
      
      sessionStorage.setItem("user-coordinates",JSON.stringify(usercoordinates));
      fetchwetherinfo(usercoordinates);
      

    }



  const grantBtn= document.querySelector("[data-grantbtn]");
    grantBtn.addEventListener('click',getlocation);




//    let subbutton=document.querySelector("[btn]");
    
//     subbutton.addEventListener("submit",(e)=>{
//       e.preventDefault();
//       const inputsearch1=document.getElementById("input").value;
// console.log(inputsearch1);
//       // // let cityname=inputsearch.value;
//       // let cityname="mumbai"
//       // const cityname=inputsearch1.value;
//       console.log("city name ",cityname);

//       if(inputsearch1===""){
//         return;
//       }
//       else{
//         fetchsearchinfo(inputsearch1);
//       }

      

//     })

   


    async function fetchsearchinfo(){
      let inputVal = document.getElementById("input").value;
      console.log(inputVal);
       
      loder.classList.add("active");
      discription.classList.remove("active");
      grant.classList.remove("active");

      // let city1="goa"

      try{
          
        let response1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${API_KEY}&units=metric`)
        let data1= await response1.json();
        loder.classList.remove("active");
        discription.classList.add("active");
        randarinfo(data1);



      }

      catch{

      }

    }