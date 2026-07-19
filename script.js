// 1. NAVBAR ACTIVE STATE
// Get all sections and nav links
const sections = document.querySelectorAll('section[id], .container[id]');
const navLinks = document.querySelectorAll('.nav-link');

// Function to update active link based on scroll position
function updateActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 120;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Update active link on scroll
window.addEventListener('scroll', updateActiveLink);

// Update active link on load - set Home as default
window.addEventListener('load', function() {
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
    updateActiveLink();
});
// 2. SMOOTH SCROLL WITH ACTIVE STATE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === "#") return;
        
        // Remove active class from all nav links
        navLinks.forEach(link => link.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navbarHeight = document.querySelector('.navbar-wrapper').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 3. SEARCH FUNCTIONALITY
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchResults = document.getElementById('searchResults');

// Service data for search
const services = [
    { name: 'Printing', icon: 'fa-print', section: '#services' },
    { name: 'Photocopying', icon: 'fa-copy', section: '#services' },
    { name: 'Binding', icon: 'fa-book', section: '#services' },
    { name: 'Passport Photos', icon: 'fa-camera', section: '#services' },
    { name: 'KRA Services', icon: 'fa-building-columns', section: '#services' },
    { name: 'Graphic Design', icon: 'fa-palette', section: '#services' },
    { name: 'Scanning & Emailing', icon: 'fa-envelope', section: '#services' },
    { name: 'Website Development', icon: 'fa-code', section: '#services' },
    { name: 'Online Applications', icon: 'fa-laptop', section: '#services' },
    { name: 'HELB Application', icon: 'fa-user-graduate', section: '#services' }
];

// Additional searchable content
const pages = [
    { name: 'Home', icon: 'fa-home', section: '#home' },
    { name: 'About Us', icon: 'fa-info-circle', section: '#about' },
    { name: 'Pricing', icon: 'fa-tag', section: '#pricing' },
    { name: 'Contact Us', icon: 'fa-envelope', section: '#contact' }
];

const allSearchable = [...services, ...pages];

function performSearch(query) {
    if (!query.trim()) {
        searchOverlay.classList.remove('active');
        return;
    }

    const results = allSearchable.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 40px; display: block; margin-bottom: 15px; color: #dce3ec;"></i>
                <h3 style="color: #0b2b4a; margin-bottom: 8px;">No results found</h3>
                <p style="color: #8a9bb0;">Try searching for "Printing", "KRA", or "Website"</p>
            </div>
        `;
        searchOverlay.classList.add('active');
        return;
    }

    let resultsHTML = '';
    results.forEach(item => {
        resultsHTML += `
            <div class="result-item" data-section="${item.section}">
                <i class="fas ${item.icon}"></i>
                <div>
                    <div class="result-title">${item.name}</div>
                    <div class="result-desc">Click to navigate to ${item.name}</div>
                </div>
            </div>
        `;
    });

    searchResults.innerHTML = resultsHTML;
    searchOverlay.classList.add('active');

    // Add click listeners to results
    document.querySelectorAll('.result-item').forEach(item => {
        item.addEventListener('click', function() {
            const section = this.dataset.section;
            const target = document.querySelector(section);
            if (target) {
                const navbarHeight = document.querySelector('.navbar-wrapper').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close search overlay
                searchOverlay.classList.remove('active');
                searchInput.value = '';
            }
        });
    });
}

// Search event listeners
searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    performSearch(searchInput.value);
});

searchInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        performSearch(this.value);
    }
});

// Close search overlay when clicking outside
document.addEventListener('click', function(e) {
    if (searchOverlay.classList.contains('active')) {
        if (!searchOverlay.contains(e.target) && 
            !searchInput.contains(e.target) && 
            !searchBtn.contains(e.target)) {
            searchOverlay.classList.remove('active');
        }
    }
});

// Close on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
    }
});


// 4. HERO SLIDER


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

    const dots = dotsContainer.querySelectorAll('span');

    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active-dot'));

        slides[index].classList.add('active');
        dots[index].classList.add('active-dot');
        currentIndex = index;
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function startSlider() {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(nextSlide, intervalTime);
    }

    function stopSlider() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    // Dot clicks
    dots.forEach((dot) => {
        dot.addEventListener('click', function() {
            const idx = parseInt(this.dataset.index, 10);
            stopSlider();
            goToSlide(idx);
            startSlider();
        });
    });

    // Pause on hover/touch
    const sliderContainer = document.getElementById('heroSlider');
    sliderContainer.addEventListener('mouseenter', stopSlider);
    sliderContainer.addEventListener('mouseleave', startSlider);
    sliderContainer.addEventListener('touchstart', stopSlider, { passive: true });
    sliderContainer.addEventListener('touchend', startSlider, { passive: true });

    // Init
    goToSlide(0);
    startSlider();

    console.log('✅ Image slider running – switches every 3 seconds.');
})();

// 5. HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinksMenu.classList.toggle('active');
});

// Close menu on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksMenu.classList.remove('active');
    });
});

/**

// 6. CONTACT FORM SUBMISSION- with web3forms submiting to gmail
const form = document.getElementById('contactForm'); 
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "7f722677-cde5-4a2f-bd25-f154fc89b167");

    const originalHTML = submitBtn.innerHTML; 

    submitBtn.innerHTML = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        alert("Success! Your message has been sent.");
        form.reset();
      } else {
        alert("Error: " + data.message);
      }

    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      submitBtn.innerHTML = originalHTML; 
      submitBtn.disabled = false;
    }
  });

// 7. FILE ATTACHMENT HANDLING
const fileInput = document.getElementById('fileAttachment');
const fileInfo = document.getElementById('fileInfo');

if (fileInput) {
    // Show file name when selected
    fileInput.addEventListener('change', function() {
        const fileName = this.files[0]?.name;
        const fileSize = this.files[0]?.size;
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        if (this.files.length > 0) {
            // Check file size
            if (fileSize > maxSize) {
                alert('File is too large! Maximum size is 5MB.');
                this.value = ''; // Clear the input
                fileInfo.innerHTML = `
                    <i class="fas fa-exclamation-circle" style="color: #d32f2f;"></i>
                    File too large! Maximum size is 5MB. Supported formats: PDF, DOC, DOCX, JPG, PNG, TXT
                `;
                fileInfo.style.color = '#d32f2f';
                return;
            }
            
            // Show success message with file name
            fileInfo.innerHTML = `
                <div class="file-selected">
                    <i class="fas fa-file"></i>
                    <span>${fileName}</span>
                    <span style="font-size: 0.75rem; color: #5a6e85;">
                        (${(fileSize / 1024).toFixed(1)} KB)
                    </span>
                    <span class="remove-file" onclick="removeFile()">
                        <i class="fas fa-times"></i>
                    </span>
                </div>
            `;
            fileInfo.style.color = '#2e7d32';
        } else {
            // Reset if no file selected
            fileInfo.innerHTML = `
                <i class="fas fa-info-circle" style="color: #e67e22;"></i> 
                Supported formats: PDF, DOC, DOCX, JPG, PNG, TXT (Max 5MB)
            `;
            fileInfo.style.color = '#5a6e85';
        }
    });
}

// Function to remove the selected file
function removeFile() {
    const fileInput = document.getElementById('fileAttachment');
    if (fileInput) {
        fileInput.value = '';
        const fileInfo = document.getElementById('fileInfo');
        fileInfo.innerHTML = `
            <i class="fas fa-info-circle" style="color: #e67e22;"></i> 
            Supported formats: PDF, DOC, DOCX, JPG, PNG, TXT (Max 5MB)
        `;
        fileInfo.style.color = '#5a6e85';
    }
}
// 8. CONTACT FORM WITH FILE ATTACHMENT

 *
 
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]')?.value || '';
        const email = this.querySelector('input[type="email"]')?.value || '';
        const phone = this.querySelector('input[type="tel"]')?.value || '';
        const service = this.querySelector('select')?.value || '';
        const message = this.querySelector('textarea')?.value || '';
        const file = document.getElementById('fileAttachment')?.files[0] || null;
        
        // Build message
        let alertMessage = `Thank you ${name}! We have received your message.\n\n`;
        alertMessage += `Service Requested: ${service}\n`;
        alertMessage += `Email: ${email}\n`;
        alertMessage += `Phone: ${phone || 'Not provided'}\n`;
        alertMessage += `Message: ${message || 'No message provided'}\n`;
        
        if (file) {
            alertMessage += `\n📎 File Attached: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        } else {
            alertMessage += `\n📎 No file attached`;
        }
        
        alertMessage += `\n\nWe will get back to you soon!`;
        
        // Show success message
        alert(alertMessage);
        
        // Reset form
        this.reset();
        
        // Reset file info
        const fileInfo = document.getElementById('fileInfo');
        if (fileInfo) {
            fileInfo.innerHTML = `
                <i class="fas fa-info-circle" style="color: #e67e22;"></i> 
                Supported formats: PDF, DOC, DOCX, JPG, PNG, TXT (Max 5MB)
            `;
            fileInfo.style.color = '#5a6e85';
        }
    });
}

*/

function submitToWhatsapp() {
    const phoneNumber = "254768255174";

    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const phone = document.getElementById("phone")?.value.trim() || "";
    const service = document.getElementById("service")?.value.trim() || "";
    const message = document.getElementById("message")?.value.trim() || "";

    const text = `*New Service Inquiry*

    *Name:* ${name}
    *Email:* ${email}
    *Phone:* ${phone}
    *Service:* ${service}

    *Message:*
    ${message}

     If you have any document or image, please attach it before sending this message.`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    window.open(whatsappURL, "_blank");
}



// 7. CONSOLE CONFIRMATION


console.log('✅ All functionality loaded successfully!');
console.log('✅ Navbar active state working');
console.log('✅ Search functionality working');
console.log('✅ Hero slider working');
console.log('✅ Hamburger menu working');
