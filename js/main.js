document.addEventListener('DOMContentLoaded', function() {
    // 加載導航欄
    fetch('components/nav.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
            // 在導航加載完成後初始化活動狀態
            initializeActiveNav();
            // 調整主內容的填充
            adjustMainPadding();
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
        });

    // 初始化導航活動狀態
    function initializeActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.parentElement.classList.add('active');
            }
        });
    }

    // 調整主內容的填充
    function adjustMainPadding() {
        const nav = document.querySelector('nav');
        const main = document.querySelector('main');
        
        if (nav && main) {
            const navHeight = nav.offsetHeight;
            main.style.paddingTop = (navHeight + 20) + 'px';
        }
    }

    // 確保在視窗調整大小時也更新填充
    window.addEventListener('resize', adjustMainPadding);

    // Lightbox options
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true
        });
    }

    $(document).on('lightbox:opened', function() {
        if ($('#lightbox-back-button').length === 0) {
            $('<button id="lightbox-back-button" class="lightbox-back-button">Back</button>')
                .appendTo('body')
                .on('click', function() {
                    window.history.back();
                });
        }
    });

    $(document).on('lightbox:closed', function() {
        $('#lightbox-back-button').remove();
    });

    // 監聽按鍵事件
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') { // 按下 ESC 鍵
            if (typeof lightbox !== 'undefined' && typeof lightbox.close === 'function') {
                lightbox.close(); // 調用 lightbox.js 中的 closeLightbox 函數
            }
        }
    });

    // 監聽滾動事件
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 添加滾動動畫
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .experience-card').forEach(el => {
        observer.observe(el);
    });

    // 數字動畫函數
    function animateNumbers() {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 動畫持續時間（毫秒）
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateNumber = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = target;
                }
            };
            
            // 當元素進入視窗時開始動畫
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateNumber();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(stat);
        });
    }

    // 初始化數字動畫
    animateNumbers();
});
