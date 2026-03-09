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


    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`)
        .then(res => res.json())
        .then(data => {

            let issues = data.data;

            if (id === "open-btn") {
                issues = issues.filter(issue => issue.status === "open");
            }
            else if (id === "closed-btn") {
                issues = issues.filter(issue => issue.status === "closed");
            }

            document.getElementById("count").textContent = issues.length;
            console.log(issues);
            displayIssues(issues);
        });
}

toggleStyle("all-btn")

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
            <div onclick="loadIssuesDetail(${issue.id})"  class="card-body border-t-4 rounded-lg ${issue.status === "open" ? "border-green-500" : "border-violet-500"}">


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




// showing modal

const loadIssuesDetail = async (id) => {
    url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    console.log(url);
    const res = await fetch(url)
    const details = await res.json();
    displayIssueDetail(details.data)
}

const displayIssueDetail = (issue) => {
    console.log(issue)
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    <h3 class="font-bold text-2xl">${issue.title}</h3>

                <div class="flex gap-2 mt-2">
                    <p class="badge ${issue.status === "open" ? "badge-success" : "badge-primary bg-violet-500"}">${issue.status}</p>
                    <p class="text-gray-600">| Opened by ${issue.author}</p>
                    <p class="text-gray-600">| ${new Date(issue.updatedAt).toLocaleDateString("en-US")}</p>
                </div>

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

                <p class="text-gray-600 mt-5">${issue.description}</p>

                <div class="mt-5 bg-base-200 p-2 rounded-lg shadow-sm flex justify-around">
                    <div>
                        <p class="text-gray-600">Assignee:</p>
                        <p class="font-bold">${issue.assignee}</p>
                    </div>

                    <div>
                        <p class="text-gray-600">Priority:</p>
                        <p class=" h-7 p-2 flex items-center justify-center rounded-lg ${issue.priority === "high" ? "bg-red-100 text-red-600" : issue.priority === "medium" ? "bg-yellow-100 text-yellow-600" :  "bg-gray-300 text-gray-600"}">${issue.priority.toUpperCase()}</p>
                    </div>
                    
    `



    document.getElementById("my_modal_5").showModal();
}

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", function () {

    const searchText = searchInput.value.trim();

    // if input is empty load all issues
    if (searchText === "") {
        loadIssues();
        return;
    }

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
        .then(res => res.json())
        .then(data => {

            const issues = data.data;

            // update issue count
            document.getElementById("count").textContent = issues.length;

            // display results
            displayIssues(issues);
        });
});

loadIssues();