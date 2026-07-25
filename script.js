// Script.js

import { getSession, logout } from "./Auth.js";
import { loadDashboard } from "./Dashboard.js";


// Application Start
async function initApp() {

    try {

        const session = await getSession();


        if (session) {

            const dashboardData = await loadDashboard();

            console.log(
                "Dashboard Loaded:",
                dashboardData
            );

        } else {

            console.log(
                "User not logged in"
            );

        }


    } catch (error) {

        console.error(
            "Application Error:",
            error.message
        );

    }

}



// Logout Button Handler
const logoutButton =
document.getElementById("logout");


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async () => {

            await logout();

            window.location.href =
            "index.html";

        }
    );

}



// Start Application

document.addEventListener(
    "DOMContentLoaded",
    initApp
);
