document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadPortfolio();
    initScrollAnimations();
    initLightbox();
});

async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();
        const grid = document.getElementById('products-grid');
        grid.innerHTML = ''; // Clear loading

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card fade-in';

            // Fallback image if asset doesn't exist (simulated by onerror)
            const imgPath = product.image;

            card.innerHTML = `
                <div class="product-image-wrapper">
                    ${product.badge ? `<span class="badge">${product.badge}</span>` : ''}
                    <img src="${imgPath}" alt="${product.title}" onerror="this.src='https://placehold.co/600x400/eee/31343C?text=Lusso+Furniture'">
                </div>
                <div class="product-details">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-desc">${product.description}</p>
                </div>
            `;
            grid.appendChild(card);
        });

        // Trigger animations for newly added elements
        observeElements();

    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('products-grid').innerHTML = '<p>Unable to load collections at this time.</p>';
    }
}

async function loadPortfolio() {
    try {
        const response = await fetch('portfolio.json');
        const items = await response.json();
        const container = document.getElementById('portfolio-grid');

        items.forEach(item => {
            const el = document.createElement('div');
            el.className = 'portfolio-item fade-in';
            el.innerHTML = `
                <img src="${item.image}" alt="${item.title}" onerror="this.src='https://placehold.co/600x800/eee/31343C?text=Project+View'">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.category}</p>
                </div>
            `;

            el.addEventListener('click', () => {
                openLightbox(item.image, item.title, item.description);
            });

            container.appendChild(el);
        });

        observeElements();

    } catch (error) {
        console.error('Error loading portfolio:', error);
    }
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCap = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

function initLightbox() {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
}

function openLightbox(src, title, desc) {
    // Check if the src is valid (if it was a broken link in the grid, we probably want the placeholder here too)
    // For simplicity, we just try to load it. 
    // In a real app we might pass the *current* src of the clicked img to avoid broken links in lightbox.
    // Let's grab the actual image source from the click event if possible, but here we passed the data.
    // We will trust the data or fallback again.

    lightboxImg.src = src;
    lightboxImg.onerror = function () {
        this.src = 'https://placehold.co/600x800/eee/31343C?text=Project+View';
    };

    lightboxCap.textContent = `${title} - ${desc}`;
    lightbox.classList.add('active');
}

// Animations
function initScrollAnimations() {
    observeElements();
}

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // layout only once
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Mobile Menu (Simple toggle)
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}
fetch('gallery.json')
    .then(res => res.json())
    .then(images => {
        const grid = document.getElementById('galleryGrid');

        images.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gallery-item fade-in';

            div.innerHTML = `
        <img src="${item.image}" alt="${item.alt}" loading="lazy">
      `;

            div.addEventListener('click', () => {
                openLightbox(item.image, item.alt);
            });

            grid.appendChild(div);
        });

        observeElements('.gallery-item');
    });

fetch('gallery.json')
    .then(res => res.json())
    .then(images => {
        const grid = document.getElementById('galleryGrid');

        images.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gallery-item fade-in';

            div.innerHTML = `
        <img src="${item.image}" alt="${item.alt}" loading="lazy">
      `;

            div.addEventListener('click', () => {
                openLightbox(item.image, item.alt);
            });

            grid.appendChild(div);
        });

        observeElements('.gallery-item');
    });

  const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

let currentIndex = 0;

function showSlide(index) {
    if (index < 0) currentIndex = slide.length - 1;
    else if (index >= slide.length) currentIndex = 0;
    else currentIndex = index;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

/* Optional: Auto-slide every 5 seconds */
setInterval(() => {
    showSlide(currentIndex + 1);
}, 5000);
