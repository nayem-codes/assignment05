document.getElementById("sign-in-btn").addEventListener("click", function() {
    // 1. Get the username and password values 
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log("Username:", username);
    console.log("Password:", password);

    // 2. Validate the credentials (for demonstration, we use hardcoded values)
    if (username === "admin" && password === "admin123") {
        alert("Login successful!");
        // Redirect to the issues page or dashboard
        window.location.assign("/home.html"); // Change this to your actual issues page
    } else {
        alert("Invalid username or password. Please try again.");
    }
});