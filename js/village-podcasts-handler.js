/**
 * Papa Remo Beach Website - Village & Podcasts Handler
 * Handles PDF downloads and podcast functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize PDF download tracking
    initializePdfTracking();
    
    // Initialize audio players if on podcasts page
    if (window.location.href.includes('podcasts.html')) {
        initializeAudioPlayers();
        initializeCommentSystem();
    }
});

/**
 * Initialize PDF download tracking
 */
function initializePdfTracking() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const pdfUrl = this.getAttribute('href');
            const pdfName = pdfUrl.split('/').pop();
            
            // Log download event
            console.log(`PDF Downloaded: ${pdfName}`);
            
            // Track download in localStorage for analytics
            trackDownload(pdfName);
        });
    });
}

/**
 * Track PDF downloads in localStorage
 * @param {string} pdfName - Name of the PDF file
 */
function trackDownload(pdfName) {
    // Get existing download stats
    let downloadStats = JSON.parse(localStorage.getItem('pdfDownloadStats')) || {};
    
    // Update stats for this PDF
    if (!downloadStats[pdfName]) {
        downloadStats[pdfName] = 0;
    }
    downloadStats[pdfName]++;
    
    // Save back to localStorage
    localStorage.setItem('pdfDownloadStats', JSON.stringify(downloadStats));
    
    // Also track total downloads
    let totalDownloads = parseInt(localStorage.getItem('totalPdfDownloads') || '0');
    totalDownloads++;
    localStorage.setItem('totalPdfDownloads', totalDownloads.toString());
}

/**
 * Initialize audio players for podcast page
 */
function initializeAudioPlayers() {
    const audioElements = document.querySelectorAll('audio');
    
    audioElements.forEach(audio => {
        // Set up audio element
        audio.addEventListener('loadedmetadata', function() {
            updateAudioTimeDisplay(this);
        });
        
        audio.addEventListener('timeupdate', function() {
            updateAudioProgress(this);
            updateAudioTimeDisplay(this);
        });
        
        audio.addEventListener('ended', function() {
            resetAudioPlayer(this);
        });
        
        // Set up play/pause button
        const audioId = audio.id;
        const playPauseBtn = document.querySelector(`.play-pause-btn[data-audio-id="${audioId}"]`);
        
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', function() {
                toggleAudioPlayback(audioId);
            });
        }
        
        // Set up progress bar
        const progressBar = document.querySelector(`.audio-progress[data-audio-id="${audioId}"]`);
        
        if (progressBar) {
            progressBar.addEventListener('input', function() {
                seekAudio(audioId, this.value);
            });
        }
    });
}

/**
 * Toggle audio playback
 * @param {string} audioId - ID of the audio element
 */
function toggleAudioPlayback(audioId) {
    const audio = document.getElementById(audioId);
    const playPauseBtn = document.querySelector(`.play-pause-btn[data-audio-id="${audioId}"]`);
    
    if (!audio || !playPauseBtn) return;
    
    if (audio.paused) {
        // Pause all other audio elements first
        document.querySelectorAll('audio').forEach(a => {
            if (a.id !== audioId && !a.paused) {
                a.pause();
                const otherBtn = document.querySelector(`.play-pause-btn[data-audio-id="${a.id}"]`);
                if (otherBtn) {
                    otherBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            }
        });
        
        // Play this audio
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

/**
 * Update audio progress bar
 * @param {HTMLAudioElement} audio - The audio element
 */
function updateAudioProgress(audio) {
    const audioId = audio.id;
    const progressBar = document.querySelector(`.audio-progress[data-audio-id="${audioId}"]`);
    
    if (progressBar && !isNaN(audio.duration)) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
    }
}

/**
 * Update audio time display
 * @param {HTMLAudioElement} audio - The audio element
 */
function updateAudioTimeDisplay(audio) {
    const audioId = audio.id;
    const timeDisplay = document.querySelector(`.audio-time[data-audio-id="${audioId}"]`);
    
    if (timeDisplay) {
        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60);
        const durationMinutes = Math.floor((audio.duration || 0) / 60);
        const durationSeconds = Math.floor((audio.duration || 0) % 60);
        
        timeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
    }
}

/**
 * Seek to a specific position in the audio
 * @param {string} audioId - ID of the audio element
 * @param {number} progressValue - Progress value (0-100)
 */
function seekAudio(audioId, progressValue) {
    const audio = document.getElementById(audioId);
    
    if (audio && !isNaN(audio.duration)) {
        const seekTime = (progressValue / 100) * audio.duration;
        audio.currentTime = seekTime;
    }
}

/**
 * Reset audio player when playback ends
 * @param {HTMLAudioElement} audio - The audio element
 */
function resetAudioPlayer(audio) {
    const audioId = audio.id;
    const playPauseBtn = document.querySelector(`.play-pause-btn[data-audio-id="${audioId}"]`);
    
    if (playPauseBtn) {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

/**
 * Initialize comment system for podcast page
 */
function initializeCommentSystem() {
    // Set up comment forms
    const commentForms = document.querySelectorAll('form[id^="comment-form-"]');
    
    commentForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (validateCommentForm(this)) {
                submitComment(this);
            }
        });
    });
    
    // Load existing comments
    loadComments();
}

/**
 * Validate a comment form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateCommentForm(form) {
    const nameInput = form.querySelector('[name="name"]');
    const emailInput = form.querySelector('[name="email"]');
    const commentInput = form.querySelector('[name="comment"]');
    let isValid = true;
    
    // Validate name
    if (!nameInput.value.trim()) {
        markInvalid(nameInput, 'Please enter your name');
        isValid = false;
    } else {
        markValid(nameInput);
    }
    
    // Validate email
    if (!emailInput.value.trim()) {
        markInvalid(emailInput, 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        markInvalid(emailInput, 'Please enter a valid email address');
        isValid = false;
    } else {
        markValid(emailInput);
    }
    
    // Validate comment
    if (!commentInput.value.trim()) {
        markInvalid(commentInput, 'Please enter your comment');
        isValid = false;
    } else {
        markValid(commentInput);
    }
    
    return isValid;
}

/**
 * Mark a form field as invalid
 * @param {HTMLElement} field - The field to mark
 * @param {string} message - The error message
 */
function markInvalid(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    
    // Add or update error message
    let errorElement = field.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('invalid-feedback')) {
        errorElement = document.createElement('div');
        errorElement.className = 'invalid-feedback';
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    errorElement.textContent = message;
}

/**
 * Mark a form field as valid
 * @param {HTMLElement} field - The field to mark
 */
function markValid(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    
    // Remove error message if it exists
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('invalid-feedback')) {
        errorElement.remove();
    }
}

/**
 * Check if an email is valid
 * @param {string} email - The email to check
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Submit a comment
 * @param {HTMLFormElement} form - The form to submit
 */
function submitComment(form) {
    const episodeId = form.id.replace('comment-form-', '');
    const nameInput = form.querySelector('[name="name"]');
    const emailInput = form.querySelector('[name="email"]');
    const commentInput = form.querySelector('[name="comment"]');
    
    // Create comment object
    const comment = {
        id: Date.now(),
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        comment: commentInput.value.trim(),
        date: new Date().toISOString(),
        episodeId: episodeId
    };
    
    // Save comment
    saveComment(comment);
    
    // Add comment to page
    addCommentToPage(comment);
    
    // Reset form
    form.reset();
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success';
    successMessage.textContent = 'Your comment has been posted!';
    form.appendChild(successMessage);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

/**
 * Save a comment to localStorage
 * @param {Object} comment - The comment to save
 */
function saveComment(comment) {
    // Get existing comments
    let comments = JSON.parse(localStorage.getItem('papaRemoComments')) || [];
    
    // Add new comment
    comments.push(comment);
    
    // Save back to localStorage
    localStorage.setItem('papaRemoComments', JSON.stringify(comments));
}

/**
 * Load comments from localStorage
 */
function loadComments() {
    const comments = JSON.parse(localStorage.getItem('papaRemoComments')) || [];
    
    // Add each comment to the page
    comments.forEach(comment => {
        addCommentToPage(comment);
    });
}

/**
 * Add a comment to the page
 * @param {Object} comment - The comment to add
 */
function addCommentToPage(comment) {
    const commentsList = document.getElementById(`comments-${comment.episodeId}`);
    if (!commentsList) return;
    
    // Create comment element
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.dataset.commentId = comment.id;
    
    // Format date
    const commentDate = new Date(comment.date);
    const formattedDate = `${commentDate.toLocaleDateString()} at ${commentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    
    // Set comment HTML
    commentElement.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${escapeHTML(comment.name)}</span>
            <span class="comment-date">${formattedDate}</span>
        </div>
        <div class="comment-content">
            <p>${escapeHTML(comment.comment)}</p>
        </div>
    `;
    
    // Add to comments list
    commentsList.appendChild(commentElement);
}

/**
 * Escape HTML special characters
 * @param {string} str - The string to escape
 * @returns {string} - The escaped string
 */
function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Toggle comments section visibility
 * @param {string} commentsId - ID of the comments section
 */
function toggleComments(commentsId) {
    const commentsSection = document.getElementById(commentsId);
    const button = document.querySelector(`button[onclick="toggleComments('${commentsId}')"]`);
    
    if (commentsSection.style.display === 'none') {
        commentsSection.style.display = 'block';
        button.textContent = 'Hide Comments';
    } else {
        commentsSection.style.display = 'none';
        button.textContent = 'Show Comments';
    }
}