// ===== DOCUMENT READY =====
$(function () {
    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();
    
    // Initialize experience calculation
    calculateYearsAndMonths();
});

// ===== FILE DOWNLOAD FUNCTION =====
function downloadFile() {
    try {
        const fileName = "Manoj_Kumar.pdf";
        
        // Create a Blob object from the file
        const fileBlob = new Blob([new File([fileName], fileName)], { 
            type: 'application/pdf' 
        });

        // Create a URL object from the Blob object
        const url = URL.createObjectURL(fileBlob);

        // Create a new anchor element and set its href attribute to the URL object
        const anchorElement = document.createElement("a");
        anchorElement.href = url;
        anchorElement.download = fileName;

        // Click the anchor element to download the file
        anchorElement.click();

        // Revoke the object URL to avoid memory leaks
        URL.revokeObjectURL(url);
        
        // Show success feedback (optional)
        console.log('CV download initiated');
    } catch (error) {
        console.error('Error downloading file:', error);
        alert('Sorry, there was an error downloading the CV. Please try again.');
    }
}

// ===== SOCIAL LINKS FUNCTION =====
function openLink(social) {
    const SOCIAL_URLS = {
        linkedin: "https://www.linkedin.com/in/mkv336699",
        leetcode: "https://leetcode.com/mkv336699",
        github: "https://github.com/mkv336699",
        gitlab: "https://gitlab.com/mkv336699",
        stackoverflow: "https://stackoverflow.com/users/13362998/manoj-kumar",
    };
    
    try {
        const url = SOCIAL_URLS[social];
        if (url) {
            window.open(url, "_blank", "noopener,noreferrer");
        } else {
            console.error('Invalid social platform:', social);
        }
    } catch (error) {
        console.error('Error opening social link:', error);
    }
}

// ===== EXPERIENCE CALCULATION FUNCTION =====
function calculateYearsAndMonths() {
    try {
        const givenDate = new Date('2019-09-19');
        const today = new Date();

        // Validate dates
        if (isNaN(givenDate.getTime()) || isNaN(today.getTime())) {
            throw new Error('Invalid date');
        }

        let years = today.getFullYear() - givenDate.getFullYear();
        let months = today.getMonth() - givenDate.getMonth();
        let days = today.getDate() - givenDate.getDate();

        // Adjust for negative months
        if (days < 0) {
            months -= 1;
        }
        
        if (months < 0) {
            years -= 1;
            months += 12;
        }

        // Create labels with proper pluralization
        const yearLabel = years === 1 ? "year" : "years";
        const monthLabel = months === 1 ? "month" : "months";
        
        const calculateExperience = `${years} ${yearLabel} ${months} ${monthLabel}`;

        // Update all experience elements
        const experienceElements = document.getElementsByClassName("experience-td");
        for (let element of experienceElements) {
            element.innerText = calculateExperience;
        }
        
        console.log('Experience calculated:', calculateExperience);
    } catch (error) {
        console.error('Error calculating experience:', error);
        // Fallback experience text
        const fallbackText = "4+ years";
        const experienceElements = document.getElementsByClassName("experience-td");
        for (let element of experienceElements) {
            element.innerText = fallbackText;
        }
    }
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll function
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== EVENT LISTENERS =====

// Add smooth scrolling to anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScrollTo(targetId);
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close tooltips
    if (e.key === 'Escape') {
        $('[data-toggle="tooltip"]').tooltip('hide');
    }
});

// ===== PERFORMANCE OPTIMIZATIONS =====

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Add any scroll-based functionality here
    // For example, parallax effects or scroll-triggered animations
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// ===== ACCESSIBILITY IMPROVEMENTS =====

// Add focus management for better accessibility
document.addEventListener('DOMContentLoaded', function() {
    // Add focus indicators for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [tabindex]');
    interactiveElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #007bff';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
});
