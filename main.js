// ***** YAHAN CHANGE HUA HAI *****
// Step 1: 'supabase' ki jagah 'sb' ko import karein
import { sb } from './supabase-config.js';

// Step 2: Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element References ---
    const featuredAppsGrid = document.getElementById('featured-apps');
    const allAppsGrid = document.getElementById('all-apps');

    // --- Function to Create an App Card HTML ---
    function createAppCard(app) {
        const categoryHTML = app.category ? `<p class="app-card-category">${app.category}</p>` : '';
        return `
            <a href="app.html?id=${app.id}" class="app-card">
                <div class="app-card-content">
                    <img src="${app.iconUrl}" alt="${app.name} Icon" class="app-card-icon">
                    <div class="app-card-info">
                        <h3>${app.name}</h3>
                        ${categoryHTML}
                    </div>
                </div>
            </a>
        `;
    }

    // --- Function to Fetch and Display Apps ---
    async function fetchAndDisplayApps() {
        try {
            // ***** YAHAN CHANGE HUA HAI *****
            // 'supabase' ki jagah 'sb' use karein
            const { data: apps, error } = await sb
                .from('apps')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                throw error;
            }

            featuredAppsGrid.innerHTML = '';
            allAppsGrid.innerHTML = '';

            if (!apps || apps.length === 0) {
                allAppsGrid.innerHTML = '<p>No apps found.</p>';
                return;
            }

            apps.forEach(app => {
                const cardHTML = createAppCard(app);
                if (app.isFeatured) {
                    featuredAppsGrid.innerHTML += cardHTML;
                }
                allAppsGrid.innerHTML += cardHTML;
            });

        } catch (error) {
            console.error("Error fetching apps: ", error);
            allAppsGrid.innerHTML = `<p>Could not load apps: ${error.message}</p>`;
        }
    }

    // --- Initial Call ---
    fetchAndDisplayApps();
});
