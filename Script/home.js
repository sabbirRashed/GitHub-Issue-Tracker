
const imageMaker = (status) => {
    if (status.toLowerCase() === "open") {
        const openIcon = `<img src= "./assets/Open-Status.png">`;
        return openIcon;
    }
    else {
        const closedIcon = `<img src="./assets/Closed-Status.png" alt="">`;
        return closedIcon;
    }
}

const createElement = (arr) => {
    const htmlElement = arr.map(el => {
        return `<span class="px-3 py-1 ${el.toLowerCase() === "bug" ? "bg-red-100 text-red-500"
            : el.toLowerCase() === "help wanted" ? "bg-amber-100 text-amber-500"
                : el.toLowerCase() === "enhancement" ? "bg-green-100 text-green-500"
                    : el.toLowerCase() === "documentation" ? "bg-blue-100 text-blue-500"
                        : el.toLowerCase() === "good first issue" ? "bg-purple-100 text-purple-500"
                            : ""}  font-medium rounded-3xl">
        <i class="${el.toLowerCase() === "bug" ? "fa-solid fa-bug"
                : el.toLowerCase() === "help wanted" ? "fa-solid fa-life-ring"
                    : el.toLowerCase() === "enhancement" ? "fa-solid fa-wand-magic-sparkles"
                        : el.toLowerCase() === "documentation" ? "fa-solid fa-book"
                            : el.toLowerCase() === "good first issue" ? "fa-solid fa-star"
                                : ""
            } mr-1 text-sm"></i>${el}</span>`
    })
    return (htmlElement.join(" "));
}

const activeRemover = () => {
    const tabBtn = document.querySelectorAll(".active");
    tabBtn.forEach(item => {
        item.classList.remove("active");
    });

}

const manageSpinner = (status) => {
    if (status === true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("issue-container").classList.add("hidden");
    } else {
        document.getElementById("issue-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const loadAllIssues = (id = "all-tab") => {
    manageSpinner(true);
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
        .then((res) => res.json()
            .then((data) => {

                activeRemover();
                document.getElementById(id).classList.add("active");
                displayIssues(data.data);
            })

        )
}

const loadIssueInfo = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    fetch(url)
        .then(res => res.json()
            .then(data => displayIssueInfo(data.data))
        )
}

const loadSearchIssue = (search) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${search}`;

    fetch(url)
        .then(res => res.json()
            .then(data => {
                console.log(data.data)
                displaySearchIssues(data.data)
            })

        )

}


const displaySearchIssues = (data) => {

    const issueCount = document.getElementById("issue-count");
    const issueContainer = document.getElementById("issue-container");
    issueContainer.innerHTML = "";

    data.forEach(item => {

        const div = document.createElement("div");
        div.innerHTML = `
                <div onclick="loadIssueInfo(${item.id})" class="card bg-white rounded-lg shadow-md h-full ${item.status.toLowerCase() === "open" ? "border border-green-200 border-t-4 border-t-green-500" : "border border-purple-200 border-t-4 border-t-purple-500"}">
                    <div class="p-5">
                        <div class="flex justify-between items-center">
                            ${imageMaker(item.status)}
                            <p class="text-sm font-semibold ${item.priority.toLowerCase() === "high" ? "text-red-500 bg-red-100" : item.priority.toLowerCase() === "medium" ? "text-amber-500 bg-amber-100" : item.priority.toLowerCase() === "low" ? "text-gray-500 bg-gray-100" : ""} px-6 py-1 rounded-2xl">${item.priority.toUpperCase()}</p>
                        </div>
                        <h2 class="font-semibold text-[#1F2937] mt-3">${item.title}</h2>
                        <p class="text-sm text-[#64748B] mt-2">${item.description}</p>
                        <div class="mt-3.5 flex flex-wrap gap-1">
                            ${createElement(item.labels)}
                        </div>
                    </div>
                    <div class=" border-t border-gray-200">
                        <div class=" p-5 text-sm text-[#64748B] space-y-1">
                            <div class="flex justify-between items-center">
                                <h3>#${item.id} by ${item.author}</h3>
                                <p>${new Date(item.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div class="flex justify-between items-center">
                                <h3>Assigne: ${item.assignee ? item.assignee : "Unassigned"}</h3> 
                                <p class="text-right">Update: ${new Date(item.updatedAt).toLocaleDateString()}</p>
                            </div>                         
                        </div>
                    </div>
                </div>

                `

        issueContainer.appendChild(div);

    })
    issueCount.innerText = issueContainer.children.length;
    manageSpinner(false);

}


const displayIssueInfo = (info) => {

    const infoContainer = document.getElementById("info-container");
    infoContainer.innerHTML = `
                <div class="space-y-2">
                    <h2 class="text-2xl font-bold text-[#1F2937]">${info.title}</h2>
                    <ul class="flex items-center gap-7 text-sm text-[#64748B]">
                        <li class="px-5 py-1 text-white ${info.status === "open" ? "bg-green-500" : "bg-purple-500"} rounded-2xl text-white">${info.status === "open" ? "opened" : "closed"}</li>
                        <li class="list-disc">${info.status === "open" ? "opened" : "closed"} by ${info.assignee ? info.assignee : "Unknown"}</li>
                        <li class="list-disc">${new Date(info.updatedAt).toLocaleDateString()}</li>
                    </ul>
                </div>

                <div class="">
                    ${createElement(info.labels)}
                </div>

                <p class="text-[#64748B]">${info.description}</p>

                <div class="grid grid-cols-2 p-5 bg-base-200 rounded-lg">
                    <div>
                        <p class="text-[#64748B]">Assigne:</p>
                        <p class="text-[#1F2937] font-semibold">${info.assignee ? info.assignee : "Unassigned"}</p>
                    </div>
                    <div>
                        <p class="text-[#64748B]">Priority:</p>
                        <span class="text-sm text-white font-semibol ${info.priority === "high" ? "bg-red-400"
            : info.priority === "medium" ? "bg-amber-400"
                : info.priority === "low" ? "bg-gray-400"
                    : ""} px-6 py-1 rounded-2xl">${info.priority.toUpperCase()}</span>
                    </div>
                </div>
    
    `
    document.getElementById("info_modal").showModal();

}


const displayIssues = (data) => {

    const searcField = document.getElementById("search-input");
    const issueCount = document.getElementById("issue-count");
    const issueContainer = document.getElementById("issue-container");

    searcField.value = "";
    issueContainer.innerHTML = "";

    data.forEach(item => {

        const div = document.createElement("div");
        div.innerHTML = `
                <div onclick="loadIssueInfo(${item.id})" class="card bg-white rounded-lg shadow-md h-full ${item.status.toLowerCase() === "open" ? "border border-green-200 border-t-4 border-t-green-500" : "border border-purple-200 border-t-4 border-t-purple-500"}">
                    <div class="p-5">
                        <div class="flex justify-between items-center">
                            ${imageMaker(item.status)}
                            <p class="text-sm font-semibold ${item.priority.toLowerCase() === "high" ? "text-red-500 bg-red-100" : item.priority.toLowerCase() === "medium" ? "text-amber-500 bg-amber-100" : item.priority.toLowerCase() === "low" ? "text-gray-500 bg-gray-100" : ""} px-6 py-1 rounded-2xl">${item.priority.toUpperCase()}</p>
                        </div>
                        <h2 class="font-semibold text-[#1F2937] mt-3">${item.title}</h2>
                        <p class="text-sm text-[#64748B] mt-2">${item.description}</p>
                        <div class="mt-3.5 flex flex-wrap gap-1">
                            ${createElement(item.labels)}
                        </div>
                    </div>
                    <div class=" border-t border-gray-200">
                        <div class=" p-5 text-sm text-[#64748B] space-y-1">
                            <div class="flex justify-between items-center">
                                <h3>#${item.id} by ${item.author}</h3>
                                <p>${new Date(item.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div class="flex justify-between items-center">
                                <h3>Assigne: ${item.assignee ? item.assignee : "Unassigned"}</h3> 
                                <p class="text-right">Update: ${new Date(item.updatedAt).toLocaleDateString()}</p>
                            </div>                         
                        </div>
                    </div>
                </div>

                `

        const activeTab = document.querySelector(".active").id;

        if (activeTab === "all-tab") {
            issueContainer.appendChild(div);
        }
        else if (activeTab === "open-tab" && item.status.toLowerCase() === "open") {
            issueContainer.appendChild(div);
        }
        else if (activeTab === "closed-tab" && item.status.toLowerCase() === "closed") {
            issueContainer.appendChild(div);
        }
    })
    issueCount.innerText = issueContainer.children.length;
    manageSpinner(false);

}

document.getElementById("search-btn")
    .addEventListener("click", (event) => {
        event.preventDefault();

        const searchValue = document.getElementById("search-input").value;
        if(searchValue === ""){
            return;
        }
        activeRemover();
        loadSearchIssue(searchValue);
    })

loadAllIssues()