(function () {
    var text = document.getElementById('text'),
        color = document.getElementById('color'),
        type = document.getElementById('type'),
        createButton = document.getElementById('createButton'),
        changeButton = document.getElementById('changeButton'),
        deleteButton = document.getElementById('deleteButton'),
        sequence = document.getElementById('sequence'),
        controlPart = document.getElementById('controlPart'),
        currentElement,
        nodesList = [],
        nodeListLength;

    document.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            createButton.click();
        }
    });    

    createButton.onclick = function () {
        var newLi = document.createElement('li'),
            nodesListLength;
        newLi.innerHTML = text.value;
        newLi.style.color = color.value;
        newLi.style.listStyle = type.value;
                newLi.onclick = function () {
                    nodeListLength = nodesList.length;
                    for (var i = 0; i < nodeListLength; i++) {
                        nodesList[i].style.border = '0 solid blue';
                    }
        
                    this.style.border = '1px solid blue';
                    text.value = this.innerHTML;
                    type.value = this.style.listStyle;
                    color.value = this.style.color;
                    currentElement = this;
                };
        nodesList.push(newLi);
        sequence.appendChild(newLi);
    };


    deleteButton.onclick = function () {
        if (currentElement == null) {
            alert("Please, choose an item to delete!");
        }
        sequence.removeChild(currentElement);
    };

    changeButton.onclick = function () {
        if (currentElement == null) {
            alert("Please, choose an item to change!");
        }
        currentElement.innerHTML = text.value;
        currentElement.style.color = color.value;
        currentElement.style.listStyle = type.value;
    };
})();
