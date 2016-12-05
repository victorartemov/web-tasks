(function () {
    var text = document.getElementById('sequenceInput'),
        sendButton = document.getElementById('calculateButton'),
        copyText;

    sendButton.onclick = function () {
        var i,
            array,
            arrayLength1,
            charsLength,
            j,
            chars = [];

        array = text.value.split(/[\s.?,;:!]/);
        arrayLength1 = array.length;
        arrayLength1 -= deleteEmptyElements(array, arrayLength1);
        copyText = text.value;
        if (arrayLength1 > 1) {
            for (i = 0; i < array[0].length; i++) {
                chars.push({
                    value: array[0][i],
                    alias: array[0][i].toUpperCase()
                });
            }

            for (i = 1; i < arrayLength1; i++) {
                for (j = 0; j < chars.length; j++) {
                    if (array[i].toUpperCase().indexOf(chars[j].alias) === -1) {
                        chars.splice(j, 1);
                        j--;
                        continue;
                    }
                }
            }

            charsLength = chars.length;
            for (j = 0; j < charsLength; j++) {
                copyText = copyText.split(chars[j].value.toLowerCase()).join('')
                    .split(chars[j].value.toUpperCase())
                    .join('');
            }
        } else {
            copyText = '';
        }

        alert(copyText);
    };

    function deleteEmptyElements(array, arrayLength) {
        var i,
            counter = 0;

        for (i = 0; i < arrayLength; i++) {
            if (array[i] === '') {
                array.splice(i, 1);
                arrayLength--;
                i--;
                counter++;
            }
        }

        return counter;
    }
})();
