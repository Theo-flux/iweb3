let fz = "Fizz";
let bz = "Buzz";
let fb = "FizzBuzz";

for (let i = 1; i <= 100; i++)
{

    if (i % 3 == 0 && i % 5 == 0)
    {
        console.log(fb);
    }
    else if (i % 5 == 0 && i % 3 != 0) {
        console.log(bz);
    }
    else if (i % 3 == 0 && i % 5 != 0) {
        console.log(fz);
    }
    else {
        console.log(i);
    }
}