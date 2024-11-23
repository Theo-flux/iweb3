let size = 8;
let w = "";
let h = "";

for (let i = 0; i < size; i++) {
    if (i % 2 == 0) {
        w += " ";
        h += "#";
    }else {
        w += "#";
        h += " ";
    }
}

for (let i = 1; i <= size; i++)
{
    if (i % 2 == 0)
    {
        console.log(h);
    }
    else
    {
        console.log(w);
    }
}
