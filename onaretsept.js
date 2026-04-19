document.addEventListener('DOMContentLoaded', () => {

    // 🔥 TAG SELECT
    const tags = document.querySelectorAll('.tags span');

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('selected');
        });
    });

    // 🔥 CATEGORY ACTIVE
    const categoryBtns = document.querySelectorAll('.category button');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 🔥 CARD SCROLL ANIMATION
    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 150); // ketma-ket chiqadi 🔥
            }
        });
    }, {
        threshold: 0.2
    });

    cards.forEach(card => {
        observer.observe(card);
    });

});