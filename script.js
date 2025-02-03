

const API = "AIzaSyB1D0JPRArFpjpbPzvp_mLftf99QXegZ08";


const Instruction = "For all responses strictly respond in the following order in plain text use simple language Start with say Namashivaya, then give heading 'Workdone:' next mention completed works explain it lightly minimum of 1 sentence then the heading 'Work In Progress:' then mention all works to be completed explain it lightly minimum of 1 sentence and finally end by saying Regards, followed by name of user Here the user is Rohith the Work done is "
function onSubmit(event)
{
    event.preventDefault();
    const form=event.target;
    const data = new FormData(form);
    let propt = data.get('prompt');
    let propt2 = data.get('prompt2');
    let name = data.get('name');
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
    today = mm + '/' + dd + '/' + yyyy+'\n';
    const data = await response.json();
    if(data?.candidates?.[0]?.content?.parts?.[0]?.text){
        document.getElementById("response").innerText = today+data?.candidates?.[0]?.content?.parts?.[0]?.text;
    }
    console.log(data);
}