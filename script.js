// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    }
});

// Typing Animation for Hero Section
function typeWriter() {
    const textElement = document.querySelector('#typing-text');
    const texts = [
        'AI / ML Systems Engineer',
        'RAG & LLM Architect', 
        'Applied NLP Researcher',
        'Full-Stack Developer'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (!isPaused) {
            if (!isDeleting && charIndex < currentText.length) {
                textElement.textContent += currentText.charAt(charIndex);
                charIndex++;
            } else if (isDeleting && charIndex > 0) {
                textElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else if (!isDeleting && charIndex === currentText.length) {
                isPaused = true;
                setTimeout(() => {
                    isDeleting = true;
                    isPaused = false;
                }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }

        const typeSpeed = isDeleting ? 50 : 100;
        setTimeout(type, typeSpeed);
    }

    // Start typing animation after page load
    setTimeout(() => {
        textElement.textContent = '';
        type();
    }, 1000);
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section-title, .skill-category, .project-card:not(.featured-project), .about-text, .contact-info').forEach(el => {
    observer.observe(el);
});

// Floating Animation for Hero Icons
function animateFloatingIcons() {
    const icons = document.querySelectorAll('.floating-icon');
    icons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
    });
}

animateFloatingIcons();

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.profile-card');
    
    parallaxElements.forEach(element => {
        const speed = 0.2;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('_replyto');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
    if (!name || !email || !subject || !message) {
        e.preventDefault();
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        e.preventDefault();
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show success message and let form submit naturally to Formspree
    showNotification('Sending message...', 'info');
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10B981, #047857)' : 'linear-gradient(135deg, #EF4444, #DC2626)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Skills Animation on Scroll
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });
    
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) scale(0.9)';
        item.style.transition = 'all 0.6s ease';
        skillObserver.observe(item);
    });
}

animateSkills();

// Project Cards Hover Effects
document.querySelectorAll('.project-card-link .project-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Make featured project cards clickable
document.querySelectorAll('.project-card[data-link]').forEach(featuredCard => {
    featuredCard.style.cursor = 'pointer';
    featuredCard.addEventListener('click', function(e) {
        // Don't navigate if clicking on a link or button inside the card
        if (e.target.tagName === 'A' || e.target.closest('a') || e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            return;
        }
        const link = this.getAttribute('data-link');
        if (link) {
            window.location.href = link;
        }
    });
});

// Dynamic Statistics Counter
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h4');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent.replace(/[^0-9]/g, '');
                const suffix = target.textContent.replace(/[0-9]/g, '');
                
                let currentValue = 0;
                const increment = finalValue / 50;
                
                const updateCounter = () => {
                    if (currentValue < finalValue) {
                        currentValue += increment;
                        target.textContent = Math.ceil(currentValue) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = finalValue + suffix;
                    }
                };
                
                updateCounter();
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

animateCounters();

// Theme Toggle (Optional Enhancement)
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-purple), var(--dark-purple));
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
    `;
    
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(themeToggle, currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(this, newTheme);
        
        showNotification(`Switched to ${newTheme} mode`, 'info');
    });
    
    themeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    themeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

function updateThemeIcon(button, theme) {
    button.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Initialize theme toggle
createThemeToggle();

// Preloader
window.addEventListener('load', function() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="spinner"></div>
            <p>Loading Portfolio...</p>
        </div>
    `;
    
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--dark-black);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    
    document.body.prepend(preloader);
    
    // Remove preloader after animations
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 500);
    }, 1500);
});

// Add CSS for spinner
const spinnerCSS = `
    .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(139, 92, 246, 0.3);
        border-top: 3px solid var(--primary-purple);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .preloader-content {
        text-align: center;
        color: var(--text-light);
    }
    
    .nav-link.active {
        color: var(--primary-purple) !important;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;

// Inject spinner CSS
const style = document.createElement('style');
style.textContent = spinnerCSS;
document.head.appendChild(style);

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add glitch effect to name on hover
    const nameElement = document.querySelector('.highlight');
    if (nameElement) {
        nameElement.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease';
        });
    }
    
    // Email copy functionality
    const copyEmailBtn = document.getElementById('copyEmail');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = 'uriahadeniran065@gmail.com';
            
            // Copy to clipboard
            navigator.clipboard.writeText(email).then(function() {
                showNotification('Email address copied to clipboard!', 'success');
            }).catch(function() {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('Email address copied to clipboard!', 'success');
            });
        });
    }
});

// Glitch animation CSS
const glitchCSS = `
    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
`;

style.textContent += glitchCSS;

// ==========================================================================
// RAG Assistant Interactive Demo & Modal Controller
// ==========================================================================
document.addEventListener('DOMContentLoaded', function() {
    // 1. RAG Demo Console Query Data
    const ragQueries = {
        cfpb: {
            retriever: 'LanceDB (Embedded Local)',
            latency: '248ms',
            score: '0.934',
            source: 'CFPB 12 CFR Part 1022 §1022.43 (FCRA Subpart E)',
            chunk: '"Under 12 CFR § 1022.43(e), consumer reporting agencies and furnishers must investigate disputed information within 30 calendar days of receiving consumer notice. The entity must provide written notice of results within 5 business days post-completion."',
            response: 'According to CFPB regulatory mandates <span class="citation-pill">CFPB 12 CFR §1022.43</span>, credit furnishers must conduct an exhaustive investigation within <strong>30 calendar days</strong> of receiving a consumer dispute notice. Official results must be dispatched within <strong>5 business days</strong> of conclusion. If supplementary consumer evidence is provided during the investigation, an allowable 15-day extension applies pursuant to FCRA § 611(a)(1)(B).'
        },
        sec: {
            retriever: 'Pinecone Serverless (Cloud Index)',
            latency: '418ms',
            score: '0.912',
            source: 'SEC 17 CFR Part 243 §243.100 (Regulation FD)',
            chunk: '"Rule 100 provides that whenever an issuer discloses material nonpublic information to market professionals or shareholders, the issuer must make simultaneous public disclosure for intentional disclosures, or prompt public disclosure for non-intentional disclosures."',
            response: 'Under SEC Regulation FD <span class="citation-pill">17 CFR §243.100</span>, issuers are strictly prohibited from selectively leaking material nonpublic information to selected broker-dealers or analysts. For intentional disclosures, broad public dissemination (via Form 8-K or wire release) must be <strong>simultaneous</strong>. Unintentional disclosures trigger mandatory <strong>prompt</strong> disclosure within 24 hours or before next market open.'
        },
        fed: {
            retriever: 'LanceDB (Embedded Local)',
            latency: '276ms',
            score: '0.897',
            source: 'Federal Reserve 12 CFR Part 249 (Regulation WW)',
            chunk: '"A covered institution must calculate and maintain an amount of high-quality liquid assets (HQLA) that is no less than 100 percent of its total net cash outflows over a 30-calendar day stress period, determined as of each calculation date."',
            response: 'Pursuant to Federal Reserve Regulation WW <span class="citation-pill">12 CFR Part 249</span>, covered tier-1 banking institutions must maintain a Liquidity Coverage Ratio (LCR) of <strong>≥ 100%</strong>. This requires holding unencumbered High-Quality Liquid Assets (Level 1 cash/sovereign debt and Level 2 securities) sufficient to absorb projected total net cash outflows over a <strong>30-day liquidity stress horizon</strong>.'
        }
    };

    // Query Chip Switching
    const queryButtons = document.querySelectorAll('.query-chip-btn');
    const retrieverVal = document.getElementById('ragRetrieverVal');
    const latencyVal = document.getElementById('ragLatencyVal');
    const sourceVal = document.getElementById('ragSourceVal');
    const scoreVal = document.getElementById('ragScoreVal');
    const chunkVal = document.getElementById('ragChunkVal');
    const responseVal = document.getElementById('ragResponseVal');

    if (queryButtons.length > 0 && responseVal) {
        queryButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const key = this.getAttribute('data-query');
                if (!ragQueries[key]) return;

                queryButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Animate transition
                const target = ragQueries[key];
                if (retrieverVal) retrieverVal.textContent = target.retriever;
                if (latencyVal) latencyVal.textContent = target.latency;
                if (sourceVal) sourceVal.innerHTML = `<i class="fas fa-bookmark"></i> ${target.source}`;
                if (scoreVal) scoreVal.textContent = `Cosine: ${target.score}`;
                if (chunkVal) chunkVal.textContent = target.chunk;

                // Typing streaming effect for LLM response
                responseVal.innerHTML = '<span style="color: var(--light-purple); font-style: italic;"><i class="fas fa-spinner fa-spin"></i> Generating grounded response with Ollama qwen2.5:7b...</span>';
                setTimeout(() => {
                    responseVal.innerHTML = target.response;
                }, 220);
            });
        });
    }

    // 2. System Specs Modal Controller
    const openSpecsBtn = document.getElementById('openSpecsModal');
    const modalBackdrop = document.getElementById('ragSpecsModal');
    const closeSpecsBtn = document.getElementById('closeSpecsModal');

    if (openSpecsBtn && modalBackdrop) {
        openSpecsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modalBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeModal = function() {
            modalBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeSpecsBtn) {
            closeSpecsBtn.addEventListener('click', closeModal);
        }

        modalBackdrop.addEventListener('click', function(e) {
            if (e.target === modalBackdrop) {
                closeModal();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Modal Tabs Switching
    const modalTabs = document.querySelectorAll('.modal-tab-btn');
    const tabPanes = document.querySelectorAll('.modal-tab-pane');

    modalTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('data-tab');
            modalTabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            this.classList.add('active');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
});
