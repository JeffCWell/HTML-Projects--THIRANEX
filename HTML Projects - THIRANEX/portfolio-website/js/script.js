const toggleBtn = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {

    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {

        document.documentElement.removeAttribute("data-theme");

        localStorage.setItem("theme", "light");

        toggleBtn.textContent = "🌙";

    } else {

        document.documentElement.setAttribute("data-theme", "dark");

        localStorage.setItem("theme", "dark");

        toggleBtn.textContent = "☀️";

    }

});