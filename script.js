document.addEventListener('DOMContentLoaded', () => {
    fetch('portfolio-data.json')
        .then(response => response.json())
        .then(data => {
            populatePortfolio(data);
            initializePage(data);
        })
        .catch(error => console.error('Error loading portfolio data:', error));
});

function populatePortfolio(data) {
    // Logo
    document.getElementById('logo-icon').className = data.logoIcon;
    document.getElementById('logo-text').textContent = data.fullName;

    // Navigation
    const navLinks = document.getElementById('nav-links');
    const footerQuickLinks = document.getElementById('footer-quick-links');
    const navItems = ['Home', 'About', 'Projects', 'Education', 'Certificates', 'Interests', 'Contact'];
    navItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#${item.toLowerCase()}">${item}</a>`;
        navLinks.appendChild(li.cloneNode(true));
        footerQuickLinks.appendChild(li);
    });

    // Slideshow
    const slideshow = document.getElementById('slideshow');
    const slideshowNav = document.getElementById('slideshowNav');
    data.slideshow.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = `slide ${index === 0 ? 'active' : ''}`;
        slideDiv.style.backgroundImage = `url('${slide.imageUrl}')`;
        slideDiv.innerHTML = `
            <div class="slide-content">
                <h2 class="slide-title">${slide.title}</h2>
                <p class="slide-subtitle">${slide.subtitle}</p>
            </div>
        `;
        slideshow.appendChild(slideDiv);

        const navDot = document.createElement('div');
        navDot.className = `nav-dot ${index === 0 ? 'active' : ''}`;
        navDot.setAttribute('data-slide', index);
        slideshowNav.appendChild(navDot);
    });
     document.getElementById('totalSlides').textContent = data.slideshow.length;


    // Hero
    document.getElementById('hero-title').innerHTML = `${data.hero.title.replace('(Believer)', '<span style="color: var(--primary);">(Believer)</span>')}`;
    
    // About
    document.getElementById('about-title').textContent = data.about.title;
    document.getElementById('about-desc-1').textContent = data.about.description1;
    document.getElementById('about-desc-2').textContent = data.about.description2;
    document.getElementById('profile-pic').src = data.about.profileImage;
    const personalInfo = document.getElementById('personal-info');
    data.about.personalInfo.forEach(info => {
        personalInfo.innerHTML += `
            <div class="info-item">
                <div class="info-icon"><i class="${info.icon}"></i></div>
                <div><h4>${info.label}</h4><p>${info.value}</p></div>
            </div>
        `;
    });
    const skillsProgress = document.getElementById('skills-progress');
    data.about.skills.forEach(skill => {
        skillsProgress.innerHTML += `
            <div class="skill-item">
                <span>${skill.name}</span>
                <div class="skill-bar">
                    <div class="skill-progress" data-width="${skill.progress}"></div>
                </div>
            </div>
        `;
    });

    // Projects
    const projectsGrid = document.getElementById('projects-grid');
    const footerProjects = document.getElementById('footer-projects');
    data.projects.forEach(project => {
        projectsGrid.innerHTML += `
            <div class="project-card fade-in card-3d">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" class="project-img">
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.liveUrl}" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                        <a href="${project.sourceUrl}" class="project-link outline"><i class="fab fa-github"></i> Source Code</a>
                    </div>
                </div>
            </div>
        `;
        footerProjects.innerHTML += `<li><a href="#projects">${project.title}</a></li>`;
    });

    // Achievements
    const achievementsGrid = document.getElementById('achievements-grid');
    data.achievements.forEach(ach => {
        achievementsGrid.innerHTML += `
            <div class="achievement-card fade-in">
                <div class="counter" data-target="${ach.target}">0</div>
                <p>${ach.label}</p>
            </div>
        `;
    });

    // Education
    document.getElementById('education-title').textContent = data.education.title;
    document.getElementById('education-desc-1').textContent = data.education.description1;
    document.getElementById('education-desc-2').textContent = data.education.description2;
    const subjectsList = document.getElementById('subjects-list');
    data.education.subjects.forEach(sub => {
        subjectsList.innerHTML += `
            <div class="subject-item">
                <div class="subject-icon"><i class="${sub.icon}"></i></div>
                <div><h4>${sub.title}</h4><p>${sub.level}</p></div>
            </div>
        `;
    });
    const specialtiesList = document.getElementById('specialties-list');
    data.education.specializations.forEach(spec => {
        specialtiesList.innerHTML += `
            <div class="specialty-item card-3d">
                <h4>${spec.title}</h4>
                <p>${spec.description}</p>
            </div>
        `;
    });

    // Certificates
    const certificatesGrid = document.getElementById('certificates-grid');
    data.certificates.forEach(cert => {
        certificatesGrid.innerHTML += `
            <div class="certificate-card fade-in card-3d">
                <div class="certificate-image">
                    <img src="${cert.image}" alt="${cert.title}" class="certificate-img">
                </div>
                <div class="certificate-content">
                    <h3>${cert.title}</h3>
                    <p>${cert.description}</p>
                    <button class="btn view-certificate-btn" data-certificate="${cert.data}">View Certificate</button>
                </div>
            </div>
        `;
    });

    // Interests
    const interestsGrid = document.getElementById('interests-grid');
    const footerInterests = document.getElementById('footer-interests');
    data.interests.forEach(interest => {
        interestsGrid.innerHTML += `
            <div class="interest-card fade-in card-3d">
                <div class="interest-icon"><i class="${interest.icon}"></i></div>
                <h3>${interest.title}</h3>
                <p>${interest.description}</p>
                <button class="btn learn-more-btn" data-interest="${interest.title}">Learn More</button>
            </div>
        `;
        footerInterests.innerHTML += `<li><a href="#interests">${interest.title}</a></li>`;
    });

    // Contact
    document.getElementById('contactForm').action = data.contact.formAction;
    const contactInfo = document.getElementById('contact-info');
    data.contact.info.forEach(info => {
        contactInfo.innerHTML += `
            <div class="contact-item fade-in">
                <div class="contact-icon"><i class="${info.icon}"></i></div>
                <div class="contact-text"><h3>${info.label}</h3><p>${info.value}</p></div>
            </div>
        `;
    });

    // Footer
    document.getElementById('footer-logo').textContent = data.fullName;
    document.getElementById('footer-about').textContent = data.footer.about;
    document.getElementById('footer-copyright').innerHTML = data.footer.copyright;
    const socialLinks = document.getElementById('social-links');
    data.footer.socialLinks.forEach(link => {
        socialLinks.innerHTML += `
            <a href="${link.url}" class="social-link" target="_blank"><i class="${link.icon}"></i></a>
        `;
    });
}


function initializePage(data) {
    // All your existing JavaScript code remains the same
    // Loading Screen
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.getElementById('loadingScreen').classList.add('hidden');
        }, 1000);
    });

    // Image Slideshow Functionality
    class Slideshow {
        constructor() {
            this.slides = document.querySelectorAll('.slide');
            this.dots = document.querySelectorAll('.nav-dot');
            this.prevBtn = document.querySelector('.prev-btn');
            this.nextBtn = document.querySelector('.next-btn');
            this.currentSlide = 0;
            this.totalSlides = this.slides.length;
            this.autoPlayInterval = null;
            
            if (this.totalSlides > 0) {
                this.init();
            }
        }
        
        init() {
            // Update counter
            this.updateCounter();
            
            // Event listeners
            this.prevBtn.addEventListener('click', () => this.prevSlide());
            this.nextBtn.addEventListener('click', () => this.nextSlide());
            
            // Dot navigation
            this.dots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    const slideIndex = parseInt(e.target.getAttribute('data-slide'));
                    this.goToSlide(slideIndex);
                });
            });
            
            // Auto-play
            this.startAutoPlay();
            
            // Pause on hover
            const slideshow = document.querySelector('.slideshow-container');
            slideshow.addEventListener('mouseenter', () => this.stopAutoPlay());
            slideshow.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        goToSlide(index) {
            // Remove active class from current slide and dot
            this.slides[this.currentSlide].classList.remove('active');
            this.dots[this.currentSlide].classList.remove('active');
            
            // Update current slide
            this.currentSlide = index;
            
            // Add active class to new slide and dot
            this.slides[this.currentSlide].classList.add('active');
            this.dots[this.currentSlide].classList.add('active');
            
            // Update counter
            this.updateCounter();
        }
        
        nextSlide() {
            const nextIndex = (this.currentSlide + 1) % this.totalSlides;
            this.goToSlide(nextIndex);
        }
        
        prevSlide() {
            const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
            this.goToSlide(prevIndex);
        }
        
        updateCounter() {
            document.getElementById('currentSlide').textContent = this.currentSlide + 1;
        }
        
        startAutoPlay() {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, 5000); // Change slide every 5 seconds
        }
        
        stopAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        }
    }

    // Initialize slideshow
    const slideshow = new Slideshow();

    // Progress Bar
    window.addEventListener('scroll', function() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        document.getElementById('progressBar').style.width = scrollPercent + '%';
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            showToast('Dark mode enabled');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            showToast('Light mode enabled');
        }
    });

    // Toast Notification
    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Typing Animation
    const typingText = document.getElementById('typing-text');
    const texts = data.hero.typingTexts;
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(type, isDeleting ? 50 : 100);
    }

    // Start typing animation
    if (texts && texts.length > 0) {
        setTimeout(type, 1000);
    }

    // Animated Counters
    function startCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 100;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // Skills Progress Animation
    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('achievements-grid')) {
                    startCounters();
                }
                if (entry.target.classList.contains('skills-progress')) {
                    animateSkills();
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const achievementsSection = document.querySelector('.achievements-grid');
    const skillsSection = document.querySelector('.skills-progress');
    if (achievementsSection) observer.observe(achievementsSection);
    if (skillsSection) observer.observe(skillsSection);

    // Download CV Functionality
    document.getElementById('downloadCV').addEventListener('click', function() {
        showToast('Downloading CV...');
        // In a real implementation, this would trigger a file download
        setTimeout(() => {
            showToast('CV downloaded successfully!');
        }, 1500);
    });

    // Print Resume Functionality
    document.getElementById('printResume').addEventListener('click', function() {
        window.print();
    });

  // Enhanced Contact Form
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show sending message
        showToast('Sending message...');
        
        // Get the form element
        const form = this;
        
        // Create FormData object
        const formData = new FormData(form);
        
        // Send to Formspree
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                document.getElementById('formSuccess').style.display = 'block';
                form.reset();
                showToast('Message sent successfully!');
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    document.getElementById('formSuccess').style.display = 'none';
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            showToast('Error sending message. Please try again or email me directly.');
            console.error('Form submission error:', error);
        });
    });

    // Particle Background
    const canvas = document.getElementById('particlesCanvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(108, 99, 255, ${Math.random() * 0.5})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(108, 99, 255, ${0.1 * (1 - distance/100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();

    // Language Toggle (Basic Implementation)
    document.getElementById('languageToggle').addEventListener('click', function() {
        showToast('Language switching feature coming soon!');
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // Modal functionality
    const modal = document.getElementById('infoModal');
    const imageModal = document.getElementById('imageModal');
    const closeModal = document.getElementById('closeModal');
    const closeImageModal = document.getElementById('closeImageModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const modalImage = document.getElementById('modalImage');

    // Certificate button functionality - Now opens image modal
    document.querySelectorAll('.view-certificate-btn').forEach(button => {
        button.addEventListener('click', function() {
            const certificateType = this.getAttribute('data-certificate');
            showCertificateImage(certificateType);
        });
    });

    // Profile picture click functionality
    document.querySelectorAll('.profile-pic').forEach(img => {
        img.addEventListener('click', function() {
            showImageModal(this.src, 'Profile Picture');
        });
    });

    // Certificate image click functionality
    document.querySelectorAll('.certificate-img').forEach(img => {
        img.addEventListener('click', function() {
            showImageModal(this.src, 'Certificate');
        });
    });

    // Interest button functionality
    document.querySelectorAll('.learn-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const interest = this.getAttribute('data-interest');
            showInterestModal(interest);
        });
    });

    // Project links functionality
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                showToast('Project link will be available soon!');
            }
        });
    });

    // Close modals when clicking X or outside
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    closeImageModal.addEventListener('click', function() {
        imageModal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
            imageModal.style.display = 'none';
        }
    });

    // Certificate image modal
    function showCertificateImage(certificateType) {
        const certificate = data.certificates.find(c => c.data === certificateType);
        if (!certificate || !certificate.image) {
            showCertificateModal(certificateType);
            return;
        }
        
        const imageSrc = certificate.image;
        
        // Check if image exists, otherwise show text modal instead
        const img = new Image();
        img.onload = function() {
            showImageModal(imageSrc, certificate.title);
        };
        img.onerror = function() {
            // If image doesn't exist, show text modal instead
            showCertificateModal(certificateType);
        };
        img.src = imageSrc;
    }

    // Image modal function
    function showImageModal(imageSrc, title) {
        modalImage.src = imageSrc;
        modalImage.alt = title;
        imageModal.style.display = 'flex';
    }

    // Certificate modal content (fallback if image doesn't exist)
    function showCertificateModal(certificateType) {
        modalTitle.textContent = `${certificateType} Information`;
        
        let content = '';
        switch(certificateType) {
            case 'BECE':
                content = `
                    <p>This is my Basic Education Certificate Examination (BECE) certificate, which marks the completion of my junior high school education.</p>
                    <p>This certificate qualifies me for admission to senior high school, where I'm currently pursuing General Arts at Toase Senior High School.</p>
                    <p><strong>Year Obtained:</strong> [Year]</p>
                    <p><strong>School:</strong> [Your Junior High School Name]</p>
                    <p><strong>Aggregate:</strong> [Your BECE Aggregate]</p>
                    <div style="margin-top: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
                        <p><strong>Note:</strong> To display your actual certificate, add the correct image path to your portfolio-data.json file.</p>
                    </div>
                `;
                break;
            case 'Academic Awards':
                content = `
                    <p>These are my academic awards and recognitions for outstanding performance in various subjects, particularly Mathematics and ICT.</p>
                    <p>My achievements reflect my dedication to academic excellence and my passion for learning.</p>
                    <p><strong>Awards Include:</strong></p>
                    <ul style="text-align: left; margin: 1rem 0;">
                        <li>Mathematics Excellence Award</li>
                        <li>ICT Proficiency Certificate</li>
                        <li>Academic Excellence Recognition</li>
                    </ul>
                    <div style="margin-top: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
                        <p><strong>Note:</strong> To display your actual awards, add the correct image path to your portfolio-data.json file.</p>
                    </div>
                `;
                break;
            case 'Extracurricular':
                content = `
                    <p>These certificates represent my participation and achievements in various extracurricular activities, competitions, and leadership roles.</p>
                    <p>Engaging in these activities has helped me develop important skills beyond the classroom.</p>
                    <p><strong>Activities Include:</strong></p>
                    <ul style="text-align: left; margin: 1rem 0;">
                        <li>School Club Participation</li>
                        <li>Sports and Athletics</li>
                        <li>Leadership Positions</li>
                        <li>Community Service</li>
                    </ul>
                    <div style="margin-top: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
                        <p><strong>Note:</strong> To display your actual certificates, add the correct image path to your portfolio-data.json file.</p>
                    </div>
                `;
                break;
        }
        
        modalContent.innerHTML = content;
        modal.style.display = 'flex';
    }

    // Interest modal content
    function showInterestModal(interest) {
        modalTitle.textContent = interest;
        
        let content = '';
        switch(interest) {
            case 'Ethical Hacking':
                content = `
                    <p>Ethical hacking involves using hacking skills for defensive purposes to identify and fix security vulnerabilities in computer systems.</p>
                    <p>My interest in this field stems from:</p>
                    <ul style="text-align: left; margin: 1rem 0;">
                        <li>Fascination with cybersecurity and protecting digital information</li>
                        <li>Desire to understand how computer systems work at a deep level</li>
                        <li>Interest in problem-solving and analytical thinking</li>
                        <li>Aspiration to contribute to making the digital world safer</li>
                    </ul>
                    <p>I'm currently learning about network security, vulnerability assessment, and ethical hacking methodologies through online resources and practical exercises.</p>
                `;
                break;
            case 'Web Design':
                content = `
                    <p>Web design combines creativity and technical skills to create visually appealing and functional websites.</p>
                    <p>My interest in web design includes:</p>
                    <ul style="text-align: left; margin: 1rem 0;">
                        <li>Creating user-friendly interfaces that provide great experiences</li>
                        <li>Learning HTML, CSS, and JavaScript to build responsive websites</li>
                        <li>Understanding design principles and color theory</li>
                        <li>Exploring modern web technologies and frameworks</li>
                    </ul>
                    <p>This portfolio website is one of my first projects in web design, and I'm continuously learning and improving my skills.</p>
                `;
                break;
            case 'Programming':
                content = `
                    <p>Programming involves writing instructions for computers to execute, enabling the creation of software applications and solutions.</p>
                    <p>My programming interests focus on:</p>
                    <ul style="text-align: left; margin: 1rem 0;">
                        <li>Learning programming languages like Python, JavaScript, and Java</li>
                        <li>Understanding algorithms and data structures</li>
                        <li>Developing problem-solving skills through coding challenges</li>
                        <li>Building practical applications that solve real-world problems</li>
                    </ul>
                    <p>I believe programming skills are essential for my future career in technology and complement my studies in Mathematics and ICT.</p>
                `;
                break;
        }
        
        modalContent.innerHTML = content;
        modal.style.display = 'flex';
    }

    // Social media links functionality
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove e.preventDefault() to allow actual navigation
            // Links will now open in new tabs as specified in HTML
            showToast('Opening social media profile...');
        });
    });
}