// Step 1: Import the 'sb' client
import { sb } from './supabase-config.js';

// Step 2: Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('app-detail-container');

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const appId = urlParams.get('id');

        if (!appId) {
            throw new Error("No App ID found in URL.");
        }

        // --- Fetch single app from Supabase ---
        const { data: appData, error } = await sb
            .from('apps')
            .select('*')
            .eq('id', appId) // 'eq' means 'equals'. Get the app where id matches.
            .single(); // Humein sirf ek result chahiye

        if (error) {
            throw error;
        }

        if (appData) {
            document.title = `${appData.name} - Ai Technocrafts Store`;
            displayAppDetails(appData);
        } else {
            throw new Error("App not found!");
        }

    } catch (error) {
        console.error("Error fetching app details:", error);
        container.innerHTML = `<p class="error-text">Error: ${error.message}</p>`;
    }
});

// --- Function to display the fetched data in HTML ---
function displayAppDetails(data) {
    const container = document.getElementById('app-detail-container');
    
    const downloadButtonHTML = data.apkUrl && data.apkUrl.trim() !== ''
        ? `<a href="${data.apkUrl}" class="download-button" target="_blank" rel="noopener noreferrer">Download APK</a>`
        : `<p class="no-download">Download link not available yet.</p>`;

    const categoryHTML = data.category ? `<p class="app-detail-category">${data.category}</p>` : '';

    // Supabase mein screenshots `jsonb` type mein hain, to woh ek array hi hoga
    const screenshotsHTML = (data.screenshots && data.screenshots.length > 0)
        ? data.screenshots.map(url => `<img src="${url}" alt="App Screenshot">`).join('')
        : '<p>No screenshots available.</p>';
    
    container.innerHTML = `
        <div class="app-detail-header">
            <img src="${data.iconUrl}" alt="${data.name} Icon" class="app-detail-icon">
            <div class="app-detail-title-group">
                <h1>${data.name}</h1>
                ${categoryHTML}
                <span>By Ai Technocrafts</span>
            </div>
        </div>

        <div class="app-detail-actions">
            ${downloadButtonHTML}
        </div>

        <div class="screenshots-gallery">
            <h2>Screenshots</h2>
            <div class="gallery">
                ${screenshotsHTML}
            </div>
        </div>

        <div class="app-description">
            <h2>About this app</h2>
            <p>${data.description || 'No description provided.'}</p>
        </div>
    `;
}
