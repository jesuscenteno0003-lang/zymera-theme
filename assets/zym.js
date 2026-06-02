/**
 * Zymera - Shopify JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Header scroll
    const header = document.querySelector('.zym-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Mobile nav
    const navToggle = document.querySelector('.zym-nav-toggle');
    const navMenu = document.querySelector('.zym-nav-menu');
    const navClose = document.querySelector('.zym-nav-close');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    document.querySelectorAll('.zym-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu && navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Cart sidebar
    const cartBtn = document.querySelector('.zym-nav-cart');
    const cartSidebar = document.querySelector('.zym-cart-sidebar');
    const cartClose = document.querySelector('.zym-cart-close');

    if (cartBtn && cartSidebar) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cartSidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (cartClose) {
        cartClose.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Search modal
    const searchBtn = document.querySelector('.zym-nav-search');
    const searchModal = document.querySelector('.zym-search-modal');
    const searchClose = document.querySelector('.zym-search-close');

    if (searchBtn && searchModal) {
        searchBtn.addEventListener('click', () => {
            searchModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                const input = searchModal.querySelector('input');
                if (input) input.focus();
            }, 300);
        });
    }

    if (searchClose) {
        searchClose.addEventListener('click', () => {
            searchModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close modals on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (searchModal && searchModal.classList.contains('active')) {
                searchModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            if (cartSidebar && cartSidebar.classList.contains('active')) {
                cartSidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (cartSidebar && cartSidebar.classList.contains('active') &&
            !cartSidebar.contains(e.target) && !cartBtn.contains(e.target)) {
            cartSidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.zym-newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('¡Gracias por suscribirte! Revisa tu correo.');
            newsletterForm.reset();
        });
    }

    // Add to cart buttons
    document.querySelectorAll('.zym-add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const form = btn.closest('form');
            if (form) {
                const formData = new FormData(form);
                fetch('/cart/add.js', {
                    method: 'POST',
                    body: formData
                })
                .then(r => r.json())
                .then(data => {
                    showNotification('Producto agregado al carrito');
                    updateCartCount();
                })
                .catch(() => showNotification('Error al agregar producto'));
            }
        });
    });

    // Cart quantity
    document.querySelectorAll('.zym-qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const action = btn.dataset.action;
            const key = btn.dataset.key;
            const input = btn.closest('.zym-cart-item-qty').querySelector('input');
            let qty = parseInt(input.value);
            if (action === 'plus') qty++;
            if (action === 'minus') qty--;
            if (qty > 0) {
                fetch('/cart/change.js', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: key, quantity: qty })
                }).then(() => window.location.reload());
            }
        });
    });

    // Remove cart item
    document.querySelectorAll('.zym-cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            fetch('/cart/change.js', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: btn.dataset.key, quantity: 0 })
            }).then(() => window.location.reload());
        });
    });

    // FAQ accordion
    document.querySelectorAll('.zym-faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.zym-faq-item');
            const answer = item.querySelector('.zym-faq-answer');
            const isOpen = item.classList.contains('active');
            document.querySelectorAll('.zym-faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.zym-faq-answer').style.display = 'none';
            });
            if (!isOpen) {
                item.classList.add('active');
                answer.style.display = 'block';
            }
        });
    });

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.zym-reveal').forEach(el => observer.observe(el));

    // Update cart count
    updateCartCount();
});

function updateCartCount() {
    fetch('/cart.js')
        .then(r => r.json())
        .then(cart => {
            const countEl = document.querySelector('.zym-cart-count');
            if (countEl) countEl.textContent = cart.item_count;
        })
        .catch(() => {});
}

function showNotification(message) {
    const existing = document.querySelector('.zym-notification');
    if (existing) existing.remove();
    const notification = document.createElement('div');
    notification.className = 'zym-notification';
    notification.innerHTML = `<div class="zym-notification__content"><i class="fas fa-check-circle"></i><span>${message}</span></div>`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}
