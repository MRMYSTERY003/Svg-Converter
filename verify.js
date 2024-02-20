
const urlParams = new URLSearchParams(window.location.search);

// Get the value of the 'key' parameter
const keyValue = parseInt(urlParams.get('key'),10);
console.log(keyValue)



// function patch(data){
//     // Create a new XMLHttpRequest object
//     var xhr = new XMLHttpRequest();

//     // Configure the request
//     xhr.open('PUT', 'https://sketchpy-95aa4-default-rtdb.firebaseio.com/keys.json', true);
//     xhr.setRequestHeader('Content-Type', 'application/json'); // Specify the content type if sending JSON data
//     // Add any other headers if needed

//     // Set up a callback function to handle the response
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === XMLHttpRequest.DONE) {
//             if (xhr.status === 200) {
//                 // Request was successful, handle the response
//                 console.log(xhr.responseText);
//             } else {
//                 // Request failed, handle the error
//                 console.error('Request failed:', xhr.status);
//             }
//         }
//     };


//     // Send the request with the data
//     xhr.send(JSON.stringify(data));

// }


// fetch('https://sketchpy-95aa4-default-rtdb.firebaseio.com/.json')
//     .then(function(response) {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);


//         var keysArray = data.keys;
//         console.log(keysArray)
//         if (keysArray.indexOf(keyValue) !== -1) {
//             console.log(`${keyValue} is present in the array.`);
//             const newArray = keysArray.filter(item => item !== keyValue);
//             console.log(newArray)
//             patch(newArray)
//         } else {
//             console.log(`${keyValue} is not present in the array.`);
//             // window.location.href = 'redirect_page.html';
//         }
//     })
//     .catch(function(error) {
//         console.error('There was a problem with the fetch operation:', error);
//     });


var url = "https://server2-fwz3xrurl-mrmystery003.vercel.app//check?val="



fetch(url + keyValue)
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        res = data.success;
        console.log(res)
        if(res != "True"){
            window.location.href = 'redirect_page.html';
        }
    })
    .catch(function(error) {
        console.error('There was a problem with the fetch operation:', error);
    });



