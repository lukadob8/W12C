function redirect() {
    window.open("index.html", "_self");
}

if(Cookies.get("token") == undefined) {
    document.getElementById("welcome").innerHTML = "Login Error";
    document.getElementById("error").addEventListener("click", redirect);
} else {
    document.getElementById("welcome").innerHTML = "Welcome " + Cookies.get("user");
    document.getElementById("error").style.display = "none";
    colors();
}

let colorDisplay = document.getElementById("colorDisplay");

function colors() {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let colorObject = JSON.parse(this.responseText);
            let colors = document.getElementById("color");

            for(i = 0; i < colorObject.data.length; i++) {
                colorDisplay.innerHTML += "<p>" + colorObject.data[i].name + "</p>";
                colorDisplay.innerHTML += "<p>" + colorObject.data[i].year + "</p>";
                let div = document.createElement("div");
                div.style.background = colorObject.data[i].color;
                div.style.height = "100px";
                div.style.width = "100px";
                colorDisplay.append(div);
                
            }
            
        } 
    };
    ajax.open("GET", "https://reqres.in/api/unknown", true);
    ajax.send();
}