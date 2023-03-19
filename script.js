// Name color change
colorCarousel();
// Add links
setMouseClicks('img-github', 'https://github.com/TheLDT');
setMouseClicks('img-linkedin', 'https://www.linkedin.com/in/giorgos-lydiotis-2922a0226/');
setMouseClicks('img-fiverr', 'https://www.fiverr.com/theldt?up_rollout=true');
setMouseClicks('img-kofi', 'https://ko-fi.com/theldt');
//Theme Toggler
switchTheme();
//Functions
function colorCarousel() {
    let title = document.getElementById("header-title");
    let textEn = "Giorgos Lydiotis";

    title.textContent = "";
    for (let j = 0; j < textEn.length; j++) {
        let div = document.createElement("span");
        div.textContent = textEn.charAt(j);
        div.classList.add("word-normal");
        title.appendChild(div)
    }
    let intervalID = setInterval(colors, 200);
    let i = 0;
    let remove = false;

    function colors() {
        if (remove) {
            title.children[i].classList.remove("word-emphasis");
        } else {
            title.children[i].classList.add("word-emphasis");
        }
        i++;
        if (i >= textEn.length) {
            remove = !remove;
            i = 0;
        }
    }
}

// Useful links
function setMouseClicks(id, link) {
    let el = document.getElementById(id);
    if (el) {
        el.onclick = () => {
            window.open(link);
        }
    }
}

//Theme toggler
function switchTheme() {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

    toggleSwitch.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }, false);


    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;



    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    } else { //no saved theme impying first use of page
        const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
        if (matchMedia.matches) {//is dark theme
            toggleSwitch.checked = true;
        }
    }
}