
    //fecthing the movie list from the csv file
    function fetchMovieList() {
        return fetch('MovieDuel_List.csv')
            .then(response => response.text())
            .then(text => {
                const rows = text.split("\n").map(row => row.split(",").map(item => item.trim()));
                const matrix = rows.slice(1); // Remove header row
                const numberOfRows = matrix.length;
                return { matrix, numberOfRows };
            })
            .catch(error => console.error("Error loading CSV:", error));
    }

    //====================================================================================================
    // Carousel
    const carousel = document.querySelector(".carousel");

    // Populate the carousel
    function populateCarousel(themes) {
        themes.forEach(theme => {
            const span = document.createElement("span");
            span.textContent = theme;
            carousel.appendChild(span);
        });
    }
    
    // Rotate words dynamically
    function rotateThemes() {
        const firstTheme = carousel.firstElementChild;
    
        // Slide out the first word smoothly
        firstTheme.style.transition = "transform ease-out";
        firstTheme.style.transform = "translateX(-100%)";
    
       
            // Move first word to the end and reset position
            carousel.appendChild(firstTheme);
            firstTheme.style.transition = "none";
            firstTheme.style.transform = "translateX(0)";
       
    }

    //====================================================================================================

    function displayTheme(theme, index) {
        const HTMLString = `${index}: ${theme}<br>`;
        const targetInputContainer = document.getElementById("theme_list");
        targetInputContainer.innerHTML = HTMLString;
    }

    function generateRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    function drawMovie(themes, numberOfRows) {
        const randomIndex = generateRandomNumber(numberOfRows);
        const randomTheme = themes[randomIndex];
        displayTheme(randomTheme, randomIndex);
    }



    //====================================================================================================
    
    
    
    fetchMovieList().then(({ matrix, numberOfRows }) => {
        const themes = matrix.map(row => row[0]);
        // Initialize
        populateCarousel(themes);
        setInterval(rotateThemes, 500); // Rotate every 2 seconds
        const drawButton = document.getElementById("draw_button");
        drawButton.addEventListener("click", () => drawMovie(themes, numberOfRows));
    });
    

    
    
    
    
    