/**
 * Zymera — Premium Wellness Store JavaScript
 */
document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const header = document.querySelector('.zym-header');
  if (header) {
    const onScroll = () => {
      const scrolled = window.scrollY > 30;
      header.classList.toggle('zym-header--scrolled', scrolled);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile nav toggle
  const navToggle = document.querySelector('.zym-nav-toggle');
  const navMenu = document.querySelector('.zym-nav-menu');
  const navClose = document.querySelector('.zym-nav-close');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (navClose && navMenu) {
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

  if (cartClose && cartSidebar) {
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

  if (searchClose && searchModal) {
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
      showNotification('Bienvenido al circulo Zymera. Revisa tu correo.');
      newsletterForm.reset();
    });
  }

  // Add to cart with animation
  document.querySelectorAll('.zym-add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const form = btn.closest('form');
      if (form) {
        btn.style.pointerEvents = 'none';
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Agregando...';
        const formData = new FormData(form);
        fetch('/cart/add.js', {
          method: 'POST',
          body: formData
        })
        .then(r => r.json())
        .then(data => {
          btn.innerHTML = '<i class="fas fa-check"></i> Agregado';
          btn.style.background = 'var(--zym-primary-dark)';
          showNotification('Agregado a tu carrito');
          updateCartCount();
          setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-shopping-bag"></i> Agregar al Carrito';
            btn.style.background = '';
            btn.style.pointerEvents = '';
          }, 1500);
        })
        .catch(() => {
          showNotification('Error al agregar producto');
          btn.innerHTML = '<i class="fas fa-shopping-bag"></i> Agregar al Carrito';
          btn.style.pointerEvents = '';
        });
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

  // Scroll reveal — fade up on scroll
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.zym-section, .zym-trust-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  updateCartCount();
});

function updateCartCount() {
  fetch('/cart.js')
    .then(r => r.json())
    .then(cart => {
      const countEl = document.querySelector('.zym-cart-count');
      if (countEl) {
        countEl.textContent = cart.item_count;
        if (cart.item_count > 0) {
          countEl.style.display = 'flex';
        }
      }
    })
    .catch(() => {});
}

function showNotification(message) {
  const existing = document.querySelector('.zym-notification');
  if (existing) existing.remove();
  const notification = document.createElement('div');
  notification.className = 'zym-notification';
  notification.innerHTML = '<div class="zym-notification__content"><i class="fas fa-check-circle"></i><span>' + message + '</span></div>';
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'all 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}
