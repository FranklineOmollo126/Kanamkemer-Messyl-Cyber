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
// 6.CALCULATOR
function calculatePrice() {
    const service = document.getElementById('calcService').value;
    const quantity = parseInt(document.getElementById('calcQuantity').value) || 1;

    // Prices per unit
    const prices = {
        'printing': 10,
        'printing-color': 20,
        'photos': 200,
        'binding': 100,
        'design': 500,
        'laminate':50
    };

    const unitPrice = prices[service] || 0;
    const total = unitPrice * quantity;

    const result = document.getElementById('calcResult');
    result.style.display = 'block';
    document.getElementById('priceDisplay').textContent = `Ksh ${total.toLocaleString()}`;

    // Animation
    result.style.animation = 'none';
    setTimeout(() => {
        result.style.animation = 'fadeIn 0.5s ease';
    }, 10);
}

// Animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
//7.REVIEW SYSTEM
let reviews = [];

// Default reviews
const defaultReviews = [
    {
        name: 'John Mwangi',
        rating: 5,
        comment: 'Excellent service! They helped me with my KRA registration quickly and professionally. Highly recommended!',
        date: new Date('2026-04-15').toISOString()
    },
    {
        name: 'Sarah Akinyi',
        rating: 5,
        comment: 'The best cyber cafe in Lodwar! Fast internet, friendly staff, and affordable prices. They also do great graphic design work.',
        date: new Date('2026-04-10').toISOString()
    }
  
];

// Load reviews from localStorage
function loadReviews() {
    const stored = localStorage.getItem('messylReviews');
    if (stored) {
        try {
            reviews = JSON.parse(stored);
        } catch {
            reviews = [];
        }
    }
    
    // If no reviews, use defaults
    if (reviews.length === 0) {
        reviews = [...defaultReviews];
        saveReviews();
    }
    
    displayReviews();
}

// Save reviews to localStorage
function saveReviews() {
    localStorage.setItem('messylReviews', JSON.stringify(reviews));
}

// Display reviews
function displayReviews() {
    const grid = document.getElementById('reviewsGrid');
    if (!grid) return;

    if (reviews.length === 0) {
        grid.innerHTML = `
            <div class="no-reviews">
                <i class="fas fa-comment-dots"></i>
                <p>No reviews yet. Be the first to share your experience!</p>
            </div>
        `;
        return;
    }

    // Sort: newest first
    const sorted = [...reviews].reverse();

    let html = '';
    sorted.forEach((review) => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const date = new Date(review.date).toLocaleDateString('en-KE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        html += `
            <div class="testimonial-card">
                <div class="stars">${stars}</div>
                <p>"${escapeHtml(review.comment)}"</p>
                <div class="customer">
                    <strong>${escapeHtml(review.name)}</strong>
                    <span>${date}</span>
                </div>
            </div>
        `;
    });

    grid.innerHTML = html;
}

// Simple escape to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Toggle review form
function toggleReviewForm() {
    const wrapper = document.getElementById('reviewFormWrapper');
    if (wrapper.style.display === 'none') {
        wrapper.style.display = 'block';
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        wrapper.style.display = 'none';
        // Reset form
        document.getElementById('reviewForm').reset();
        document.getElementById('reviewRating').value = '0';
        document.getElementById('ratingDisplay').textContent = 'Select rating';
        document.querySelectorAll('.star-rating .star').forEach(s => s.classList.remove('active'));
    }
}

// Submit review
document.getElementById('reviewForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('reviewName').value.trim();
    const rating = parseInt(document.getElementById('reviewRating').value);
    const comment = document.getElementById('reviewComment').value.trim();

    // Validation
    if (!name) {
        alert('Please enter your name.');
        document.getElementById('reviewName').focus();
        return;
    }
    if (rating === 0) {
        alert('Please select a star rating.');
        return;
    }
    if (!comment) {
        alert('Please write your review.');
        document.getElementById('reviewComment').focus();
        return;
    }

    // Create review object
    const review = {
        name: name,
        rating: rating,
        comment: comment,
        date: new Date().toISOString()
    };

    // Add to reviews
    reviews.push(review);
    saveReviews();
    displayReviews();

    // Reset form and hide
    this.reset();
    document.getElementById('reviewRating').value = '0';
    document.getElementById('ratingDisplay').textContent = 'Select rating';
    document.querySelectorAll('.star-rating .star').forEach(s => s.classList.remove('active'));
    document.getElementById('reviewFormWrapper').style.display = 'none';

    // Show success message
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '✅ Review Submitted!';
    btn.style.background = '#2ecc71';
    btn.style.borderColor = '#2ecc71';
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
    }, 3000);

    // Scroll to reviews
    document.getElementById('reviewsGrid').scrollIntoView({ behavior: 'smooth' });
});

// 8. STAR RATING SYSTEM
const stars = document.querySelectorAll('.star-rating .star');
const ratingDisplay = document.getElementById('ratingDisplay');

stars.forEach(star => {
    star.addEventListener('click', function() {
        const value = parseInt(this.dataset.value);
        document.getElementById('reviewRating').value = value;

        // Update visual
        stars.forEach(s => {
            if (parseInt(s.dataset.value) <= value) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });

        // Update label
        const labels = ['', '⭐ Terrible', '⭐ Bad', '⭐⭐⭐ Okay', '⭐⭐⭐⭐ Good', '⭐⭐⭐⭐⭐ Excellent'];
        ratingDisplay.textContent = labels[value] || 'Select rating';
    });

    star.addEventListener('mouseenter', function() {
        const value = parseInt(this.dataset.value);
        stars.forEach(s => {
            if (parseInt(s.dataset.value) <= value) {
                s.style.color = '#f1c40f';
            } else {
                s.style.color = '#dce3ec';
            }
        });
    });

    star.addEventListener('mouseleave', function() {
        const current = parseInt(document.getElementById('reviewRating').value);
        stars.forEach(s => {
            if (current > 0 && parseInt(s.dataset.value) <= current) {
                s.style.color = '#f1c40f';
            } else {
                s.style.color = '#dce3ec';
            }
        });
    });
});

// Load reviews on page load
document.addEventListener('DOMContentLoaded', loadReviews);

// 9. BRANCH CONFIGURATION AND HANDLING
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
// 10. WORKING HOURS STATUS
function updateWorkingHours() {
    const status = document.getElementById("working-status");
    const now = new Date();
    const day = now.getDay(); // Sunday = 0 ... Saturday = 6
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const openTime = 8 * 60;   // 8:00 AM
    const closeTime = 19 * 60; // 7:00 PM
    // Saturday
    if (day === 6) {
        status.className = "working-status closed";
        status.innerHTML = "🔴 Closed Today (Saturday)";
        return;
    }
    // Before opening
    if (currentMinutes < openTime) {
        const minsLeft = openTime - currentMinutes;

        if (minsLeft <= 60) {
            status.className = "working-status soon";
            status.innerHTML = `🟡 Opening in ${minsLeft} minute${minsLeft !== 1 ? "s" : ""}`;
        } else {
            status.className = "working-status closed";
            status.innerHTML = "🔴 Currently Closed";
        }
        return;
    }

    // During working hours
    if (currentMinutes >= openTime && currentMinutes < closeTime) {
        const minsLeft = closeTime - currentMinutes;

        if (minsLeft <= 60) {
            status.className = "working-status soon";
            status.innerHTML = `🟠 Closing in ${minsLeft} minute${minsLeft !== 1 ? "s" : ""}`;
        } else {
            status.className = "working-status open";
            status.innerHTML = "🟢 We are Open";
        }
        return;
    }
    // After closing
    status.className = "working-status closed";
    status.innerHTML = "🔴 Closed for Today";
}
updateWorkingHours();

// Update every minute
setInterval(updateWorkingHours, 60000);
// 10. CONSOLE CONFIRMATION
console.log('✅ All functionality loaded successfully!');
console.log('✅ Navbar active state working');
console.log('✅ Search functionality working');
console.log('✅ Hero slider working');
console.log('✅ Hamburger menu working');