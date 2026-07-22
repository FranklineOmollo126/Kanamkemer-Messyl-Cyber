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
// BRANCH CONFIGURATION AND HANDLING

const branches = {
    main: {
        name: 'Main Branch - Kanamkemer Catholic Street',
        phone: '+254 717343717',
        whatsapp: '254717343717',
        email: 'messylcyber@gmail.com',
        address: 'Kanamkemer Catholic Street'
    },
    second: {
        name: 'Second Branch - (Messyl Orange) Kanam-Lodwar Town route',
        phone: '+254 742 502 651',
        whatsapp: '254742502651',
        email: 'messylcyber@gmail.com',
        address: 'Kanam-Lodwar Town route'
        
    }
};
// Function to submit form data to WhatsApp
function submitToWhatsapp() {
    // Get form values with proper IDs
    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const phone = document.getElementById('phone')?.value.trim() || '';
    const branch = document.getElementById('branchSelect')?.value || '';
    const service = document.getElementById('service')?.value || '';
    const message = document.getElementById('message')?.value.trim() || '';
    const fileInput = document.getElementById('fileAttachment');
    const file = fileInput?.files[0] || null;
    // Validate branch selection
    if (!branch) {
        alert('❌ Please select a branch before sending.');
        document.getElementById('branchSelect')?.focus();
        return false;
    }
    
    // Get branch details
    const branchDetails = branches[branch];
    if (!branchDetails) {
        alert('❌ Invalid branch selected.');
        return false;
    }
    
    // Get the phone number for the selected branch
    const phoneNumber = branchDetails.whatsapp;
    
    // Build the message
    let text = '*📋 NEW SERVICE INQUIRY*\n';
    text += '━'.repeat(30) + '\n\n';
    text += `*🏢 Branch:* ${branchDetails.name}\n`;
    text += `*📞 Branch Phone:* ${branchDetails.phone}\n`;
    text += `*📍 Branch Location:* ${branchDetails.address}\n\n`;
    text += '━'.repeat(30) + '\n\n';
    text += `*👤 Name:* ${name || 'Not provided'}\n`;
    text += `*📧 Email:* ${email || 'Not provided'}\n`;
    text += `*📱 Phone:* ${phone || 'Not provided'}\n`;
    text += `*🛠️ Service Needed:* ${service || 'Not specified'}\n\n`;
    text += '━'.repeat(30) + '\n\n';
    text += `*📝 Message:*\n${message || 'No message provided'}\n\n`;
    text += '━'.repeat(30) + '\n\n';
    
    // Add file information if attached
    if (file) {
        const fileSizeKB = (file.size / 1024).toFixed(1);
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        const fileSizeDisplay = fileSizeMB > 1 ? `${fileSizeMB} MB` : `${fileSizeKB} KB`;
        
        text += `*📎 File Attached:*\n`;
        text += `   📄 ${file.name}\n`;
        text += `   📊 Size: ${fileSizeDisplay}\n`;
        text += `   📁 Type: ${file.type || 'Unknown'}\n\n`;
        text += `⚠️ *IMPORTANT:* Please attach the file manually when sending this message.\n`;
        text += `   The file will not be sent automatically via WhatsApp.\n\n`;
    } else {
        text += `*📎 No file attached*\n\n`;
    }
    
    text += '━'.repeat(30) + '\n\n';
    text += `*📅 Sent:* ${new Date().toLocaleString()}\n`;
    text += `*✅ Please respond to this inquiry as soon as possible.*`;
    
    // Encode the message for URL
    const encodedText = encodeURIComponent(text);
    
    // Create WhatsApp URL with the branch-specific number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');
    
    
    alert(`✅ Your inquiry has been sent to:\n\n${branchDetails.name}\n📞 ${branchDetails.phone}\n\nPlease wait for a response.`);
    
    return true;
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitToWhatsapp();
    });
}
// FILE ATTACHMENT HANDLING
const fileInput = document.getElementById('fileAttachment');
const fileInfo = document.getElementById('fileInfo');

if (fileInput) {
    fileInput.addEventListener('change', function() {
        const fileName = this.files[0]?.name;
        const fileSize = this.files[0]?.size;
        const maxSize = 10 * 1024 * 1024;
        
        if (this.files.length > 0) {
            if (fileSize > maxSize) {
                alert('File is too large! Maximum size is 10MB.');
                this.value = '';
                fileInfo.innerHTML = `
                    <i class="fas fa-exclamation-circle" style="color: #d32f2f;"></i>
                    File too large! Maximum size is 10MB.
                `;
                fileInfo.style.color = '#d32f2f';
                return;
            }
            
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
            fileInfo.innerHTML = `
                <i class="fas fa-info-circle" style="color: #e67e22;"></i> 
                Supported formats: PDF, DOC, DOCX, JPG, PNG, TXT (Max 10MB)
            `;
            fileInfo.style.color = '#5a6e85';
        }
    });
}

function removeFile() {
    const fileInput = document.getElementById('fileAttachment');
    if (fileInput) {
        fileInput.value = '';
        const fileInfo = document.getElementById('fileInfo');
        fileInfo.innerHTML = `
            <i class="fas fa-info-circle" style="color: #e67e22;"></i> 
            Supported formats: PDF, DOC, DOCX, JPG, PNG, TXT (Max 10MB)
        `;
        fileInfo.style.color = '#5a6e85';
    }
}

// UPDATE WHATSAPP FLOAT BUTTON
function updateWhatsAppButton(branchKey) {
    const whatsappLink = document.getElementById('whatsappFloat');
    if (whatsappLink && branches[branchKey]) {
        const phone = branches[branchKey].whatsapp.replace(/[^0-9]/g, '');
        whatsappLink.href = `https://wa.me/${phone}`;
        whatsappLink.setAttribute('aria-label', `Chat on WhatsApp - ${branches[branchKey].name}`);
    }
}
// BRANCH SELECTION HANDLER
const branchSelect = document.getElementById('branchSelect');
if (branchSelect) {
    branchSelect.addEventListener('change', function() {
        const selectedBranch = this.value;
        
        // Remove existing branch info
        const existingInfo = document.querySelector('.branch-info');
        if (existingInfo) {
            existingInfo.remove();
        }
        
        if (selectedBranch && branches[selectedBranch]) {
            const branch = branches[selectedBranch];
            const infoDiv = document.createElement('div');
            infoDiv.className = `branch-info visible ${selectedBranch}`;
            infoDiv.innerHTML = `
                <i class="fas fa-store"></i>
                <strong>${branch.name}</strong><br>
                <i class="fas fa-phone"></i> ${branch.phone} 
                <i class="fab fa-whatsapp" style="margin-left:12px;"></i> ${branch.whatsapp}
            `;
            
            // Insert after the select
            this.parentNode.after(infoDiv);
            
            // Update WhatsApp button
            updateWhatsAppButton(selectedBranch);
        }
    });
}

/*
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
*/


// 6. CONSOLE CONFIRMATION


console.log('✅ All functionality loaded successfully!');
console.log('✅ Navbar active state working');
console.log('✅ Search functionality working');
console.log('✅ Hero slider working');
console.log('✅ Hamburger menu working');
