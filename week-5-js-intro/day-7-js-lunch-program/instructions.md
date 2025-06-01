 # Build a Lunch Picker Program

In this lab, you'll build a program that helps in managing lunch options. You'll work with an array of lunches, add and remove items from the array, and randomly select a lunch option.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

# User Stories:

1. You should create a lunches variable and assign it an empty array that will be used to store lunch items.

2. You should create a function addLunchToEnd that takes an array as the first argument and a string as the second argument. The function should:
    a. Add the string to the end of the array.

    b. Log the string "[Lunch Item] added to the end of the lunch menu." to the console, where [Lunch Item] is the c. string passed to the function.

    d. Return the updated array.

3. You should create a function addLunchToStart that takes an array as the first argument and a string as the second argument. The function should:
    a. Add the string to the start of the array.

    b. Log the string "[Lunch Item] added to the start of the lunch menu." to the console, where [Lunch Item] is the string passed to the function.

    c. Return the updated array.

4. You should create a function removeLastLunch that takes an array as its argument. The function should:
    a. Remove the last element from the array.

    b. If the removal is successful, log the string "[Lunch Item] removed from the end of the lunch menu." to the console, where [Lunch Item] is the element removed from the array.

    c. If the array is empty, log the string "No lunches to remove." to the console.

    d. Return the updated array.

5. You should create a function removeFirstLunch that takes an array as its argument. The function should:
    a. Remove the first element from the array.

    b. If the removal is successful, log the string "[Lunch Item] removed from the start of the lunch menu." to the console, where [Lunch Item] is the element removed from the array.

    c. If the array is empty, log the string "No lunches to remove." to the console.

    d. Return the updated array.

6. You should create a function getRandomLunch that takes an array as its argument. The function should:
    a. Select a random element from the array.

    b. If successful, log the string "Randomly selected lunch: [Lunch Item]" to the console, where [Lunch Item] is a random element in the array.

    c. If the array is empty, log the string "No lunches available." to the console.

7. You should create a function showLunchMenu that takes an array as its argument and:
    a. If there are elements in the array, logs the string "Menu items: [Lunch Item], [Lunch Item]..." to the console, where each [Lunch item] is one of the elements in the array, in order.

    b. If the array is empty, logs the string "The menu is empty." to the console.