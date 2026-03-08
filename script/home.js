const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
// let currentStatus = "all";

function toggleStyle(id) {
    allBtn.classList.remove("btn-primary");
    openBtn.classList.remove("btn-primary");
    closedBtn.classList.remove("btn-primary");

    const selectedBtn = document.getElementById(id);
    selectedBtn.classList.add("btn-primary");

    // currentStatus = id;

    if (id === "open-btn") {
        fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues?status="open"`)
            .then(response => response.json())
            .then(data => {
                console.log("Open issues:", data.data.status);
                displayIssues(data.data);
            });
    } else if (id === "closed-btn") {
        fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues?status="closed"`)
            .then(response => response.json())
            .then(data => {
                console.log("Closed issues:", data.data);
                displayIssues(data.data);
            });
    }
    else {
        loadIssues();
    }
}

const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(response => response.json())
        .then(data => displayIssues(data.data))
}

const displayIssues = (issues) => {
    
    // Get the container 
    const issueContainer = document.getElementById("issues-container");
    issueContainer.innerHTML = "";

    // Loop through the issues and get each issue
    issues.forEach(issue => {

        // create HTML elements for each

        const issueElement = document.createElement("div");
        issueElement.classList.add("card", "bg-base-200", "shadow");
        issueElement.innerHTML = `
            <div class="card-body">
                <div class="flex justify-between items-center mb-2">
                    
                    <div class="w-3 h-3 rounded-full ${issue.status === "open" ? "bg-green-500" : "bg-violet-500"}"></div>

                    <div class="w-20 p-2 flex items-center justify-center rounded-full ${issue.priority === "high" ? "bg-red-100 text-red-600" : issue.priority === "medium" ? "bg-yellow-100 text-yellow-600" : "bg-gray-300 text-gray-600"}">${issue.priority.toUpperCase()}</div>
                    
                </div>
                <h2 class="card-title">${issue.title}</h2>
                <p>${issue.description}</p>
                <div class="flex gap-2 mt-4">
                
         
                    ${issue.labels && issue.labels.length > 0 ? issue.labels.map(label => {
            if (label === "bug") {
                return '<div class="badge badge-error"><i class="fa-solid fa-bug"></i> Bug</div>';
            } else if (label === "help wanted") {
                return '<div class="badge badge-warning"><i class="fa-solid fa-life-ring"></i> HELP WANTED</div>';
            } else if (label === "enhancement") {
                return '<div class="badge badge-success"><i class="fa-solid fa-wand-magic-sparkles"></i>Enhancement</div>';
            } else {
                return '';
            }
        }).join('') : ''}
                   

            </div>
                <hr>
                <p class="text-sm text-gray-500">Author: ${issue.author}</p>
                <p class="text-sm text-gray-500">Created: ${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
            </div>
        `;
        issueContainer.appendChild(issueElement);
    });
}


    // counting the number of issues in each status and showing the count of the selected status
    const countIssues = (issues, status) => {   
    const countElement = document.getElementById("count");
    if (status === "all") {
        countElement.innerText = issues.length;
    } else if (status === "open") {
        const openIssues = issues.filter(issue => issue.status === "open");
        countElement.innerText = openIssues.length;
    } else if (status === "closed") {
        const closedIssues = issues.filter(issue => issue.status === "closed");
        countElement.innerText = closedIssues.length;
    }   
}

// showing modal
const issueContainer = document.getElementById("issues-container");

issueContainer.addEventListener('click', function(event){
    const parentNode = event.target.closest('.card-body');
    my_modal_5.showModal();
    loadIssuesDetail();
})

const loadIssuesDetail = (id) => {
    url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    console.log(url)

}

loadIssues();