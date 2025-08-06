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
        const fileName = "Manoj_Kumar_CV.pdf";
        
        // Use the existing PDF file in the root directory
        const cvUrl = "./Manoj_Kumar.pdf";
        
        // Create a temporary anchor element
        const anchorElement = document.createElement("a");
        anchorElement.href = cvUrl;
        anchorElement.download = fileName;
        anchorElement.target = "_blank";
        
        // Add to DOM temporarily
        document.body.appendChild(anchorElement);
        
        // Trigger download
        anchorElement.click();
        
        // Clean up
        document.body.removeChild(anchorElement);
        
        // Show success feedback
        console.log('CV download initiated');
        
        // Optional: Show a success message to user
        showNotification('CV download started!', 'success');
        
    } catch (error) {
        console.error('Error downloading file:', error);
        
        // Fallback: Open in new tab or show message
        showNotification('CV file not found. Please contact me directly for my CV.', 'info');
        
        // Alternative: Open email client
        const emailSubject = encodeURIComponent('Request for CV - Manoj Kumar');
        const emailBody = encodeURIComponent('Hi Manoj,\n\nI would like to request your CV for a potential opportunity.\n\nBest regards,');
        const mailtoLink = `mailto:mkv336699@gmail.com?subject=${emailSubject}&body=${emailBody}`;
        
        // Show option to email
        if (confirm('CV file not available for download. Would you like to email me to request my CV?')) {
            window.open(mailtoLink, '_blank');
        }
    }
}

// ===== NOTIFICATION FUNCTION =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
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
