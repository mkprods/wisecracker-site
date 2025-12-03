/* ===================================
   PORTFOLIO SITE - MAIN JAVASCRIPT

   This script handles:
   1. Loading project data from projects.json
   2. Rendering project cards in each section
   3. Navigation between sections
   4. Expand/collapse functionality for cards
   =================================== */

// ===================================
// STATE MANAGEMENT
// ===================================

let projectsData = []; // Will hold all projects loaded from JSON

// ===================================
// INITIALIZATION
// When the page loads, fetch data and set up event listeners
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Load projects and initialize the site
    loadProjects();

    // Set up navigation
    setupNavigation();
});

// ===================================
// LOAD PROJECTS FROM JSON
// Fetch the projects.json file and render projects
// ===================================

async function loadProjects() {
    try {
        const response = await fetch('projects.json');

        if (!response.ok) {
            throw new Error('Failed to load projects.json');
        }

        projectsData = await response.json();

        // Render projects for each section
        renderProjects('words');
        renderProjects('pictures');
        renderProjects('performances');
        renderProjects('research');

    } catch (error) {
        console.error('Error loading projects:', error);
        // Show error message to user
        showErrorMessage();
    }
}

// ===================================
// RENDER PROJECTS FOR A CATEGORY
// Filter projects by category and create cards
// ===================================

function renderProjects(category) {
    // Get the container for this category
    const container = document.querySelector(`.projects-container[data-category="${category}"]`);

    if (!container) {
        console.error(`Container not found for category: ${category}`);
        return;
    }

    // Filter projects for this category
    const categoryProjects = projectsData.filter(project => project.category === category);

    // If no projects, show empty state
    if (categoryProjects.length === 0) {
        container.innerHTML = '<p class="empty-state">No projects yet in this section.</p>';
        return;
    }

    // Sort projects by date (newest first)
    categoryProjects.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Clear container and add project cards
    container.innerHTML = '';
    categoryProjects.forEach(project => {
        const card = createProjectCard(project);
        container.appendChild(card);
    });
}

// ===================================
// CREATE A PROJECT CARD
// Build the HTML structure for a single project
// ===================================

function createProjectCard(project) {
    // Create card container
    const card = document.createElement('article');
    card.className = 'project-card';

    // Format the date nicely
    const formattedDate = formatDate(project.date);

    // Build card header (always visible)
    const header = `
        <div class="project-header">
            <h3 class="project-title">${escapeHtml(project.title)}</h3>
            <time class="project-date" datetime="${project.date}">${formattedDate}</time>
        </div>
        <p class="expand-indicator">View details</p>
    `;

    // Build card content (expandable)
    const content = `
        <div class="project-content">
            <p class="project-description">${escapeHtml(project.description)}</p>
            ${createImagesHtml(project.images)}
            ${createVideosHtml(project.videoEmbeds)}
            ${createLinksHtml(project.links)}
        </div>
    `;

    // Combine header and content
    card.innerHTML = header + content;

    // Add click handler for expand/collapse
    card.addEventListener('click', (e) => {
        // Don't toggle if clicking on a link
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            return;
        }
        card.classList.toggle('expanded');
    });

    return card;
}

// ===================================
// CREATE HTML FOR PROJECT IMAGES
// Generate image tags for all project images
// ===================================

function createImagesHtml(images) {
    if (!images || images.length === 0) {
        return '';
    }

    const imageHtml = images.map(imageUrl =>
        `<img src="${escapeHtml(imageUrl)}" alt="Project image" class="project-image" loading="lazy">`
    ).join('');

    return `<div class="project-images">${imageHtml}</div>`;
}

// ===================================
// CREATE HTML FOR VIDEO EMBEDS
// Generate responsive iframe wrappers for videos
// ===================================

function createVideosHtml(videoEmbeds) {
    if (!videoEmbeds || videoEmbeds.length === 0) {
        return '';
    }

    const videoHtml = videoEmbeds.map(embedUrl =>
        `<div class="video-wrapper">
            <iframe src="${escapeHtml(embedUrl)}"
                    allowfullscreen
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
            </iframe>
        </div>`
    ).join('');

    return `<div class="project-videos">${videoHtml}</div>`;
}

// ===================================
// CREATE HTML FOR EXTERNAL LINKS
// Generate link buttons for project links
// ===================================

function createLinksHtml(links) {
    if (!links || links.length === 0) {
        return '';
    }

    const linksHtml = links.map(link =>
        `<a href="${escapeHtml(link.url)}"
            class="project-link"
            target="_blank"
            rel="noopener noreferrer">${escapeHtml(link.label)}</a>`
    ).join('');

    return `<div class="project-links">${linksHtml}</div>`;
}

// ===================================
// NAVIGATION
// Handle switching between sections
// ===================================

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Get the target section from data attribute
            const targetSection = link.dataset.section;

            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');

            // Update active section
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');

            // Update URL hash without scrolling
            history.pushState(null, null, `#${targetSection}`);

            // Collapse any expanded cards when switching sections
            collapseAllCards();
        });
    });

    // Handle direct URL navigation (e.g., #pictures)
    handleInitialHash();
}

// ===================================
// HANDLE INITIAL URL HASH
// If URL has a hash, navigate to that section
// ===================================

function handleInitialHash() {
    const hash = window.location.hash.slice(1); // Remove the # symbol

    if (hash) {
        const targetLink = document.querySelector(`.nav-link[data-section="${hash}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
}

// ===================================
// COLLAPSE ALL CARDS
// Close all expanded project cards
// ===================================

function collapseAllCards() {
    const expandedCards = document.querySelectorAll('.project-card.expanded');
    expandedCards.forEach(card => card.classList.remove('expanded'));
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Format a date string into a readable format
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} - Formatted date (e.g., "November 15, 2024")
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Show an error message when projects.json fails to load
 */
function showErrorMessage() {
    const containers = document.querySelectorAll('.projects-container');
    containers.forEach(container => {
        container.innerHTML = `
            <p class="empty-state">
                Unable to load projects. Please make sure projects.json exists in the same directory.
            </p>
        `;
    });
}
