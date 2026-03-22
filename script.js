// Add 'reveal' class to sections/elements we want to animate on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Select elements to animate
    const sections = document.querySelectorAll('.skills-section, .experience-section, .projects-section, .skill-card, .timeline-item, .project-card');
    
    sections.forEach(section => {
        section.classList.add('reveal');
    });

    // Intersection Observer for scroll animations
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    sections.forEach(section => {
        revealOnScroll.observe(section);
    });

    // Smooth subtle parallax effect for background blob
    const blob = document.querySelector('.blob-bg');
    if (blob) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            blob.style.transform = `translate(${x * 30}px, ${y * 30}px) scale(1.1)`;
        });
    }

    // Modal Logic
    const modal = document.getElementById('content-modal');
    const modalMedia = document.getElementById('modal-media-container');
    const modalText = document.getElementById('modal-text-container');
    const closeBtn = document.querySelector('.close-modal');

    function openModal(mediaElement, titleHtml, textHtml) {
        modalMedia.innerHTML = '';
        modalText.innerHTML = '';
        
        const clonedMedia = mediaElement.cloneNode(true);
        if (clonedMedia.tagName === 'VIDEO') {
            clonedMedia.controls = true;
        }
        modalMedia.appendChild(clonedMedia);
        
        if (titleHtml) {
            modalText.innerHTML += `<h3>${titleHtml}</h3>`;
        }
        if (textHtml) {
            modalText.innerHTML += `<p>${textHtml}</p>`;
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
    }

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // restore scrolling
        
        // clean up media to stop videos playing
        setTimeout(() => {
            modalMedia.innerHTML = '';
        }, 300);
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.closest('.close-modal')) {
            closeModal();
        }
    });

    // Add click listeners to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const img = card.querySelector('.project-img');
            const title = card.querySelector('h3').innerText;
            const desc = card.querySelector('p').innerText;
            openModal(img, title, desc);
        });
    });

    // Add click listeners to experience images and videos
    document.querySelectorAll('.exp-images img, .exp-video').forEach(media => {
        media.style.cursor = 'pointer';
        media.addEventListener('click', (e) => {
            // Find parent timeline-content to get text
            const timelineContent = e.target.closest('.timeline-content');
            const title = timelineContent.querySelector('h3').innerText;
            const desc = timelineContent.querySelector('p').innerText;
            openModal(e.target, title, desc);
        });
    });
});
