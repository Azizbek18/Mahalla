document.addEventListener('DOMContentLoaded', () => {
    const tags = document.querySelectorAll('.tags span');

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('selected');
        });
    });
});

const categoryBtns = document.querySelectorAll('.category button');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        categoryBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});