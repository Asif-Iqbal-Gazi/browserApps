<script>
    var tag = document.createElement("p");
    //var text = document.createTextNode("Tutorix is the best e-learning platform");
    //tag.appendChild(text);
    var element = document.getElementById("new");
    //element.appendChild(tag);
    var properties = [];
    for(prop in window){
        if(window.hasOwnProperty(prop)){
            var text = document.createTextNode(`"${prop}"`);
            tag.appendChild(text);
            element.appendChild(tag);
            console.log(`"${prop}"`);
            properties.push(prop);
        }
    }
    console.log(properties.length);
</script>
