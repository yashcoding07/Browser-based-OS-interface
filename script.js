let lockScreen = document.querySelector('.lock-screen');
let passwordScreen = document.querySelector('.password-screen');

lockScreen.addEventListener('click', () => {
    gsap.to(lockScreen, {
        y: '-100%',
        duration: 0.8,
        ease: "power1.out",
        onComplete: () => {
            lockScreen.style.display = "none";
        }
    });
});

function updateTime() {
    let now = new Date();
    let options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    let time = now.toLocaleTimeString([], options);
    time = time.slice(0, -3).trim();
    document.querySelector(".time").innerHTML = time;
}

setInterval(updateTime, 1000);
updateTime();

function updateDate() {
    let now = new Date();
    let options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    }
    let date = now.toLocaleDateString('en-US', options);
    document.querySelector('.date').innerHTML = date;
}

updateDate();

if (!localStorage.getItem('password')) {
    localStorage.setItem('password', 1234);
}


let passwordInput = document.querySelector('.admin input');
let desktop = document.querySelector('.desktop-bg');
let pin = localStorage.getItem('password');

passwordInput.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        let password = passwordInput.value;
        if (password == pin) {
            gsap.to(passwordScreen, {
                opacity: 0,
                duration: 0.6,
                onComplete: () => {
                    passwordInput.value = "";
                    passwordScreen.style.display = "none";
                    desktop.style.display = "block";
                }
            })
            gsap.fromTo(desktop,
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: 'power2.out' }
            );
        } else {
            gsap.fromTo(passwordInput,
                { x: -10 },
                { x: 10, duration: 0.1, yoyo: true, repeat: 3, ease: 'power2.inOut' }
            );
        }
    }
})

let weather = document.querySelector('.weather');
let weatherTab = document.querySelector('.weatherTab');

gsap.set(weatherTab, { x: "-101%" });

function showWeatherTab() {
    gsap.to(weatherTab, {
        x: "0%",
        duration: 0.6,
        ease: "power2.out"
    });
}

function hideWeatherTab() {
    gsap.to(weatherTab, {
        x: "-101%",
        duration: 0.4,
        ease: "power2.out"
    });
}

weather.addEventListener("mouseenter", showWeatherTab);
weatherTab.addEventListener("mouseenter", showWeatherTab);

weather.addEventListener("mouseleave", hideWeatherTab);
weatherTab.addEventListener("mouseleave", hideWeatherTab);



const start = document.querySelector('.start-icon');
const startMenu = document.querySelector('.start-menu');
let startshowing = 1;

gsap.set(startMenu, { y: "120%" });

start.addEventListener('click', () => {
    if (startshowing == 1) {
        gsap.to(startMenu, {
            y: '0%',
            duration: 0.6,
            ease: "power2.inout"
        })
        startshowing = 0;
    } else {
        gsap.to(startMenu, {
            y: '120%',
            duration: 0.6,
            ease: "power2.inout"
        })
        startshowing = 1;
    }
})

const icons = document.querySelectorAll('.desktop-icon');

let offsetX, offsetY, isDragging = false, currentIcon = null;

icons.forEach(icon => {
    icon.style.position = 'absolute';
    icon.addEventListener('mousedown', (e) => {
        isDragging = true;
        currentIcon = icon;
        offsetX = e.clientX - icon.getBoundingClientRect().left;
        offsetY = e.clientY - icon.getBoundingClientRect().top;
        icon.style.cursor = 'grabbing';
    });
})

document.addEventListener('mousemove', (e) => {
    if (!isDragging || !currentIcon) return
    currentIcon.style.opacity = 0.5;
    currentIcon.style.left = `${e.clientX - offsetX}px`;
    currentIcon.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener('mouseup', () => {
    if (currentIcon) {
        currentIcon.style.cursor = 'grab';
        currentIcon.style.opacity = 1;
    }
    isDragging = false;
    currentIcon = null;
})

icons.forEach((icon, i) => {
    const col = i % 1;
    const row = Math.floor(i / 1);
    icon.style.left = `${col * 100 + 10}px`;
    icon.style.top = `${row * 100 + 10}px`;
});

let data = null;

async function fetchWeather() {
    const weather = await fetch('https://api.openweathermap.org/data/2.5/weather?q=vadodara&appid=b41b1e7525f8ea673bf8344a628b73ed');
    data = await weather.json();

    document.querySelector('.weather-details h1').innerHTML = `${data.main.temp}°F`;
    document.querySelector('.weather-text .f').innerHTML = `${data.main.temp}°F`;
    document.querySelector('.weather-text .info').innerHTML = `${data.weather[0].description}`;
}

fetchWeather();

function datemonth() {
    const date = new Date();
    const option1 = {
        month: 'long',
        day: 'numeric'
    }
    const option2 = {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
    }
    const option3 = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }
    let weathertab = date.toLocaleDateString('en-US', option1);
    let datetab = date.toLocaleDateString('en-US', option2);
    let timetab = date.toLocaleTimeString([], option3);
    document.querySelector('.date-time .time').innerHTML = `${timetab}`;
    document.querySelector('.right-date').innerHTML = `${datetab}`;
    document.querySelector('.weather-tab-date p').innerHTML = `${weathertab}`;
}

setInterval(datemonth, 1000);
datemonth();

const contextMenu = document.querySelector('.context-menu');

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    contextMenu.style.top = `${e.clientY}px`;
    contextMenu.style.left = `${e.clientX}px`;
    contextMenu.style.display = 'block';
});

document.addEventListener('click', () => {
    contextMenu.style.display = 'none';
})

contextMenu.addEventListener('click', (e) => {
    e.stopPropagation();
})

window.addEventListener('DOMContentLoaded', () => {
    if (contextMenu) {
        contextMenu.style.display = 'none';
    }
});

const fileExplorer = document.querySelector('.file-explorer');
const fileSystem = document.querySelector(".file-system");

gsap.set(fileSystem, { y: 50, opacity: 0, display: "none" });

fileExplorer.addEventListener('dblclick', () => {
    fileSystem.style.display = "block";
    gsap.to(fileSystem, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    });
    fileExplorer.style.borderBottom = "3px solid white";

});

const closeBtn = document.querySelector('.close');
const fsBtn = document.querySelector('.fullsc');
const miniBtn = document.querySelector('.mini');

closeBtn.addEventListener('click', () => {
    gsap.to(fileSystem, {
        y: 50,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
            fileSystem.style.display = "none";
        }
    });
    fileExplorer.style.borderBottom = "none";
});

miniBtn.addEventListener('click', () => {
    gsap.to(fileSystem, {
        y: 50,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
            fileSystem.style.display = "none";
        }
    });
    fileExplorer.style.borderBottom = "3px solid white";
});

fsBtn.addEventListener('click', () => {
    fileSystem.style.position = "absolute";
    fileSystem.style.top = "0";
    fileSystem.style.left = "0";
    fileSystem.style.width = "100vw";
    fileSystem.style.height = "100vh";
    fileSystem.style.display = "block";
    fileSystem.style.zIndex = "999";
    document.body.style.overflow = "hidden";
});

const hidden = document.querySelector('.hidden-icons');
const hiddenIcon = document.querySelector('.hidden-icons i');
const theme = document.querySelector('.theme');
let counter = 1;

hidden.addEventListener('click', () => {
    if (counter == 1) {
        theme.style.display = 'block';
        gsap.to(theme, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        })
        counter = 0;
    } else {
        gsap.to(theme, {
            y: 50,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
               theme.style.display = 'none';
            }
        })
        counter = 1;
    }
});

const quickSettings = document.querySelector('.quick-settings');
const qsClose = document.querySelector('.qs-close');
const wifiIcon = document.querySelector('.wifi-sound-battery .wifi');
const wifiDiv = document.querySelector('.wifi-sound-battery');

wifiDiv.addEventListener('click',()=>{
    quickSettings.style.display = 'block';
});

wifiIcon.addEventListener('click', () => {
    quickSettings.style.display = 'block';
});

qsClose.addEventListener('click', () => {
    quickSettings.style.display = 'none';
});

const brightnessSlider = document.querySelector('.qs-slider input[type="range"]');
const mainContent = document.querySelector('.desktop');

brightnessSlider.addEventListener('input', (e) => {
    const value = e.target.value; 
    const brightness = 0.3 + (value / 100) * 0.7;
    mainContent.style.filter = `brightness(${brightness})`;
});

document.querySelector('.vscode-icon').addEventListener('dblclick', function() {
    window.open('https://vscode.dev/', '_blank', 'noopener');
});

document.querySelector('.MS-store').addEventListener('dblclick', function() {
    window.open('https://www.microsoft.com/en-in/store/top-free/apps/pc?msockid=129e15216b7d6d920c4c006a6ae66c28', '_blank', 'noopener');
});
document.querySelector('.bing').addEventListener('dblclick', function() {
    window.open('https://www.bing.com/', '_blank', 'noopener');
});
document.querySelector('.MS-copilot').addEventListener('dblclick', function() {
    window.open('https://copilot.microsoft.com/chats/3tQae3gBWtoroAW7viqod', '_blank', 'noopener');
});

const power = document.querySelector(".power");
const shutScreen = document.querySelector(".shutdown-screen");
const turnOn = document.querySelector(".turn-On");

gsap.set(shutScreen, {
    opacity: 0,
    display: "none"
});

power.addEventListener("click",()=>{
    shutScreen.style.display = "flex";
    gsap.to(shutScreen, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    });
});

turnOn.addEventListener("click", () => {
    gsap.to(shutScreen, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
            shutScreen.style.display = "none";
        }
    });
    gsap.to(lockScreen, {
        y: '0%',
        duration: 0.8,
        ease: "power1.out",
        onComplete: () => {
            lockScreen.style.display = "block";
        }
    });
});

const newFolderBtn = document.getElementById('new-folder-btn');
const foldersContainer = document.querySelector('.folders');
const desktopIconsContainer = document.querySelector('.desktop-icons');

let folderCount = 1;

newFolderBtn.addEventListener('click', () => {
    const folderDiv = document.createElement('div');
    folderDiv.className = 'folder';

    const img = document.createElement('img');
    img.src = "https://img.icons8.com/?size=100&id=WWogVNJDSfZ5&format=png&color=000000";
    img.alt = "Folder Icon";

    const nameDiv = document.createElement('div');
    nameDiv.className = 'folder-name';
    nameDiv.textContent = `New Folder${folderCount > 1 ? ' ' + folderCount : ''}`;

    folderDiv.appendChild(img);
    folderDiv.appendChild(nameDiv);

    foldersContainer.appendChild(folderDiv);

    const desktopDiv = document.createElement('div');
    desktopDiv.className = 'desktop-icon';

    const desktopImg = document.createElement('img');
    desktopImg.src = img.src;
    desktopImg.alt = "Folder Icon";

    const desktopP = document.createElement('p');
    desktopP.textContent = nameDiv.textContent;

    desktopDiv.appendChild(desktopImg);
    desktopDiv.appendChild(desktopP);

    // Position the new icon below the last one
    const allIcons = desktopIconsContainer.querySelectorAll('.desktop-icon');
    const index = allIcons.length - 1; // zero-based index for new icon
    desktopDiv.style.position = 'absolute';
    desktopDiv.style.left = `10px`;
    desktopDiv.style.top = `${index * 100 + 10}px`;

    desktopIconsContainer.appendChild(desktopDiv);

    // Make the new icon draggable
    makeIconDraggable(desktopDiv);

    // Make the folder name editable on double-click
    makeFolderRenameable(nameDiv);

    folderCount++;
});

function makeIconDraggable(icon) {
    let offsetX, offsetY, isDragging = false;

    icon.addEventListener('mousedown', (e) => {
        isDragging = true;
        currentIcon = icon;
        offsetX = e.clientX - icon.getBoundingClientRect().left;
        offsetY = e.clientY - icon.getBoundingClientRect().top;
        icon.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging || currentIcon !== icon) return;
        icon.style.opacity = 0.5;
        icon.style.left = `${e.clientX - offsetX}px`;
        icon.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener('mouseup', () => {
        if (currentIcon === icon) {
            icon.style.cursor = 'grab';
            icon.style.opacity = 1;
        }
        isDragging = false;
        currentIcon = null;
    });
}

function makeFolderRenameable(folderNameDiv) {
    folderNameDiv.addEventListener('dblclick', function () {
        const currentName = folderNameDiv.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentName;
        input.className = 'rename-input';
        folderNameDiv.textContent = '';
        folderNameDiv.appendChild(input);
        input.focus();

        function finishRename() {
            folderNameDiv.textContent = input.value.trim() || currentName;
        }

        input.addEventListener('blur', finishRename);
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                finishRename();
            }
        });
    });
}

const weatherGreeting = document.querySelector('.weatherTab h1');

function updateWeatherGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = "Hello";

    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning";
    } else if (hour >= 12 && hour < 16) {
        greeting = "Good Afternoon";
    } else if (hour >= 16 && hour < 19) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }

    if (weatherGreeting) {
        weatherGreeting.textContent = greeting;
    }
}

updateWeatherGreeting();

function addIconLink(selector, url) {
    document.querySelectorAll(selector).forEach(icon => {
        let downX = 0, downY = 0, moved = false;

        icon.addEventListener('mousedown', (e) => {
            downX = e.clientX;
            downY = e.clientY;
            moved = false;
        });

        icon.addEventListener('mousemove', (e) => {
            if (Math.abs(e.clientX - downX) > 5 || Math.abs(e.clientY - downY) > 5) {
                moved = true;
            }
        });

        icon.addEventListener('dblclick', (e) => {
            if (!moved) {
                window.open(url, '_blank', 'noopener');
            }
        });
    });
}

// Desktop icons
addIconLink('.desktop-icon.vscode-icon', 'https://vscode.dev/');
addIconLink('.desktop-icon.bing', 'https://www.bing.com/');
addIconLink('.desktop-icon.MS-store', 'https://www.microsoft.com/en-in/store/top-free/apps/pc?msockid=129e15216b7d6d920c4c006a6ae66c28');
addIconLink('.desktop-icon.MS-copilot', 'https://copilot.microsoft.com/chats/3tQae3gBWtoroAW7viqod');

// Start menu icons
addIconLink('.start-app.vscode-icon', 'https://vscode.dev/');
addIconLink('.start-app.bing', 'https://www.bing.com/');
addIconLink('.start-app.MS-store', 'https://www.microsoft.com/en-in/store/top-free/apps/pc?msockid=129e15216b7d6d920c4c006a6ae66c28');
addIconLink('.start-app.MS-copilot', 'https://copilot.microsoft.com/chats/3tQae3gBWtoroAW7viqod');