console.log("this is set to run")

// initialise a count for adding more parameters
let addParameterCount = 0;

// 1. Utility function to get DOM element from string
function getElementFromString(strings) {
    let div = document.createElement('div');
    div.innerHTML = strings;
    return div.firstElementChild;
}

//lets take 1stly parametersBox
let parametersBox = document.getElementById("parametersBox");
//as we are hiding the parameters box here
parametersBox.style.display = 'none';


let requestJsonBox = document.getElementById("requestJsonBox");
//as we are hiding the JSON  box here
requestJsonBox.style.display = 'none';


let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener("click", () => {
    document.getElementById("requestJsonBox").style.display = 'none';
    document.getElementById("parametersBox").style.display = 'block';
})


let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener("click", () => {
    document.getElementById("requestJsonBox").style.display = 'block';
    document.getElementById("parametersBox").style.display = 'none';
})


let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
    let params = document.getElementById("params");
    let strings = `<div class="row my-3">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${addParameterCount + 2}</label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" placeholder="Enter Parameter${addParameterCount + 2} Key" id="parameterKey ${addParameterCount + 2}">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" placeholder="Enter Parameter${addParameterCount + 2} Value" id="parameterValue${addParameterCount + 2}">
                        </div>
                        <button style='width:auto';  class="btn btn-primary deleteParam">-</button>
                    </div>`

    let paramElement = getElementFromString(strings);
    params.appendChild(paramElement)

    let deleteParam = document.getElementsByClassName('deleteParam');
    for (items of deleteParam) {
        items.addEventListener("click", (e) => {
            e.target.parentElement.remove()
        })
    }
    addParameterCount++;
})

let submit = document.getElementById("submit")
submit.addEventListener("click", () => {
    //show please wait fetching dataa msg in response box by which user will get a msg actually what is happening
    document.getElementById("responsePrism").innerHTML = "PLEASE WAIT! FETCHING DETAILS...";

    // Fetch all the values user had enteres
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    
    
    // If user has used params option instead of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addParameterCount + 1; i++) {
            if (document.getElementById("parameterKey" + (i + 1))!= undefined) {
                let key = document.getElementById("parameterKey" + (i + 1)).value;
                let value = document.getElementById("parameterValue" + (i + 1)).value;
                data[key] = value;
                
            }
            data=JSON.stringify(data);
        }
    }
    else{
        data = document.getElementById("requestJsonText").value;
    }
    
    //log all the values to debug
    console.log("URL IS :", url);
    console.log("RequestType IS :", requestType);
    console.log("ContentType IS :", contentType);
    console.log("Data IS :",data);

    if(requestType=="GET"){
        fetch(url,{
            method:"GET",
        })
        .then(response=>response.text())
        .then((text)=>{
        // document.getElementById("responseJsonText").value=text  ; 
        document.getElementById("responsePrism").innerHTML=text; 
        Prism.highlightAll();    
        })
    }
    else{
        fetch(url,{
            method:"POST",
            body:data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }  
        })
        .then(response=>response.text())
        .then((text)=>{
        // document.getElementById("responseJsonText").value=text  ;   
        document.getElementById("responsePrism").innerHTML=text  ;   
        Prism.highlightAll();
        })
    }
})