document.getElementById("sign-in-btn").addEventListener("click", function() {
    // 1. Get the username and password values 
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log("Username:", username);
    console.log("Password:", password);

    // 2. Validate the inputs
    if (username === "admin" && password === "admin123") {
        alert("Login successful!");
        // Redirect to the home page
        window.location.assign("/home.html");
    } else {
        alert("Invalid username or password. Please try again.");
    }
});