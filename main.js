// Step 1: Import the 'supabase' client from our config file
import { supabase } from './supabase-config.js';

// Step 2: Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element References ---
    const featuredAppsGrid = document.getElementById('featured-apps');
    const allAppsGrid = document.getElementById('all-apps');

    // --- Function to Create an App Card HTML ---
    // YEH FUNCTION BILKUL WAHI HAI, KOI CHANGE NAHI
    function createAppCard(app) {
        // Supabase mein data seedha milta hai, 'data' property ke andar nahi
        const categoryHTML = app.category ? `<p>${app.category}</p>` : '';
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

    // --- Function to Fetch and Display Apps (Updated for Supabase) ---
    async function fetchAndDisplayApps() {
        try {
            // Supabase se data fetch karne ka naya tareeka
            const { data: apps, error } = await supabase
                .from('apps') // Table ka naam
                .select('*') // Saare columns select karo
                .order('created_at', { ascending: false }); // Naye apps pehle

            if (error) {
                // Agar Supabase se koi error aaye
                throw error;
            }

            // Clear the loading message
            featuredAppsGrid.innerHTML = '';
            allAppsGrid.innerHTML = '';

            if (!apps || apps.length === 0) {
                allAppsGrid.innerHTML = '<p>No apps found.</p>';
                return;
            }

            // Loop through each app
            apps.forEach(app => {
                const cardHTML = createAppCard(app);

                // Check if the app is featured
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
