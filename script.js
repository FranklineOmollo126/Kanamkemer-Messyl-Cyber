//  HERO SLIDER
        (function() {
            const slides = document.querySelectorAll('.slide');
            const dotsContainer = document.getElementById('sliderDots');
            let currentIndex = 0;
            let intervalId = null;
            const intervalTime = 3000;

            // Create dots
            slides.forEach((_, idx) => {
                const dot = document.createElement('span');
                dot.dataset.index = idx;
                if (idx === 0) dot.classList.add('active-dot');
                dotsContainer.appendChild(dot);
            });
