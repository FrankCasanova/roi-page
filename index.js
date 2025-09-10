// Loading animation
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loading').classList.add('hidden');
            }, 1000);
        });

        // Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Toggle collapsible sections
        function toggleCollapsible(header) {
            const collapsible = header.parentElement;
            collapsible.classList.toggle('active');
        }

        // Toggle progress checkboxes
        function toggleProgress(checkbox) {
            checkbox.classList.toggle('checked');
            
            // Save progress to localStorage
            const progressItems = document.querySelectorAll('.progress-checkbox');
            const progress = Array.from(progressItems).map(item => item.classList.contains('checked'));
            localStorage.setItem('codingInterviewProgress', JSON.stringify(progress));
        }

        // Load progress from localStorage
        function loadProgress() {
            const savedProgress = localStorage.getItem('codingInterviewProgress');
            if (savedProgress) {
                const progress = JSON.parse(savedProgress);
                const progressItems = document.querySelectorAll('.progress-checkbox');
                progress.forEach((isChecked, index) => {
                    if (isChecked && progressItems[index]) {
                        progressItems[index].classList.add('checked');
                    }
                });
            }
        }

        // Smooth scrolling for navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add scroll effect to navigation
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('.nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(10, 10, 15, 0.95)';
            } else {
                nav.style.background = 'rgba(10, 10, 15, 0.9)';
            }
        });

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            createParticles();
            loadProgress();
            loadComfortLevels();
        });

        // Comfort level functions
        function toggleComfortLevel(checkbox, problemId, level) {
            const comfortLevels = JSON.parse(localStorage.getItem('comfortLevels') || '{}');
            
            if (!comfortLevels[problemId]) {
                comfortLevels[problemId] = {};
            }
            
            // Toggle the specific comfort level
            if (comfortLevels[problemId][level]) {
                comfortLevels[problemId][level] = false;
                checkbox.classList.remove('checked');
            } else {
                // Clear other levels for this problem
                for (let lvl in comfortLevels[problemId]) {
                    comfortLevels[problemId][lvl] = false;
                }
                // Uncheck all other checkboxes for this problem
                const problemCheckboxes = document.querySelectorAll(`.comfort-checkbox[data-id="${problemId}"]`);
                problemCheckboxes.forEach(cb => cb.classList.remove('checked'));
                
                // Set the new level
                comfortLevels[problemId][level] = true;
                checkbox.classList.add('checked');
            }
            
            localStorage.setItem('comfortLevels', JSON.stringify(comfortLevels));
        }

        function loadComfortLevels() {
            const comfortLevels = JSON.parse(localStorage.getItem('comfortLevels') || '{}');
            document.querySelectorAll('.comfort-checkbox').forEach(checkbox => {
                const id = checkbox.getAttribute('data-id');
                const level = checkbox.getAttribute('data-level');
                if (comfortLevels[id] && comfortLevels[id][level]) {
                    checkbox.classList.add('checked');
                }
            });
        }

        // Add intersection observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all glass containers
        document.addEventListener('DOMContentLoaded', function() {
            const containers = document.querySelectorAll('.glass-container');
            containers.forEach(container => {
                container.style.opacity = '0';
                container.style.transform = 'translateY(30px)';
                container.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(container);
            });
        });