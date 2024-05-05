        
var loggedIn = false;
var username = "";

function typeWelcomeMessage(message, index, terminal) {
    if (index < message.length) {
        terminal.innerHTML += message.charAt(index);
        index++;
        setTimeout(function() {
            typeWelcomeMessage(message, index, terminal);
        }, 10 + Math.random() * 10); // Random short delays
    } else {
        // After typing the welcome message, start typing drive text
        var fileText = generateFileNames();
        setTimeout(function() {
            typeFileNames(fileText, 0, terminal);
        }, 1000); // Delay before typing files
    }
}

function typeFileNames(fileText, index, terminal) {
    var lines = fileText.split("<br>");
    var lineIndex = 0;

    function typeLine() {
        if (lineIndex < lines.length) {
            var line = lines[lineIndex];
            var lineDiv = document.createElement("div");
            lineDiv.className = "output";
            lineDiv.innerHTML = line;
            terminal.appendChild(lineDiv);
            lineIndex++;
            setTimeout(typeLine, 50 + Math.random() * 20); // Random short delays
        } else {
            // After typing the drive text, clear the terminal and show input field
            setTimeout(function() {
                terminal.innerHTML = ""; // Clear terminal window
                terminal.innerHTML += "<h2>Tesla-Arch v.1782.0.1</h2><br>";
                terminal.innerHTML += "<h3>Property of: █████ ███████</h3><br><br><br>";
                terminal.innerHTML += "Please proceed to 'login':<br>";
                terminal.innerHTML += "<div class='input'><span class='prompt'>$</span> <span id='userInput' contenteditable='true'></span></div>";
                document.getElementById("userInput").focus(); // Set focus to input field
            }, 1000);
        }
    }

    typeLine();
}

function handleUserInput(event) {
    if (!loggedIn && event.key === "Enter") {
        var userInput = document.getElementById("userInput").textContent.trim();
        event.preventDefault();
        var output = document.createElement("div");
        output.className = "output";
        if (userInput.toLowerCase() === "login") {
            loggedIn = true;
            output.innerHTML = "> Enter your class:";
            document.getElementById("userInput").textContent = ""; // Clear input field
        } else {
            output.innerHTML = "> Invalid command.";
        }
        document.querySelector(".terminal").appendChild(output);
    } else if (loggedIn && event.key === "Enter") {
        event.preventDefault();
        username = document.getElementById("userInput").textContent.trim();
        console.log("Username:", username); // Save username
        displayWelcomeMessage(username); // Display welcome message
    }
}

function displayWelcomeMessage(username) {
    var output = document.createElement("div");
    output.className = "output";
    output.innerHTML = '<a href="challenge1.html" style="color:#0f0;">Welcome, ' + username + '!</a>';
    document.querySelector(".terminal").appendChild(output);
    
}

// Function to generate file names based on the provided text
function generateFileNames() {
    var location = ["core_system"]
    var drives = ["C:"];
    var files = [
        "boot.bin",
        "config.txt",
        "kernel.bin",
        "main.c",
        "shell.c",
        "shell.h",
        "user.c",
        "user.h",
        "welcome.html",
        "welcome.css",
        "escape_room.exe"
    ];

    var fileNames = "";
    for (var i = 0; i < drives.length; i++) {
        for (var k = 0; k < files.length; k++) {
            for (var t = 0; t < location.length; t++) {
            fileNames += drives[i] + "\\" + location[t] + "\\" + files[k] + "<br>";
        }
        }
    }

    return fileNames;
}

// Show terminal and type welcome message after a delay
setTimeout(function() {
    var terminal = document.getElementById("terminal");
    terminal.style.display = "block";
    typeWelcomeMessage("Booting up...", 0, document.getElementById("welcomeMessage"));
}, );

document.addEventListener("keydown", handleUserInput);