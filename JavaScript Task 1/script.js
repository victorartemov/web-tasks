(function () {
    var expression = document.getElementById('sequenceInput'),
        calculateButton = document.getElementById('calculateButton'),
        result;

    calculateButton.onclick = function () {
        var tempString = '',
            array = [],
            arrayLength = 0,
            tempLength,
            i,
            j,
            workString,
            indexOfEquals;

        indexOfEquals = expression.value.indexOf('=', 0);
        if (indexOfEquals === -1) {
            expression.value = '';
            result = '';
            alert('Error');
            return;
        }

        workString = expression.value.slice(0, indexOfEquals);
        result = workString.split(/[^0-9+\/*.\-]/g);
        arrayLength = result.length;
        for (i = 0; i < arrayLength; i++) {
            tempLength = result[i].length;
            tempString = '';
            for (j = 0; j < tempLength; j++) {
                if (result[i][j] !== '+' && result[i][j] !== '-' && result[i][j] !== '*' && result[i][j] !== '/') {
                    tempString += result[i][j];
                    continue;
                }

                if (tempString !== '') {
                    array.push({
                        type: 'Number',
                        value: +tempString
                    });
                }

                array.push({
                    type: 'Operation',
                    value: result[i][j]
                });
                tempString = '';
            }

            if (tempString !== '') {
                array.push({
                    type: 'Number',
                    value: +tempString
                });
            }
        }

        result = parseFloat(execute(array));
        if (!isNaN(result)) {
            alert(result.toFixed(2));
        }
    };


    function execute(resultArray) {
        var arrayLength = resultArray.length,
            operation = null,
            i,
            result = 0,
            sign = 1;

        if (!validate(resultArray)) {
            expression.value = '';
            result = '';
            alert('Error');
            return '';
        }

        arrayLength = resultArray.length;
        for (i = 0; i < arrayLength - 1; i++) {
            if (resultArray[i].type === 'Operation') {
                operation = resultArray[i].value;
                if (resultArray[i + 1].type === 'Operation') {
                    sign = getSign(resultArray[i + 1].value);
                    i++;
                } else {
                    sign = 1;
                }
            } else {
                if (!operation) {
                    result += resultArray[i].value;
                } else {
                    result = executeOperation(operation, resultArray[i].value, result, sign);
                }
            }
        }

        result = executeOperation(operation, resultArray[arrayLength - 1].value, result, sign);
        return result;
    }


    function searchClosestElement(array, index, arrayLength) {
        var i;

        for (i = index; i < arrayLength; i++) {
            if (array[i].type === 'Number') {
                return i;
            }
        }

        return -1;
    }



    function executeOperation(operation, element, result, sign) {
        switch (operation) {
            case '+':
                {
                    result += sign * element;
                    break;
                }

            case '-':
                {
                    result -= sign * element;
                    break;
                }

            case '*':
                {
                    result *= sign * element;
                    break;
                }

            case '/':
                {
                    result /= sign * element;
                    break;
                }

            default:
                break;
        }

        return result;
    }

    function getSign(element) {
        switch (element) {
            case '+':
                {
                    return 1;
                }
            case '-':
                {
                    return -1;
                }
            default:
                {
                    break;
                }
        }
    }

    function validate(newArray) {
        var i,
            arrayLength,
            indexOfClosestElement;

        arrayLength = newArray.length;

        if (!arrayLength) {
            return false;
        }

        if (newArray[0] === '*' || newArray[0] === '/') {
            return false;
        }

        if (arrayLength > 0 && +searchClosestElement(newArray, 0, arrayLength) > 1) {
            return false;
        }

        if (newArray[arrayLength - 1].type !== 'Number') {
            return false;
        }

        for (i = 0; i < arrayLength - 2; i++) {
            if (newArray[i].type === 'Operation') {
                indexOfClosestElement = searchClosestElement(newArray, i + 1, arrayLength);
                if (indexOfClosestElement - i > 2 ||
                    indexOfClosestElement - i < 0 &&
                    indexOfClosestElement !== -1) {
                    return false;
                }

                if (indexOfClosestElement - i === 2 &&
                    newArray[i + 1].value === '*' || newArray[i + 1].value === '/') {
                    return false;
                }
            }
        }

        return true;
    }
})();
