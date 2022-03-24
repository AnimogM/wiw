let darkMode = localStorage.getItem("darkMode");
const toggleMode = document.querySelector(".toggler");

// console.log(btn);

const enableDarkMode = () => {
    
	document.body.classList.add("dark-mode");
	localStorage.setItem("darkMode", "enabled");
};
const disableDarkMode = () => {
    // btn.forEach(item => {
    //     console.log(item);
    //     item.classList.add("dark-btn")
    // })
	document.body.classList.remove("dark-mode");
	localStorage.setItem("darkMode", null);
};

if (darkMode === "enabled"){
    // btn.forEach((item) => {
	// 	item.classList.remove("dark-btn");
	// });
    enableDarkMode();
}

toggleMode.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
	if (darkMode !== "enabled") {
        enableDarkMode();
	} else {
		disableDarkMode();
	}
});
