const API = "AIzaSyB1D0JPRArFpjpbPzvp_mLftf99QXegZ08";
const Instruction = "For all responses strictly respond in the following order in plain text use simple language Start with say Namah Shivaya, then give heading 'Work done:' in bold next mention completed works explain it lightly minimum of 1 sentence then the heading 'Work Planned:' in bold then mention all works to be completed explain it lightly minimum of 1 sentence and finally end by saying Regards, followed by name of user At the end say 'Hours Worked:' followed by a random number b/w 2 to 5 the Work done is "

function  navigate(event){
    event.preventDefault();
    console.log("r")
    window.location.href = "index.html";
    const form=event.target;
    const data = new FormData(form);
    let name = data.get('name');
    localStorage.setItem("name", name);
}

function changeName(){
    window.location.href = "name.html";
}

function copy(){
    var text = document.getElementById("response-text").innerHTML;
    var text = text.replace(/<br\s*\/?>/gi, '\n');
    navigator.clipboard.writeText(text);
    alert("Copied the text");
  }


function onSubmit(event){
    event.preventDefault();
    const form=event.target;
    const data = new FormData(form);
    let propt = data.get('prompt');
    let propt2 = data.get('prompt2');
    let name = localStorage.getItem("name");
    localStorage.setItem("name", name);
    name = localStorage.getItem("name");
    FetchResponse(propt,propt2,name);
}
async function FetchResponse(prompt,prompt2,name) {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="+API,{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            "contents": [{
                "parts": [{"text": Instruction+prompt+"the Works in progress is:"+prompt2+"The user is"+name}]
            }]
        })
    })
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy+'\n';
    const data = await response.json();
    if(data?.candidates?.[0]?.content?.parts?.[0]?.text){
        document.getElementById("response-text").innerText = today+data?.candidates?.[0]?.content?.parts?.[0]?.text;
    }
    document.getElementById("copy").style.visibility = "visible"
}
