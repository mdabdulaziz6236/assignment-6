1. Difference between var, let, and const:
   <!-- answer -->

   var is old way, can change, works anywhere in function.
   let is that can change, works only inside block { }.
   const is that cannot change, works only inside block { }.
   Example:
   var name = "Ali";
   let age = 20;
   const pi = 3.14;

2. Difference between map(), forEach(), and filter():
   <!-- answer -->

   forEach() goes through items, does not make a new array.
   map() goes through items, makes a new array with results.
   filter() goes through items, makes a new array with items that match a condition.
   Example:
   let numbers = [1, 2, 3, 4];
   numbers.forEach(n => console.log(n)); // 1 2 3 4
   let double = numbers.map(n => n \* 2); // [2, 4, 6, 8]
   let even = numbers.filter(n => n % 2 === 0); // [2, 4]

3. Arrow functions:
   <!-- answer -->

   Short way to write function using =>
   Example:
   const add = (a, b) => a + b;
   console.log(add(2, 3)); // 5

4. Destructuring assignment:
      <!-- answer -->

   Easy way to get values from arrays or objects.
   Example:
   let numbers = [1, 2, 3];
   let [a, b] = numbers; // a=1, b=2
   let person = {name: "Ali", age: 20};
   let {name, age} = person; // name=Ali, age=20

5. Template literals:
   <!-- answer -->
   Use backticks and ${} for variables and easier than using + for joining strings.
   Example:
   let name = "Ali";
   let age = 20;
   console.log(`My name is ${name} and I am ${age} years old`);
