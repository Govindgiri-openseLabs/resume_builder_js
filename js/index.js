let params=window.location.search;
params=new URLSearchParams(params);
let email = params.get('email')
console.log("ema,il", email );  
if(email)
 {
    resume_rendor(email)
 }

const education_section = `
<div style="border:1px black solid;margin:5px;padding:10px">
<h2>Education Level</h2>
<label for="educationLevel">Education Level:</label>
<select id="educationLevel" name="educationLevel" required>
    <option value="highschool">High School</option>
    <option value="bachelor">Bachelor's Degree</option>
    <option value="master">Master's Degree</option>
    <option value="doctorate">Doctorate</option>
</select>
<br><br>
<!-- Institution Name -->
<label for="institutionName">Institution Name:</label>
<input type="text" id="institutionName" name="institutionName" required>
<br><br>
<!-- Degree Earned -->
<label for="degreeEarned">Degree Earned:</label>
<input type="text" id="degreeEarned" name="degreeEarned" required>
<br><br>
<!-- Field of Study -->
<label for="fieldOfStudy">Field of Study:</label>
<input type="text" id="fieldOfStudy" name="fieldOfStudy" required>
<br><br>
<!-- Dates of Attendance -->
<label for="startDate">Start Date:</label>
<input type="date" id="startDate" name="startDate" required>

<label for="endDate">End Date:</label>
<input type="date" id="endDate" name="endDate" required>
</div>
`;
let exprience_section= `<div style="border:1px black solid;margin:5px;padding:10px">
<h2>Level of Exprience </h2>
<label for="jobTitle">Job Title:</label>
<input type="text" id="jobTitle" name="jobTitle" required>
<br><br>
<label for="companyName">Company Name:</label>
<input type="text" id="companyName" name="companyName" required>
<br><br>
<!-- Location -->
<label for="location">Location:</label>
<input type="text" id="location" name="location">
<br><br>
<br><br>
<!-- Job Description -->
<label for="jobDescription">Job Description:</label>
<textarea id="jobDescription" name="jobDescription" rows="4" cols="50" required></textarea>
<br><br>
<!-- Dates of Employment -->
<label for="startDate">Start Date:</label>
<input type="date" name="startDate" required>

<label for="endDate">End Date:</label>
<input type="date" name="endDate"> 
<br><br> </div>        
`

function section_show(id)
{
//    let parent=document.getElementById("container_content_main_forms");
//    //parent.style.display="none";
//    console.log(parent);
return;
let section=document.getElementById(id);
section.style.display="block"
}


function shift_to_new_page(new_page_id,current_page_id,color_id)
{  document.getElementById(color_id).style.backgroundColor="green";
let current_page=document.getElementById(current_page_id);
let new_page=document.getElementById(new_page_id);
current_page.style.display="none";
new_page.style.display="block"
 buid_resume('incomplete');
}


function add_container(id)
{  console.log(id); 
if(id==='exprience_container') {
//  let num=document.getElementById('education_section_no').value++;
let parent=document.getElementById(id);
let child=document.createElement('div');
child.innerHTML= exprience_section;
parent.appendChild(child);
}
else
{
let parent=document.getElementById('education_container');
let child=document.createElement('div');
child.innerHTML=education_section;
parent.appendChild(child);
}
} 


function buid_resume(id)
{ let all_user=JSON.parse(localStorage.getItem('users'));
  if(!all_user) all_user=[];
let user_email=document.getElementById('user_email').value;
var forms = document.forms;
let user_data={};
// Iterate over the forms and access each element
for (var i = 0; i < forms.length; i++) {
var form = forms[i];
// console.log("Form ID:", form.name);
user_data[form.name]=form.name==='education'||form.name==='Exprience'?[]:{};
let elements = form.elements;

if(form.name==='education'||form.name==='Exprience')
{      
 let new_section={};
 for (var j = 0; j < elements.length; j++) {
    var element = elements[j];
   if(element.name&&element.value&&element.type)
    { 
      if(element.type==='radio'||element.type==='checkbox')
       {  if(element.checked) 
          new_section[element.name]={"value":element.value,"type":element.type};
          //user_data[form.name][element.name]={"value":element.value,"type":element.type};
       } 
       else{ new_section[element.name]={"value":element.value,"type":element.type};
       //user_data[form.name][element.name]={"value":element.value,"type":element.type};
           }
    }
   if(element.name=='endDate')
    {
      user_data[form.name].push(new_section);
      new_section={};
    }
 }
continue;
}
for (var j = 0; j < elements.length; j++) {
 var element = elements[j];
 if(element.name&&element.value&&element.type)
   { 
     if(element.type==='radio'||element.type==='checkbox')
      {  if(element.checked) 
         user_data[form.name][element.name]={"value":element.value,"type":element.type};
      } 
     else
     user_data[form.name][element.name]={"value":element.value,"type":element.type};
      //console.log(form[form.name])
   }
}
}
if(all_user.length)
 {  console.log('hhh',all_user);
    let flag=0;
   for(let i=0;i<all_user.length;i++)
    {
        if(all_user[i][user_email])
         {  all_user[i][user_email]=user_data; 
            flag=1;
         }
    }
    if(!flag) 
     {  let tmp={}; tmp[user_email]=user_data;
        all_user.push(tmp);
     } 
 }
 else
 {    let tmp={}; tmp[user_email]=user_data;
       all_user.push(tmp);
 }

localStorage.setItem('users',JSON.stringify(all_user));

//localStorage.setItem("form",JSON.stringify(form));
// render data to resume

if(id==='contact_form')
resume_rendor(user_email);
else return;


}


function edit_resume_data()
{  
// edit data in form
let user=document.getElementById('user_email').value;
if(!user){
alert('Email Required'); return;
}
// color change
document.getElementById('basic_sec').style.backgroundColor="green"
let check_user=0;
 let all_user=JSON.parse(localStorage.getItem('users'));
 if(all_user)
  {
     for(let i=0;i<all_user.length;i++)
      {
         if(all_user[i][user])
          {
             check_user=all_user[i][user];
          }
      }
  } 


//if user found
if(check_user)
{    
let forms=document.forms;
for (let i = 0; i < forms.length; i++) {
 let form = forms[i];
// console.log("Form ID:", form.name);
 // Access the form's elements
 let elements = form.elements;
 let user_element=check_user[form.name];
 //console.log(user_element)
 if(form.name==='education')
   {   let number_of_level=check_user[form.name].length;
     for(let i=0;i<number_of_level;i++)
      { 
        let parent=document.getElementById('education_container');
        let child=document.createElement('div');
        child.innerHTML=`<div style="border:1px black solid;padding:15px;margin:5px">
        <h2>Education Level</h2>
        <label for="educationLevel">Education Level:</label>
        <select id="educationLevel" name="educationLevel" required value="${check_user[form.name][i]?.educationLevel?.value}">
            <option value="highschool">High School</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="doctorate">Doctorate</option>
        </select>
        <br><br>
        <!-- Institution Name -->
        <label for="institutionName">Institution Name:</label>
        <input type="text" id="institutionName" name="institutionName" required value="${check_user[form.name][i]?.institutionName?.value}">
        <br><br>
        <!-- Degree Earned -->
        <label for="degreeEarned">Degree Earned:</label>
        <input type="text" id="degreeEarned" name="degreeEarned" required value="${check_user[form.name][i]?.degreeEarned?.value}">
        <br><br>
        <!-- Field of Study -->
        <label for="fieldOfStudy">Field of Study:</label>
        <input type="text" id="fieldOfStudy" name="fieldOfStudy" required value="${check_user[form.name][i]?.fieldOfStudy?.value}">
        <br><br>
        <!-- Dates of Attendance -->
        <label for="startDate">Start Date:</label>
        <input type="date" id="startDate" name="startDate" required value="${check_user[form.name][i]?.startDate?.value}">
      
        <label for="endDate">End Date:</label>
        <input type="date" id="endDate" name="endDate" required value="${check_user[form.name][i]?.endDate?.value}">
       </div>
        `;
        parent.appendChild(child);
     }
        continue;
   }

 else
 if(form.name==='Exprience')
   {   let number_of_level=check_user[form.name].length;
     for(let i=0;i<number_of_level;i++)
      { //document.getElementById('education_section_no').value++;
        let parent=document.getElementById('exprience_container');
        let child=document.createElement('div');
        child.innerHTML=`<div style="border:1px black solid;padding:15px;margin:10px">
        <h2>Exprience Level</h2>
        <label for="jobTitle">Job Title:</label>
        <input type="text" id="jobTitle" name="jobTitle"value="${check_user[form.name][i]?.jobTitle?.value}"  required>
        <br><br>
        <label for="companyName">Company Name:</label>
        <input type="text" id="companyName" name="companyName" value="${check_user[form.name][i]?.companyName?.value}" required>
        <br><br>
        <!-- Location -->
        <label for="location">Location:</label>
        <input type="text" id="location" name="location"value="${check_user[form.name][i]?.location?.value}" >
        <br><br>
        <br><br>
        <!-- Job Description -->
        <label for="jobDescription">Job Description:</label>
        <textarea id="jobDescription" name="jobDescription" rows="4" cols="50"value="${check_user[form.name][i]?.jobDescription?.value}" required></textarea>
        <br><br>
        <!-- Dates of Employment -->
        <label for="startDate">Start Date:</label>
        <input type="date" name="startDate" value="${check_user[form.name][i]?.startDate?.value}" required>
        
        <label for="endDate">End Date:</label>
        <input type="date" name="endDate" value="${check_user[form.name][i]?.endDate?.value}"> 
         <br><br> </div>        
        `;
        parent.appendChild(child);
     }
        continue;
   }








 for (let j = 0; j < elements.length; j++) {
     let element = elements[j];
     
     if(user_element[element.name])
      if(element.type=='radio'||element.type=='checkbox') 
      element.checked=true;
     else
      element.value=user_element[element.name].value;
     
     }
 }  
}
// user not found
let login_form=document.getElementById('login_user_form');
login_form.style.display="none";
let start_input=document.getElementById('basic_form');
start_input.style.display="block";
}

function resume_rendor(user_email)
{ // open resume in new tab
  document.getElementById('cnp1').style.display="none";
  document.getElementById('resume_page').style.display="block";
  // redor data
  let user_data=0;
  console.log('oooooo',user_email)
  let all_user=JSON.parse(localStorage.getItem('users'));
  if(all_user)
   {
     for(let i=0;i<all_user.length;i++)
      {  if(all_user[i][user_email])
         user_data=all_user[i][user_email];       
      }
   }
   console.log('ppppp',user_data)
  if(!user_data) { alert('invalid user data'); 
         document.getElementById('cnp1').style.display="block";
         document.getElementById('resume_page').style.display="none";
         return;
    } 
//let user_data=JSON.parse(localStorage.getItem(user_email));

// console.log(innerHTML=user_data.basic.last_name.value)
document.getElementById('first_name').innerHTML=user_data?.basic?.first_name?.value||"";
document.getElementById('middle_name').innerHTML=user_data?.basic?.middle_name?.value||"";
document.getElementById('last_name').innerHTML=user_data?.basic?.last_name?.value||"";
document.getElementById('basic_email').innerHTML=user_data?.Contact?.email?.value||"";
document.getElementById('basic_phone').innerHTML=user_data?.Contact?.phone?.value||"";
document.getElementById('resume_profile').innerHTML=`<span><strong>${user_data?.Contact?.message?.value||""}</strong></span>`;

// exprience rendor
let exprience_data=user_data.Exprience;
for(let i=0;i<exprience_data.length;i++)
{
let exprience_parent=document.getElementById('resume_exprience');
Object.keys(exprience_data[i]).map((key) =>{ 
 exprience_child=document.createElement('div');
 exprience_child.classList=i%2==0?'left':'left';
 exprience_child.innerHTML=`<span>${key} : </span><span>${exprience_data[i][key]?.value}</span>`;
 exprience_parent.appendChild(exprience_child);
})
} 

// education rendor
let education_data=user_data.education;
for(let i=0;i<education_data.length;i++)
{
let education_parent=document.getElementById('education_resume');
Object.keys(education_data[i]).map((key) =>{ 
 education_child=document.createElement('div');
 education_child.classList=i%2==0?'left':'left';
 education_child.innerHTML=`<span>${key} : </span><span>${education_data[i][key]?.value||null}</span>`;
 education_parent.appendChild(education_child);
})
} 

// skill rendor

let skill_data=user_data.Skills; 
let skill_parent=document.getElementById('skill_resume');
console.log(skill_data,skill_parent);
Object.keys(skill_data).map((key) =>{ 
skill_child=document.createElement('div');
skill_child.innerHTML=`<div class="left"><div class="name">
${key}
</div></div>
<div class="right">
         <input  id="ck1" type="checkbox" checked/>

<label for="ck1"></label>
         <input id="ck2" type="checkbox" checked/>

<label for="ck2"></label>
        <input id="ck3" type="checkbox" />

<label for="ck3"></label>
          <input id="ck4" type="checkbox" />
<label for="ck4"></label>
         <input id="ck5" type="checkbox" />
<label for="ck5"></label>

</div>`;
skill_parent.appendChild(skill_child);
})

}

function edit_by_button()
 {   document.getElementById('resume_page').style.display='none';
     document.getElementById('cnp1').style.display="block";
     document.getElementById('basic_form').style.display="block";
     document.getElementById('contact_form').style.display="none";
 }

function add_by_button()
 {
     location.reload();
 }

