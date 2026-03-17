// 1. Loading Screen Animasi
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.visibility = 'hidden';
            loader.style.display = 'none';
            triggerChartAnimation(); 
        }, 500); 
    }, 1200); 
});

// 2. Intersection Observer untuk Fade-In dan Animasi Grafik (Scroll Trigger)
const observerOptions = {
    threshold: 0.2, 
    rootMargin: "0px 0px -50px 0px"
};

const scrollObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            
            if(entry.target.querySelector('.bar-chart')) {
                triggerChartAnimation();
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    scrollObserver.observe(el);
});

// 3. Efek Dinamis Grafik Bar (Tumbuh dari Bawah)
function triggerChartAnimation() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        const targetHeight = bar.getAttribute('data-height');
        setTimeout(() => {
            bar.style.height = targetHeight;
        }, index * 200); 
    });
}

// 4. Parallax Effect Sederhana pada Hero Section saat Mouse Bergerak
document.addEventListener("mousemove", parallaxHero);
function parallaxHero(e) {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    const x = (window.innerWidth - e.pageX * 2) / 90;
    const y = (window.innerHeight - e.pageY * 2) / 90;

    // KOREKSI: Menggunakan Backticks (`) di sebelah angka 1 pada keyboard
    heroContent.style.transform = 'translateX(${x}px) translateY(${y}px)';
}

// 5. Efek Tilt 3D pada Kartu Menu (Interaktif)
document.addEventListener('DOMContentLoaded', () => {
    const menuCards = document.querySelectorAll('.elegant-card');

    menuCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = -(y - centerY) / 10; 
            const tiltY = (x - centerX) / 10;
            
            card.style.transition = 'none'; 
            
            card.style.transform = 'perspective(1000px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) scale(1.02) translateY(-5px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease-out'; 
            
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0)';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Membuat observer untuk mendeteksi kapan elemen terlihat di layar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Jika elemen terlihat (intersecting)
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.15 // Animasi dimulai saat 15% bagian elemen terlihat di layar
    });

    // Mengambil semua elemen yang memiliki class 'fade-in'
    const hiddenElements = document.querySelectorAll('.fade-in');
    
    // Memulai pemantauan untuk setiap elemen
    hiddenElements.forEach((el) => observer.observe(el));
});