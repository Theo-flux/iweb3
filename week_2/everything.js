function every(array, test) {
    // Your code here.
    let flag = true;
    for (let i of array) {
        if (!test(i)) {
            flag = false;
            break;
        }
    }

    return flag;
  }
  
  console.log(every([1, 3, 5], n => n < 10));
  // → true
  console.log(every([2, 4, 16], n => n < 10));
  // → false
  console.log(every([], n => n < 10));
  // → true