const btns = document.getElementsByClassName('favorite-icon');
console.log(btns)

for (let btn of btns) {
    btn.addEventListener("click", () => {
        if (btn.classList.contains('filled')) {
            btn.classList.remove('filled');
            btn.innerHTML = "&#9825;";
        }
        else {
           btn.classList.add('filled');
            btn.innerHTML = "&#10084;"; 
        }
    })   
}
