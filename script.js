
// Countdown Timer
function updateCountdown() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 999);
    
    const diff = midnight - now;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.querySelector('.hours').textContent = hours;
    document.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
    document.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Accordion
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        item.classList.toggle('active');
    });
});

// Color options
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
    });
});

// Random sold counter
function updateSoldCounter() {
    const counter = document.querySelector('.sold-counter span');
    const current = parseInt(counter.textContent);
    const change = Math.floor(Math.random() * 3);
    const newValue = current + change;
    counter.textContent = newValue;
    
    // Schedule next update
    setTimeout(updateSoldCounter, Math.random() * 30000 + 15000);
}

setTimeout(updateSoldCounter, 25000);

// Stock countdown
let stockPercentage = 25;
function updateStockBar() {
    stockPercentage -= Math.random() * 0.5;
    if (stockPercentage < 5) stockPercentage = 5;
    
    const stockBar = document.querySelector('.stock-progress');
    stockBar.style.width = stockPercentage + '%';
    
    // Update text when stock gets low
    const stockText = document.querySelector('.stock-text');
    if (stockPercentage <= 10) {
        stockText.textContent = 'Nog slechts enkele stuks beschikbaar! Bestel snel!';
        stockText.style.color = '#B97766';
        stockText.style.fontWeight = 'bold';
    }
    
    setTimeout(updateStockBar, Math.random() * 120000 + 60000);
}

setTimeout(updateStockBar, 30000);

// Add to cart functionality
document.querySelectorAll('.bundle-cta, .cta-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.classList.contains('bundle-cta')) {
            e.preventDefault();
            const cartCount = document.querySelector('.cart-count');
            cartCount.textContent = parseInt(cartCount.textContent) + 1;
            
            // Show success message
            const bundle = this.closest('.bundle-card');
            const originalText = this.textContent;
            
            this.textContent = 'TOEGEVOEGD!';
            this.style.backgroundColor = '#7A8676';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
                this.style.color = '';
            }, 2000);
            
            // Show floating notification
            const notification = document.createElement('div');
            notification.className = 'add-notification';
            notification.innerHTML = '<i class="fas fa-check-circle"></i> Product toegevoegd aan winkelwagen';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 500);
            }, 3000);
        }
    });
});

// Scroll animations
function checkScroll() {
    const elements = document.querySelectorAll('.feature-card, .step, .bundle-card, .review-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Sticky header
const header = document.querySelector('header');
const headerOffset = header.offsetTop;

function stickyHeader() {
    if (window.pageYOffset > headerOffset) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}

window.addEventListener('scroll', stickyHeader);

// Initialize the countdown for bundle offers
let daysLeft = 3;
const bundleBadges = document.querySelectorAll('.bundle-badge');

bundleBadges.forEach(badge => {
    if (badge.classList.contains('popular') || badge.classList.contains('best-value')) {
        badge.innerHTML += ` <span class="badge-countdown">(Nog ${daysLeft} dagen)</span>`;
    }
});

// Show recently viewed notification
setTimeout(() => {
    const recentlyViewed = document.createElement('div');
    recentlyViewed.className = 'recently-viewed';
    recentlyViewed.innerHTML = '<i class="fas fa-eye"></i> 15 mensen bekijken dit product momenteel';
    document.body.appendChild(recentlyViewed);
    
    setTimeout(() => {
        recentlyViewed.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        recentlyViewed.classList.remove('show');
        setTimeout(() => {
            recentlyViewed.remove();
        }, 500);
    }, 5000);
}, 45000);

// Handle newsletter subscription
const subscribeForm = document.createElement('div');
subscribeForm.className = 'subscribe-popup';
subscribeForm.innerHTML = `
    <div class="subscribe-content">
        <span class="close-subscribe">&times;</span>
        <h3>Ontvang 10% korting op je eerste bestelling!</h3>
        <p>Schrijf je in voor onze nieuwsbrief en ontvang exclusieve aanbiedingen.</p>
        <form>
            <input type="email" placeholder="Jouw e-mailadres" required>
            <button type="submit">INSCHRIJVEN</button>
        </form>
        <div class="privacy-note">We respecteren je privacy. Je kunt je altijd uitschrijven.</div>
    </div>
`;

// Add subscribe popup after 60 seconds
setTimeout(() => {
    document.body.appendChild(subscribeForm);
    
    setTimeout(() => {
        subscribeForm.classList.add('show');
    }, 100);
    
    // Close button
    document.querySelector('.close-subscribe').addEventListener('click', () => {
        subscribeForm.classList.remove('show');
        setTimeout(() => {
            subscribeForm.remove();
        }, 500);
    });
    
    // Submit form
    subscribeForm.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        subscribeForm.querySelector('.subscribe-content').innerHTML = `
            <h3>Bedankt voor je inschrijving!</h3>
            <p>Je kortingscode is: <strong>LAVAADO10</strong></p>
            <p>Gebruik deze code bij het afrekenen om 10% korting te krijgen.</p>
            <button class="apply-code">CODE TOEPASSEN</button>
        `;
        
        document.querySelector('.apply-code').addEventListener('click', () => {
            subscribeForm.classList.remove('show');
            setTimeout(() => {
                subscribeForm.remove();
            }, 500);
            
            // Show discount applied notification
            const discountNotification = document.createElement('div');
            discountNotification.className = 'add-notification';
            discountNotification.innerHTML = '<i class="fas fa-check-circle"></i> Kortingscode toegepast: 10% korting';
            document.body.appendChild(discountNotification);
            
            setTimeout(() => {
                discountNotification.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                discountNotification.classList.remove('show');
                setTimeout(() => {
                    discountNotification.remove();
                }, 500);
            }, 3000);
            
            // Update prices with discount
            document.querySelectorAll('.current-price, .bundle-current, .floating-price').forEach(price => {
                const originalPrice = parseFloat(price.textContent.replace('€', '').replace(',', '.'));
                const discountedPrice = (originalPrice * 0.9).toFixed(2).replace('.', ',');
                price.innerHTML = `€${discountedPrice} <span class="discount-applied">-10%</span>`;
            });
        });
    });
}, 60000);
