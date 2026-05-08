document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.remove("fade-out");
    document.body.classList.add("show");
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateToggleButton(savedTheme);
    const links = document.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            if (href && href.includes(".html")) {
                e.preventDefault();
                document.body.classList.remove("show");
                document.body.classList.add("fade-out");
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });
    const toggleBtn = document.querySelector(".theme-toggle");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("data-theme");
            const next = current === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            localStorage.setItem("theme", next);
            updateToggleButton(next);
        });
    }
});

function updateToggleButton(theme) {
    const icon = document.querySelector(".theme-toggle .toggle-icon");
    const label = document.querySelector(".theme-toggle .toggle-label");
    if (!icon || !label) return;
    if (theme === "light") {
        icon.textContent = "🌙";
        label.textContent = "DARK";
    } else {
        icon.textContent = "☀️";
        label.textContent = "LIGHT";
    }
}

emailjs.init("0LXV1BPKUZzzgYFz0");
const form = document.getElementById("contact-form");
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };
    emailjs.send(
        "service_93dzuxe",
        "template_6gt389a",
        params
    )
    .then(function() {
        alert("Pesan berhasil dikirim!");
        form.reset();
    })
    .catch(function(error) {
        alert("Pesan gagal dikirim!");
        console.log(error);
    });
});