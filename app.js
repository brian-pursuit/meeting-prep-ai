document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('process-button');
    const resultsDiv = document.getElementById('results');
    const meetingInput = document.getElementById('meeting-input');


    button.addEventListener('click', function() {
        const meetingDetails = meetingInput.value;

        resultsDiv.innerHTML = '<p>Processing your meeting details...</p>'; // Temporary message
        fetch('/api/analyze', {
            method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({ meeting_details: meetingDetails })
       })
        })
        .then(response => response.json())
        .then(data => {
            // Display the results
            resultsDiv.innerHTML = ''; // Clear the temporary message

            if (data.topics) {
                resultsDiv.innerHTML += '<h2>Topics</h2><ul>';
                data.topics.forEach(topic => resultsDiv.innerHTML += `<li>${topic}</li>`);
                resultsDiv.innerHTML += '</ul>';
            }

            if (data.questions) {
                resultsDiv.innerHTML += '<h2>Questions</h2><ul>';
                data.questions.forEach(question => resultsDiv.innerHTML += `<li>${question}</li>`);
                resultsDiv.innerHTML += '</ul>';
            }

            if (data.research_links) {
                resultsDiv.innerHTML += '<h2>Research Links</h2><ul>';
                data.research_links.forEach(link => resultsDiv.innerHTML += `<li><a href="${link}" target="_blank">${link}</a></li>`);
                resultsDiv.innerHTML += '</ul>';
            }


            // Add similar blocks for other results...

        })
        .catch(error => {
            console.error('Error:', error);
            resultsDiv.innerHTML = '<p>An error occurred during analysis.</p>';
        });
    });
});
