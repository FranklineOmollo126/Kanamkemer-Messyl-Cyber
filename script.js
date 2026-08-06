// 1. LANGUAGE DATA 
const translations = {
    en: {
        title: 'Messyl Business Center',
        heroTitle: 'Your Trusted Digital Service Hub',
        heroDesc: 'Fast, affordable and reliable cyber services for students, businesses and professionals.',
        exploreBtn: 'Explore Services',
        aboutTitle: 'About Messyl Enterprises',
        servicesTitle: 'Our Services',
        pricingTitle: 'Popular Pricing',
        contactTitle: 'Get in Touch'
    },
    sw: {
        title: 'Kituo cha Biashara Messyl',
        heroTitle: 'Kituo chako cha Huduma za Dijiti',
        heroDesc: 'Huduma za haraka, nafuu na za kuaminika kwa wanafunzi, wafanyabiashara na wataalamu.',
        exploreBtn: 'Tazama Huduma',
        aboutTitle: 'Kuhusu Messyl Enterprises',
        servicesTitle: 'Huduma Zetu',
        pricingTitle: 'Bei Maarufu',
        contactTitle: 'Wasiliana Nasi'
    }
};

let currentLang = 'en';

function changeLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    if (!t) return;

    document.querySelector('.hero-text h1').innerHTML = t.heroTitle.replace('Digital Service', '<span>Digital Service</span>');
    document.querySelector('.hero-text p').textContent = t.heroDesc;
    document.querySelector('.hero-text .btn').textContent = t.exploreBtn;
    document.querySelector('#about .about-header h2').textContent = t.aboutTitle;
    document.querySelector('#services h2').textContent = t.servicesTitle;
    document.querySelector('#pricing h2').textContent = t.pricingTitle;
    document.querySelector('#contact .section-header h2').textContent = t.contactTitle;
    document.querySelector('.logo').innerHTML = `<img src="mbc.jpeg" alt="Messyl Business Center"> ${t.title}<span>.</span>`;
}

document.getElementById('languageSwitcher').addEventListener('change', function() {
    changeLanguage(this.value);
});

// 2. THEME TOGGLE 
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('themeIcon');
    if (document.body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('themeIcon').className = 'fas fa-sun';
}

// 3. ACCESSIBILITY 
let fontSize = 16;

function increaseFont() {
    fontSize += 2;
    document.body.style.fontSize = fontSize + 'px';
}

function decreaseFont() {
    if (fontSize > 12) {
        fontSize -= 2;
        document.body.style.fontSize = fontSize + 'px';
    }
}

function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

// 4. NAVBAR ACTIVE 
const sections = document.querySelectorAll('section[id], .container[id]');
const navLinks = document.querySelectorAll('.nav-link');

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

window.addEventListener('scroll', updateActiveLink);

// 5. SMOOTH SCROLL 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === "#") return;
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navbarHeight = document.querySelector('.navbar-wrapper').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// 6. SEARCH 
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchResults = document.getElementById('searchResults');

const services = [
    { name: 'Messyl', section: '#about-messyl'},
    { name: 'Printing', icon: 'fa-print', section: '#services' },
    { name: 'Lamination', icon: 'fa-layer-group', section: '#services'},
    { name: 'Photocopying', icon: 'fa-copy', section: '#services' },
    { name: 'Binding', icon: 'fa-book', section: '#services' },
    { name: 'Passport Photos', icon: 'fa-camera', section: '#services' },
    { name: 'KRA Services', icon: 'fa-building-columns', section: '#services' },
    { name: 'Graphic Design', icon: 'fa-palette', section: '#services' },
    { name: 'Scanning & Emailing', icon: 'fa-envelope', section: '#services' },
    { name: 'Website Development', icon: 'fa-code', section: '#services' },
    { name: 'Online Applications', icon: 'fa-laptop', section: '#services' },
    { name: 'HELB Application', icon: 'fa-user-graduate', section: '#services' },
    { name: 'Home', icon: 'fa-home', section: '#home' },
    { name: 'About Us', icon: 'fa-info-circle', section: '#about' },
    { name: 'Vision', icon: 'fas fa-eye', section: '#vision'},
    { name: 'Mission', icon: 'fas fa-bullseye', section: '#mission'},
    { name: 'Values', icon: 'fas fa-heart', section: '#values'},
    { name: 'Pricing', icon: 'fa-tag', section: '#pricing' },
    { name: 'Book Now',icon: 'fas fa-calendar-alt', section: '#booking'},
    { name: 'Contact Us', icon: 'fa-envelope', section: '#contact' },
    { name: 'Gallery', icon: 'fa-images', section: '#gallery' },
    { name: 'Testimonials', icon: 'fa-star', section: '#testimonials' }
];

function performSearch(query) {
    if (!query.trim()) { searchOverlay.classList.remove('active'); return; }
    const results = services.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size:40px;display:block;margin-bottom:15px;color:#dce3ec;"></i>
                <h3 style="color:var(--dark);margin-bottom:8px;">No results found</h3>
                <p style="color:var(--gray-light);">Try searching for "Printing", "KRA", or "Website"</p>
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
                    <div class="result-desc">Click me to navigate to ${item.name}😊</div>
                </div>
            </div>
        `;
    });
    searchResults.innerHTML = resultsHTML;
    searchOverlay.classList.add('active');

    document.querySelectorAll('.result-item').forEach(item => {
        item.addEventListener('click', function() {
            const section = this.dataset.section;
            const target = document.querySelector(section);
            if (target) {
                const navbarHeight = document.querySelector('.navbar-wrapper').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                searchOverlay.classList.remove('active');
                searchInput.value = '';
            }
        });
    });
}

searchBtn.addEventListener('click', function(e) { e.preventDefault();
    performSearch(searchInput.value); });
searchInput.addEventListener('keyup', function(e) { if (e.key === 'Enter') performSearch(this.value); });

document.addEventListener('click', function(e) {
    if (searchOverlay.classList.contains('active')) {
        if (!searchOverlay.contains(e.target) && !searchInput.contains(e.target) && !searchBtn.contains(e.target)) {
            searchOverlay.classList.remove('active');
        }
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
    }
});

// 7. HERO SLIDER 
(function() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('sliderDots');
    let currentIndex = 0;
    let intervalId = null;
    const intervalTime = 3000;

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

    function nextSlide() { goToSlide(currentIndex + 1); }

    function startSlider() {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(nextSlide, intervalTime);
    }

    function stopSlider() { if (intervalId) { clearInterval(intervalId);
            intervalId = null; } }

    dots.forEach((dot) => {
        dot.addEventListener('click', function() {
            const idx = parseInt(this.dataset.index, 10);
            stopSlider();
            goToSlide(idx);
            startSlider();
        });
    });

    const sliderContainer = document.getElementById('heroSlider');
    sliderContainer.addEventListener('mouseenter', stopSlider);
    sliderContainer.addEventListener('mouseleave', startSlider);

    goToSlide(0);
    startSlider();
})();

// 8. HAMBURGER 
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('navLinks');
let isUserOpening = false;

// Function to close menu 
function closeMenu() {
    if (!navLinksMenu) return;
    
    navLinksMenu.classList.remove('active');
    
    const icon = hamburger?.querySelector('i');
    if (icon) {
        icon.className = 'fas fa-bars';
    }
    isUserOpening = false;
}

// Function to open menu 
function openMenu() {
    if (!navLinksMenu) return;
    
    navLinksMenu.classList.add('active');
    
    const icon = hamburger?.querySelector('i');
    if (icon) {
        icon.className = 'fas fa-times';
    }    
    isUserOpening = true;
    
    setTimeout(() => {
        isUserOpening = false;
    }, 500);
}

// Toggle menu on hamburger click
if (hamburger && navLinksMenu) {
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (navLinksMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinksMenu.classList.contains('active')) {
            const isClickInsideMenu = navLinksMenu.contains(e.target);
            const isClickOnHamburger = hamburger.contains(e.target);
            
            if (!isClickInsideMenu && !isClickOnHamburger) {
                closeMenu();
            }
        }
    });

    //  SCROLL TO CLOSE MENU 
    window.addEventListener('scroll', function() {
        if (navLinksMenu.classList.contains('active') && !isUserOpening) {
            closeMenu();
        }
    });

    // Close menu when window is resized to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinksMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu when a nav link is clicked (mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
}
console.log('✅ Hamburger menu loaded - scroll while open + scroll to close!');

// 9. BRANCH CONFIGURATION 
const branches = {
    main: {
        name: 'Main Branch - Kanamkemer Catholic Street',
        phone: '+254 717343717',
        whatsapp: '254717343717',
        email: 'info.messylent@gmail.com',
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


// 10. BRANCH SELECTION 
const branchSelect = document.getElementById('branchSelect');
const branchInfo = document.getElementById('branchInfo');

if (branchSelect) {
    branchSelect.addEventListener('change', function() {
        const selected = this.value;
        if (selected && branches[selected]) {
            const branch = branches[selected];
            branchInfo.className = `branch-info visible ${selected}`;
            branchInfo.innerHTML = `
                <i class="fas fa-store"></i>
                <strong>${branch.name}</strong><br>
                <i class="fas fa-phone"></i> ${branch.phone} 
                <i class="fab fa-whatsapp" style="margin-left:12px;"></i> ${branch.whatsapp}
            `;
            document.getElementById('whatsappFloat').href = `https://wa.me/${branch.whatsapp}`;
        } else {
            branchInfo.className = 'branch-info';
            branchInfo.innerHTML = '';
        }
    });
}

// 11. CONTACT FORM (WhatsApp) 
function submitToWhatsapp() {
    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const phone = document.getElementById('phone')?.value.trim() || '';
    const branch = document.getElementById('branchSelect')?.value || '';
    const service = document.getElementById('service')?.value || '';
    const message = document.getElementById('message')?.value.trim() || '';

    if (!branch) {
        alert('❌ Please select a branch before sending.');
        document.getElementById('branchSelect')?.focus();
        return false;
    }

    const branchDetails = branches[branch];
    if (!branchDetails) { alert('❌ Invalid branch selected.'); return false; }

    const phoneNumber = branchDetails.whatsapp;

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
    text += `*📅 Sent:* ${new Date().toLocaleString()}\n`;

    const encodedText = encodeURIComponent(text);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    window.open(whatsappURL, '_blank');

    alert(`✅ Your inquiry has been sent to:\n\n${branchDetails.name}\n📞 ${branchDetails.phone}\n\nPlease wait for a response.`);
    return true;
}

document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    submitToWhatsapp();
});

// 12. PRICE CALCULATOR 
function calculatePrice() {
    const service = document.getElementById('calcService').value;
    const quantity = parseInt(document.getElementById('calcQuantity').value) || 1;
    const color = document.getElementById('calcColor')?.value || 'bw';

    let unitPrice = 0;
    switch (service) {
        case 'printing':
            unitPrice = color === 'color' ? 20 : 10;
            break;
        case 'lamination':
            unitPrice = 50; 
            break;
        case 'photos':
            unitPrice = 200;
            break;
        case 'binding':
            unitPrice = 100;
            break;
        case 'design':
            unitPrice = 500;
            break;
        default:
            unitPrice = 0;
    }

    const total = unitPrice * quantity;
    const result = document.getElementById('calcResult');
    result.style.display = 'block';
    document.getElementById('priceDisplay').textContent = `Ksh ${total.toLocaleString()}`;
    if (service && quantity > 0) {
        alert('⚠️ This is an estimate. Prices may slightly vary depending on final requirements and materials used.');
    } else {
        alert('⚠️ Please select a service and enter a valid quantity.');
    }
    
    return total;

}


// 13. BOOKING 
document.getElementById('bookingForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;
    const service = document.getElementById('bookingService').value;
    if (!date) { alert('Please select a date.'); return; }
    const message =
        `📅 *Appointment Booking*\n\n📆 Date: ${date}\n⏰ Time: ${time}\n🛠️ Service: ${service}\n\nPlease confirm my appointment.`;
    window.open(`https://wa.me/254717343717?text=${encodeURIComponent(message)}`, '_blank');
});
/*
// 14. NEWSLETTER 
document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    if (email) {
        alert('✅ Subscribed successfully!');
        const message = `📧 *New Subscriber*\nEmail: ${email}`;
        window.open(`https://wa.me/254717343717?text=${encodeURIComponent(message)}`, '_blank');
        this.reset();
    }
});
*/
// 15. WORKING HOURS 
function updateWorkingHours() {
    const status = document.getElementById("working-status");
    const now = new Date();
    const day = now.getDay();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const openTime = 8 * 60;
    const closeTime = 19 * 60;

    if (day === 6) {
        status.className = "working-status closed";
        status.innerHTML = "🔴 Closed Today (Saturday)";
        return;
    }
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
    status.className = "working-status closed";
    status.innerHTML = "🔴 Closed for Today";
}

updateWorkingHours();
setInterval(updateWorkingHours, 60000);

// 16. QUICK ACTIONS 
function quickAction(type) {
    const messages = {
        print: "🖨️ I'd like to place a printing order. Please assist.",
        kra: "📄 I need help with KRA services. Can you assist?",
        call: "📞 Please call me back regarding your services."
    };
    const msg = messages[type] || "I need your services. Please assist.";
    window.open(`https://wa.me/254717343717?text=${encodeURIComponent(msg)}`, '_blank');
}

function quickOrder(service) {
    const msg = `🛒 I'd like to order *${service}*. Please provide more details.`;
    window.open(`https://wa.me/254717343717?text=${encodeURIComponent(msg)}`, '_blank');
}

// 17. CHAT WIDGET 
function toggleChat() {
    const popup = document.getElementById('chatPopup');
    popup.classList.toggle('active');
}

function quickReply(service) {
    const msg =
        `Hi! I'm interested in *${service}* services. Can you tell me more about pricing and availability?`;
    window.open(`https://wa.me/254717343717?text=${encodeURIComponent(msg)}`, '_blank');
    document.getElementById('chatPopup').classList.remove('active');
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if (!msg) return;
    window.open(`https://wa.me/254717343717?text=${encodeURIComponent(msg)}`, '_blank');
    input.value = '';
    document.getElementById('chatPopup').classList.remove('active');
}

// 18 WORK GALLERY WITH LIGHTBOX  

const galleryImages = [{
    url: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Printing Services',
    desc: 'High-quality printing for all your needs'
}, {
    url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Graphic Design',
    desc: 'Professional graphic design services'
}, {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Web Development',
    desc: 'Modern responsive websites'
}, {
    url: 'images/gallery/branding.avif',
    title: 'Branding & Logos',
    desc: 'Professional branding solutions'
}, {
    url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Photocopying',
    desc: 'Fast and reliable photocopying'
}, {
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Digital Solutions',
    desc: 'Complete digital service solutions'
}];

let currentImageIndex = 0;

function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    grid.innerHTML = galleryImages.map((img, index) => `
        <div class="gallery-item" onclick="openImage(${index})">
            <img src="${img.url}" alt="${img.title}" loading="lazy">
            <div class="gallery-icon">
                <i class="fas fa-search-plus"></i>
            </div>
            <div class="gallery-overlay">
                <h3>${img.title}</h3>
                <p>${img.desc}</p>
            </div>
        </div>
    `).join('');
}

// Image Modal / Lightbox
function openImage(index) {
    currentImageIndex = index;
    const modal = document.getElementById('imageModal');
    const img = document.getElementById('modalImage');
    const counter = document.getElementById('modalCounter');

    modal.classList.add('active');
    img.src = galleryImages[index].url;
    img.alt = galleryImages[index].title;
    counter.textContent = `${index + 1} / ${galleryImages.length}`;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    const img = document.getElementById('modalImage');
    const counter = document.getElementById('modalCounter');
    img.src = galleryImages[currentImageIndex].url;
    img.alt = galleryImages[currentImageIndex].title;
    counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const img = document.getElementById('modalImage');
    const counter = document.getElementById('modalCounter');
    img.src = galleryImages[currentImageIndex].url;
    img.alt = galleryImages[currentImageIndex].title;
    counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
}

// Close modal on click outside
document.getElementById('imageModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
    if (e.key === 'ArrowLeft') {
        prevImage();
    }
    if (e.key === 'ArrowRight') {
        nextImage();
    }
});

// 19. ON-PAGE REVIEW SYSTEM 

let reviews = [];
let isAdmin = false;

const defaultReviews = [{
    name: 'John Mwangi',
    rating: 5,
    comment: 'Excellent service! They helped me with my KRA registration quickly and professionally. Highly recommended!',
    date: new Date('2025-01-15').toISOString()
}, {
    name: 'Sarah Akinyi',
    rating: 5,
    comment: 'The best cyber cafe in Lodwar! Fast internet, friendly staff, and affordable prices. They also do great graphic design work.',
    date: new Date('2025-01-10').toISOString()
}, {
    name: 'Kevin Ochieng',
    rating: 4,
    comment: 'They built our company website and did an amazing job. Professional, fast, and within budget. Will use them again.',
    date: new Date('2025-01-05').toISOString()
}];

function loadReviews() {
    const stored = localStorage.getItem('messylReviews');
    if (stored) {
        try {
            reviews = JSON.parse(stored);
        } catch {
            reviews = [];
        }
    }
    if (reviews.length === 0) {
        reviews = [...defaultReviews];
        saveReviews();
    }
    displayReviews();
}

function saveReviews() {
    localStorage.setItem('messylReviews', JSON.stringify(reviews));
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

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

    const sorted = [...reviews].reverse();
    let html = '';
    sorted.forEach((review, index) => {
        const realIndex = reviews.length - 1 - index;
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const date = new Date(review.date).toLocaleDateString('en-KE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const deleteBtn = isAdmin ? `
            <button onclick="deleteReview(${realIndex})" class="review-delete" title="Delete this review">
                <i class="fas fa-trash-alt"></i>
            </button>
        ` : '';

        html += `
            <div class="testimonial-card">
                <div class="stars">${stars}</div>
                <p>"${escapeHtml(review.comment)}"</p>
                <div class="customer">
                    <div>
                        <strong>${escapeHtml(review.name)}</strong>
                        <span>${date}</span>
                    </div>
                    ${deleteBtn}
                </div>
            </div>
        `;
    });

    grid.innerHTML = html;
}

// 20. REVIEW FORM 

function toggleReviewForm() {
    const wrapper = document.getElementById('reviewFormWrapper');
    if (wrapper.style.display === 'none') {
        wrapper.style.display = 'block';
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        wrapper.style.display = 'none';
        document.getElementById('reviewForm').reset();
        document.getElementById('reviewRating').value = '0';
        document.getElementById('ratingDisplay').textContent = 'Select rating';
        document.querySelectorAll('.star-rating .star').forEach(s => s.classList.remove('active'));
    }
}

document.getElementById('reviewForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('reviewName').value.trim();
    const rating = parseInt(document.getElementById('reviewRating').value);
    const comment = document.getElementById('reviewComment').value.trim();

    if (!name) { alert('Please enter your name.');
        document.getElementById('reviewName').focus(); return; }
    if (rating === 0) { alert('Please select a star rating.'); return; }
    if (!comment) { alert('Please write your review.');
        document.getElementById('reviewComment').focus(); return; }

    const review = {
        name: name,
        rating: rating,
        comment: comment,
        date: new Date().toISOString()
    };

    reviews.push(review);
    saveReviews();
    displayReviews();

    this.reset();
    document.getElementById('reviewRating').value = '0';
    document.getElementById('ratingDisplay').textContent = 'Select rating';
    document.querySelectorAll('.star-rating .star').forEach(s => s.classList.remove('active'));
    document.getElementById('reviewFormWrapper').style.display = 'none';

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

    document.getElementById('reviewsGrid').scrollIntoView({ behavior: 'smooth' });
});

//  21.STAR RATING 

const stars = document.querySelectorAll('.star-rating .star');
const ratingDisplay = document.getElementById('ratingDisplay');

stars.forEach(star => {
    star.addEventListener('click', function() {
        const value = parseInt(this.dataset.value);
        document.getElementById('reviewRating').value = value;
        stars.forEach(s => {
            s.classList.toggle('active', parseInt(s.dataset.value) <= value);
        });
        const labels = ['', '⭐ Terrible', '⭐ Bad', '⭐⭐⭐ Okay', '⭐⭐⭐⭐ Good', '⭐⭐⭐⭐⭐ Excellent'];
        ratingDisplay.textContent = labels[value] || 'Select rating';
    });

    star.addEventListener('mouseenter', function() {
        const value = parseInt(this.dataset.value);
        stars.forEach(s => {
            s.style.color = parseInt(s.dataset.value) <= value ? '#f1c40f' : '#dce3ec';
        });
    });

    star.addEventListener('mouseleave', function() {
        const current = parseInt(document.getElementById('reviewRating').value);
        stars.forEach(s => {
            s.style.color = current > 0 && parseInt(s.dataset.value) <= current ? '#f1c40f' :
                '#dce3ec';
        });
    });
});

// 22. ADMIN FUNCTIONS 

function loginAsAdmin() {
    const password = prompt('Enter admin password:');
    if (password === 'admin123') {
        isAdmin = true;
        displayReviews();
        
        // Show debug toggle button
        const debugToggle = document.getElementById('debugToggle');
        if (debugToggle) {
            debugToggle.style.display = 'block';
        }
        
        // Update admin controls
        document.getElementById('adminControls').innerHTML = `
            <span style="color: #2ecc71; font-weight: 600;">🔐 Admin Mode Active</span>
            <button onclick="logoutAdmin()" class="btn-outline" style="padding: 6px 16px; font-size: 0.8rem;">
                <i class="fas fa-sign-out-alt"></i> Logout
            </button>
        `;
        alert('✅ Admin mode activated! You can now delete reviews and access debug tools.');
    } else if (password !== null) {
        alert('❌ Incorrect password!');
    }
}

function logoutAdmin() {
    isAdmin = false;
    displayReviews();
    
    // Hide debug toggle button
    const debugToggle = document.getElementById('debugToggle');
    if (debugToggle) {
        debugToggle.style.display = 'none';
    }
    
    // Hide debug section if open
    const debugSection = document.getElementById('debugSection');
    if (debugSection) {
        debugSection.style.display = 'none';
    }
    
    // Reset admin controls
    document.getElementById('adminControls').innerHTML = `
        <button onclick="loginAsAdmin()" class="btn-outline" style="padding: 6px 16px; font-size: 0.8rem;">
            <i class="fas fa-lock"></i> Admin Login
        </button>
    `;
    alert('👋 Logged out of admin mode.');
}
function deleteReview(index) {
    if (!isAdmin) {
        alert('⚠️ Please login as admin first!');
        return;
    }
    const review = reviews[index];
    if (confirm(`Are you sure you want to delete ${review.name}'s review?`)) {
        reviews.splice(index, 1);
        saveReviews();
        displayReviews();
        alert('✅ Review deleted successfully!');
    }
}

// 23. DEBUG FUNCTIONS 

function toggleDebug() {
    const section = document.getElementById('debugSection');
    if (section.style.display === 'none') {
        section.style.display = 'block';
        debugReviews();
    } else {
        section.style.display = 'none';
    }
}

function debugReviews() {
    const output = document.getElementById('debugOutput');
    const data = localStorage.getItem('messylReviews');
    if (data) {
        try {
            const parsed = JSON.parse(data);
            output.textContent = parsed.length === 0 ?
                '📭 No reviews found.' :
                JSON.stringify(parsed, null, 2);
        } catch {
            output.textContent = '❌ Error reading data.';
        }
    } else {
        output.textContent = '📭 No reviews found in localStorage.';
    }
}

function clearAllReviews() {
    if (confirm('⚠️ Delete ALL reviews? This cannot be undone!')) {
        localStorage.removeItem('messylReviews');
        reviews = [];
        saveReviews();
        displayReviews();
        debugReviews();
        alert('✅ All reviews deleted!');
    }
}

function resetToDefaults() {
    if (confirm('⚠️ Reset to default reviews? This will delete all current reviews!')) {
        localStorage.removeItem('messylReviews');
        reviews = [...defaultReviews];
        saveReviews();
        displayReviews();
        debugReviews();
        alert('✅ Reset to default reviews!');
    }
}

function addSampleReviews() {
    const newSamples = [{
        name: 'Sample User 1',
        rating: 5,
        comment: 'Great service! Very professional and fast.',
        date: new Date().toISOString()
    }, {
        name: 'Sample User 2',
        rating: 4,
        comment: 'Good experience overall. Would recommend.',
        date: new Date().toISOString()
    }];
    reviews = [...reviews, ...newSamples];
    saveReviews();
    displayReviews();
    debugReviews();
    alert('✅ Sample reviews added!');
}

// 24. INITIALIZE 

document.addEventListener('DOMContentLoaded', function() {
    loadReviews();
    renderGallery();
    console.log('✅ Messyl Business Center loaded successfully!');
    console.log('✅ Features: Dark Mode, On-Page Reviews, Gallery Lightbox');
    console.log('💡 Click gallery images to open lightbox');
    console.log('💡 Reviews are saved in localStorage');
});