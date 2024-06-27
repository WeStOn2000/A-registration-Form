// variables that i have used through this project
const form = document.querySelector('form');
const basic = document.querySelector('.basic-info');
const otherJob = document.querySelector('#other-job-role');
const jobRole = document.querySelector('#title');
const names = document.getElementById("name");
const email = document.getElementById("email");
const colorSelected = document.getElementById("color");
const designSelected = document.getElementById("design");
const colorOptions = document.querySelectorAll("#color option");
const workshop = document.getElementById("activities");
const cost = document.getElementById("activities-cost");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const boxes = document.getElementById("activities-box");
const paymentMethod = document.getElementById("payment");  
const payPal = document.getElementById("paypal");                               
const CCP = document.getElementById("credit-card");                        
const BTC  = document.getElementById("bitcoin");                              
const CCI = paymentMethod.querySelector("option:nth-child(2)");            
const CC = document.getElementById("cc-num");                              
const ZIP = document.getElementById("zip");
const CVV = document.getElementById("cvv");
const NAME1 = document.getElementById("name-hint");
const FIRSTEMAIL = document.getElementById("email-hint");
const ACTIVITIES = document.getElementById("activities-hint");
const CCHINTS = document.getElementById("cc-hint");
const ZIPHINTS = document.getElementById("zip-hint");
const CVVHINTS = document.getElementById("cvv-hint");





//this code is more the name input
const field = document.querySelector("[type='text']").focus();

//this code hides the other job input
otherJob.style.display = "none";

//this code displays other job input once selected in the dropdown menu
jobRole.addEventListener('change', (e) => {
const jobChoice = e.target.value;
if(jobChoice === "other") {
  otherJob.style.display = "block";
} else {
  otherJob.style.display = "none";
} 
});

//this code disables the color drop down menu when the page first loads
colorSelected.disabled = true;

//this code enables the color drop down menu to appear when a certain theme is selected
designSelected.addEventListener('change', (e) => {
const selectedDesign = e.target.value;
colorSelected.disabled = false;

colorOptions.forEach( (option) => {
  option.style.display = "none";                                     
});
  
colorOptions.forEach( (option) => {
  let optionAttribute = option.getAttribute('data-theme');                              
  if(selectedDesign === optionAttribute) {                                             
    option.style.display = "block";
  } else {
    option.style.display = "none";
  }
  colorOptions[0].selected = true;                                                      
  });
});

let totalcost=0;                                                                  
let selectedcheckbox = 0;                                                                 

workshop.addEventListener("change", (e) => {

// this code is for the attribute for day and time input
const activityselected = e.target;
const DAT = activityselected.getAttribute('data-day-and-time');

// this code is for the total cost of workshops selected
let Costactivity = parseFloat(activityselected.getAttribute("data-cost")); 
if (activityselected.checked) {
  totalcost += Costactivity;
  selectedcheckbox += 1;     
} else {
  totalcost -= Costactivity;
  selectedcheckbox -= 1;
}; 

cost.innerText =`Total: $${totalcost}`;                                 
const activityDate = workshop.querySelectorAll('input[data-day-and-time]');  

activityDate.forEach((element) => {                                                    
const dayTime = element.getAttribute('data-day-and-time');       

if(DAT === dayTime && element !== activityselected) {                   
  element.disabled = activityselected.checked;
}
        if(element.disabled) {
  element.parentElement.classList.add("disabled");                                       
} else {
  element.parentElement.classList.remove("disabled");                                    
}
});
}); 

// this code removes and adds focus to checkboxes     
checkboxes.forEach( (box) => {
  box.addEventListener("focus", (e) => {
  box.parentElement.classList.add("focus");
  });
  box.addEventListener("blur", (e) => {
    box.parentElement.classList.remove("focus");
    });
});

//this code hides payment methods
CCI.selected = true;
BTC.style.display = "none";
payPal.style.display = "none";
CCP.style.display = "";

// this code selects  payment methods
paymentMethod.addEventListener("change", (e) => {
const selectPayment = e.target.value;
CCP.style.display = selectPayment === "credit-card" ? "block" : "none";
payPal.style.display = selectPayment === "paypal" ? "block" : "none";
BTC.style.display = selectPayment === "bitcoin" ? "block" : "none";
});


// this code adds and removes styles in confirming  input
function validInput(hint, input) {
    hint.style.display = 'none';                                                        
    input.classList.remove('error');                                                    
    input.parentElement.classList.remove('not-valid');                                 
    input.parentElement.classList.add('valid');                                         
};
function invalidInput(hint, input) {
    hint.style.display = 'block';                                                       
    input.classList.add('error');                                                       
    input.parentElement.classList.remove('valid');                                      
    input.parentElement.classList.add('not-valid');                                     
};


// this code shows how i confirm the name input
function validateName() {
  if (names.value.trim() === '') {
    invalidInput(NAME1 , names)
    return false;
  }else{
    validInput(NAME1 , names);
    return true;
  }

  };

 //this code shows the regular expression i have used to confirm the email input
  function validateEmail() {
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        invalidInput(FIRSTEMAIL, email);
        return false;
    }else{
      validInput(FIRSTEMAIL , email);
      return true;
    }
  };

 // this code shows the regular expression i have used to confirm the credit card input
  function validateCC() {
    const ccRegex = /^\d{13,16}$/;                                                    
    if (!ccRegex.test(CC.value.trim())) {                                        
    invalidInput(CCHINTS, CC);
    return false;
    } else {
    validInput(CCHINTS, CC);
    return true;  
    }
  };

 // this code shows the regular expression i have used to confirm the zip code
 function validateZip() {
    const zipRegex = /^\d{5}$/;                                                      
    if (!zipRegex.test(ZIP.value.trim())) {                                     
    invalidInput(ZIPHINTS, ZIP);
    return false;
    } else {
    validInput(ZIPHINTS, ZIP);
    return true;  
    }
 };

 // this code shows the regular expression i have used to confirm the ccv
  function validateCVV() {
    const cvvRegex = /^\d{3}$/;                                                    
    if (!cvvRegex.test(CVV.value.trim())) {                                    
    invalidInput(CVVHINTS, CVV);
    return false;
    } else {
    validInput(CVVHINTS, CVV);
    return true;
     }
     };

     // this code is for validating the checkbox activities
     function validateActivities(){
      const activityselected = Array.from(checkboxes).some((checkbox) => checkbox.checked);
    if (!activityselected) {
    invalidInput(ACTIVITIES, boxes);
    return false;
    } else {
    validInput(ACTIVITIES, boxes);
    return true;
    }
};

// this code is for confirming the form before its submitted
  function validateForm() {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isActivitiesValid = validateActivities();
    let isCreditCardValid = true;
    let isZipValid = true;
    let isCVVValid = true;
    if (paymentMethod.value === "credit-card") {
      isCreditCardValid = validateCC();
      isZipValid = validateZip();
      isCVVValid = validateCVV();
    }
  return isNameValid && isEmailValid && isActivitiesValid && isCreditCardValid && isZipValid && isCVVValid;
};




// this code is to confirm if the correct input has been used 
names.addEventListener('input', validateName);
email.addEventListener('input', validateEmail);
CC.addEventListener('input', validateCC);
ZIP.addEventListener('input', validateZip);
CVV.addEventListener('input', validateCVV);
workshop.addEventListener('change', validateActivities);

//  this code submits and checks the validation of the form before submission
form.addEventListener('submit', (event) => {
  if(!validateForm()){
    event.preventDefault();
  }else{
    event.preventDefault();
    alert("Form submitted successfully!");
    window.location.reload();
  }
});