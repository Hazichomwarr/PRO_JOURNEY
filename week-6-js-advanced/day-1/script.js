// // ========== VARIABLES ===================================
// const mainElement = document.getElementById('main');
// const overlay = document.getElementById("modal-overlay");
// const closeSign = document.getElementById('close-modal')
// const btns = document.getElementsByClassName('btn')

// // ========== FUNCTIONS===========================
// for (let btn of btns) {
//     btn.addEventListener("click", () => {
//         overlay.classList.remove('modal-hidden')
//     })
// }

// closeSign.addEventListener('click', () => {
//     overlay.classList.add('modal-hidden')
// })

const overlay = document.getElementById("modal-overlay");
const closeBtn = document.getElementById("close-modal");
const buttons = document.querySelectorAll(".btn");

// OPEN modal
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        overlay.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scroll
    });
});

// CLOSE modal
function closeModal() {
    overlay.classList.remove("active");
    document.body.style.overflow = ""; // Restore scroll
}

closeBtn.addEventListener("click", closeModal);

// ESC to close
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});
