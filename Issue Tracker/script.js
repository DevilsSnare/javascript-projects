document.getElementById('inputForm').addEventListener('submit', saveIssue);
function closeIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for(var i = 0; i < issues.length; i++) {
        if(issues[i].id == id) {
            issues[i].status = "Closed";
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    getIssue();
}
function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for(var i = 0; i < issues.length; i++) {
        if(issues[i].id == id) {
            issues.splice(i, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    getIssue();
}
function getIssue() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var listIssues = document.getElementById('listIssues');
    listIssues.innerHTML = '';
    for(var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var description = issues[i].description;
        var severity = issues[i].severity;
        var assigned = issues[i].assigned;
        var status = issues[i].status;

        listIssues.innerHTML += '<table class="alignG">' +
                                '<tr>' +
                                '<th>Issue ID: </th>' + '<td>' + id + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<th>Description: </th>' + '<td>' + description + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<th>Severity: </th>' + '<td>' + severity + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<th>Assigned To: </th>' + '<td>' + assigned + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<th>Status: </th>' + '<td>' + status + '</td>' +
                                '</tr>' +
                                '</table>' +
                                '<button onclick="closeIssue(\''+id+'\')">Close</button>' +
                                '<button onclick="deleteIssue(\''+id+'\')">Delete</button>' + '<br><br>'
    }
}
function saveIssue() {
    var issueId = chance.guid();
    var issueDescription = document.getElementById('fetchDes').value;
    var issueSeverity = document.getElementById('fetchImp').value;
    var issueAssigned = document.getElementById('fetchAss').value;
    var issueStatus = 'Open';

    var issue = {
        id: issueId,
        description: issueDescription,
        severity: issueSeverity,
        assigned: issueAssigned,
        status: issueStatus
    }

    if (localStorage.getItem('issues') === null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    
    document.getElementById('inputForm').reset();

    getIssue();
}