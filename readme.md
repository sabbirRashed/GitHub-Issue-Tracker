1. What is the difference between var, let, and const?
Answer: Var is a function scope. It is redeclearable and also reassignable. Var is hoisted and if we console it before initialized we get undefined. On the other hand let and const is block scope. let is reassignable but we can not reassign const. let and const both are hoisted, but they stay temporal ded zon on the memory. So if we console it before initialized, we get refference error. 

2. What is the spread operator (...)?
Answer: Spread operator(...) is used for spread or marge any array or object easily. It is commonly use for copy an array or object without any effect on the main array. We can also pass whole array as function arguments using spread operator. 

3. What is the difference between map(), filter(), and forEach()?
Answer: map(), filter() and forEach() both of them are array method. map() method return a new array without change the original array. It loop through an array and work with every item and then return item in a new array. filter() method works with condition. It return every matching item in a new array. forEach() method is mostly similer with map(). But forEach() does not return any item. It is generally used for looping.

4. What is an arrow function?
Answer: Arrow function is a function, that is stored in a variable and there has an arrow after parentehsis. In arrow function we do not need parenthesis if argument is one, otherwise we need. It is not hoisted. Arrow function is always anonymus. we do not need second bracket if the function is single line and also return automatically. But multiple line arrow function need second bracket and need to return keyword to return any item. It is easier for shorter syntax.

5. What are template literals?
Answer: Template literals are strings in javascript that are written inside baqtick quate. We can insert variable using ${}. Uning template literalse we do not need /n to go the next line. We can directly use calculation inside ${}. It makes code more cleaner.