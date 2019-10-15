
const promis = new Promise(() => {
    console.log('first')
});

promis.then(() => {
    console.log('second');
})




// difference functions

function haha() {
    return 'haha';
}
const haha1 = function () {
    return 'haha';
}
const haha2 = () => {
    return 'haha';
};




// work with arrys

const test = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
console.log(test[0]);



let hasValue = false;
for (const iterator of test) {

    if (iterator.id === 1) {
        hasValue = true;
    }

}
console.log(hasValue);



console.log(test.some(x => x.id === 5))


// equals

console.log(5 == '5')
console.log(5 === '5')


// arrays

const array = [];
array;


array.push(5);
array.push('nico');
array.push({ haha: 5 });
array;


const a = array.pop();
a;



// object explanation

const x = {};
x;


x.name = 'nico';
x;


x.sayhello = function () {
    return 'hello';
}
x;



const y = x;

y;


