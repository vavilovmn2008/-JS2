
//Задание № 1
const regexp = /'/g;
console.log("Waiter: 'Welcome to our restaurant. Did you book a table in advance?' David: 'Hello. Yes, we ordered a table for Laurins.' W: 'All right. Follow me. Here's your table, as you wanted, by the window. Let me take your and your lady's coats.'D: 'Yes, please. Sit down, dear.'W: 'Check out our menu. I'll come in a minute ... Are you ready to order?'D:' No, not yet. Give us a little time to study the menu.' W: 'Good. Call me when you're ready.".replace (regexp, '"')) 



//Задание № 2
const regexp = /\B'|'\B/g;
console.log("Waiter: 'Welcome to our restaurant. Did you book a table in advance?' David: 'Hello. Yes, we ordered a table for Laurins.' W: 'All right. Follow me. Here's your table, as you wanted, by the window. Let me take your and your lady's coats.'D: 'Yes, please. Sit down, dear.'W: 'Check out our menu. I'll come in a minute ... Are you ready to order?'D:' No, not yet. Give us a little time to study the menu.' W: 'Good. Call me when you're ready.".replace (regexp, '"')) 

