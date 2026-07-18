import React from 'react'

export async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);

    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

export async function handleSignUpSubmit(e, navigate) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userDetails = Object.fromEntries(formData);

    if (userDetails.password) {
        userDetails.password = await hashPassword(userDetails.password.trim());
    }

    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    navigate('/login');
}

export async function handleLoginSubmit(e, navigate) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const loginDetails = Object.fromEntries(formData);
    const storedUserString = localStorage.getItem('userDetails');

    if (!storedUserString) {
        alert("No user found. Please sign up first.");
        return;
    }

    const storedUser = JSON.parse(storedUserString);
    const hashedInputPassword = await hashPassword(loginDetails.password.trim());

    if (loginDetails.email === storedUser.email && hashedInputPassword === storedUser.password) {
        localStorage.setItem('isLogIn', 'true');
        navigate('/dashboard');
    } else {
        alert('Please enter vaild credentials');
        return;
    }

    if (loginDetails.email === 'user@gmail.com') {
        const initialTasks = InitialTask()
        localStorage.setItem('task', JSON.stringify(initialTasks))
    }
}

export function InitialTask() {
    const initialTasks = [
        {
            "id": "1",
            "title": "Configure WordPress Theme",
            "description": "Set up the initial theme and install necessary plugins for the new client website.",
            "date": "2026-07-18",
            "status": "Pending",
            "priority": "High"
        },
        {
            "id": "2",
            "title": "Debug Django REST API",
            "description": "Investigate and resolve the 500 internal server error occurring on the user authentication endpoint.",
            "date": "2026-07-15",
            "status": "Completed",
            "priority": "High"
        },
        {
            "id": "3",
            "title": "Update MintFizo Listings",
            "description": "Optimize SEO keywords and update pricing for the new custom jewelry line on the Etsy storefront.",
            "date": "2026-07-20",
            "status": "Pending",
            "priority": "Medium"
        },
        {
            "id": "4",
            "title": "Integrate MediaPipe",
            "description": "Connect the Google MediaPipe framework with the React frontend for the virtual try-on system.",
            "date": "2026-07-22",
            "status": "Pending",
            "priority": "High"
        },
        {
            "id": "5",
            "title": "Test 6800uf Capacitors",
            "description": "Use the multimeter to test the new batch of capacitors and ensure they meet specifications for the audio board.",
            "date": "2026-07-16",
            "status": "Completed",
            "priority": "Low"
        },
        {
            "id": "6",
            "title": "Research Tech Roles in Germany",
            "description": "Compile a list of software engineering vacancies at German startups that sponsor visas for fresh graduates.",
            "date": "2026-07-25",
            "status": "Pending",
            "priority": "Medium"
        },
        {
            "id": "7",
            "title": "BigBasket Vendor Requirements",
            "description": "Review the documentation and packaging requirements for listing dry dates and saffron on e-commerce platforms.",
            "date": "2026-07-28",
            "status": "Pending",
            "priority": "Low"
        },
        {
            "id": "8",
            "title": "Generate 3D Marketing Video",
            "description": "Use AI tools to render a 3D animated promotional video for the upcoming product launch.",
            "date": "2026-07-19",
            "status": "Pending",
            "priority": "Medium"
        },
        {
            "id": "9",
            "title": "Implement Local Storage",
            "description": "Write the useEffect hook to persist task array state to the browser's window.localStorage API.",
            "date": "2026-07-17",
            "status": "Completed",
            "priority": "High"
        },
        {
            "id": "10",
            "title": "Aptitude Test Prep",
            "description": "Complete practice modules for quantitative and logical reasoning to prepare for upcoming technical interviews.",
            "date": "2026-07-21",
            "status": "Pending",
            "priority": "Medium"
        },
        {
            "id": "11",
            "title": "Draft Deep Learning Abstract",
            "description": "Write the final abstract summarizing the methodology for the Diabetic Retinopathy detection project.",
            "date": "2026-07-14",
            "status": "Completed",
            "priority": "Medium"
        },
        {
            "id": "12",
            "title": "Database Migration",
            "description": "Migrate local development database schema from MySQL to PostgreSQL to match production environment.",
            "date": "2026-07-26",
            "status": "Pending",
            "priority": "High"
        },
        {
            "id": "13",
            "title": "Design Cinematic Portraits",
            "description": "Generate hyper-realistic cinematic portraits using AI for the new digital art collection.",
            "date": "2026-07-23",
            "status": "Pending",
            "priority": "Low"
        },
        {
            "id": "14",
            "title": "Identify Audio Chips",
            "description": "Cross-reference the serial numbers on the control panel components to identify the main audio processing chips.",
            "date": "2026-07-12",
            "status": "Completed",
            "priority": "Low"
        },
        {
            "id": "15",
            "title": "Review Flipkart Seller Policies",
            "description": "Read through the latest updates regarding shipping timelines and commission rates for new sellers.",
            "date": "2026-07-27",
            "status": "Pending",
            "priority": "Medium"
        },
        {
            "id": "16",
            "title": "Fix Mobile CSS Grid",
            "description": "Adjust the media queries on the dashboard component so the summary cards stack correctly on smaller screens.",
            "date": "2026-07-17",
            "status": "Pending",
            "priority": "High"
        },
        {
            "id": "17",
            "title": "Update Professional Resume",
            "description": "Add recent Full Stack training details and the virtual try-on project to the resume.",
            "date": "2026-07-24",
            "status": "Pending",
            "priority": "High"
        },
        {
            "id": "18",
            "title": "Complete Training Assignment",
            "description": "Finish the weekly React routing and context API assignment for the training institute.",
            "date": "2026-07-19",
            "status": "Pending",
            "priority": "High"
        },
        {
            "id": "19",
            "title": "Design Gift Packaging",
            "description": "Sketch out new eco-friendly packaging designs for custom gift orders.",
            "date": "2026-07-29",
            "status": "Pending",
            "priority": "Low"
        },
        {
            "id": "20",
            "title": "Refactor React Components",
            "description": "Clean up the TaskList component by extracting the individual task UI into a separate TaskCard component.",
            "date": "2026-07-13",
            "status": "Completed",
            "priority": "Medium"
        }
    ]

    return initialTasks
}
