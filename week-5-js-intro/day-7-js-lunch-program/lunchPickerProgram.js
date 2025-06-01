const lunches = [];

const addLunchToEnd = (menuArr, lunchItem) => {
    menuArr.push(lunchItem);
    console.log(`${lunchItem} added to the end of the lunch menu.`);
    return menuArr;
}

const addLunchToStart = (menuArr, lunchItem) => {
    menuArr.unshift(lunchItem);
    console.log(`${lunchItem} added to the start of the lunch menu.`);
    return menuArr;
}

const removeLastLunch = (menuArr) => {
    if (menuArr.length === 0) {
        console.log("No lunches to remove.")
        return menuArr;
    }
    let removedItem = menuArr.pop();
    console.log(`${removedItem} removed from the end of the lunch menu.`);
    return menuArr;
}

const removeFirstLunch = (menuArr) => {
    if (menuArr.length === 0) {
        console.log("No lunches to remove.")
        return menuArr;
    }
    let removedItem = menuArr.shift();
    console.log(`${removedItem} removed from the start of the lunch menu.`);
    return menuArr;
}

const getRandomLunch = (menuArr) => {
    if (menuArr.length === 0) {
        console.log("No lunches available.")
        return menuArr;
    }
    let randomItem = menuArr[Math.floor(Math.random() * menuArr.length)]
    console.log(`Randomly selected lunch: ${randomItem}`)
}

const showLunchMenu = (menuArr) => {
    if (menuArr.length === 0) {
        console.log("The menu is empty.")
        return menuArr;
    }
    let formattedItems = menuArr.join(", ");
    console.log(`Menu Items: ${formattedItems}`);
    return menuArr;
}