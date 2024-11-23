// recursion approach
function recursiveLoop(val, testFn, updateFn, bodyFn) {
    if (testFn(val)) {
        bodyFn(val);
        const newVal = updateFn(val);

        return recursiveLoop(newVal, testFn, updateFn, bodyFn);
    };

    return;
}

// while approach
function whileLoop(val, testFn, updateFn, bodyFn) {
    while (testFn(val)) {
        bodyFn(val);
        val = updateFn(val);
    }
}

recursiveLoop(3, n => n > 0, n => n - 1, console.log);
whileLoop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1
