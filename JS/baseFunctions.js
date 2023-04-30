function LoadMainContent(index) {
    
    var file = "CONTENT/" + index + ".txt";
    var contentContainer = document.getElementById("sub_container");

    $.get(file, function(data) {
        contentContainer.innerHTML = data;
     }, 'text');

}