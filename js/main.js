document.addEventListener('DOMContentLoaded', function() {
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

    // 菜單切換
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('nav ul');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('show');
        });
    }

    // 調整主內容的填充
    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    
    if (nav && main) {
        var navHeight = nav.offsetHeight;
        main.style.paddingTop = navHeight + 'px';
    }
});
