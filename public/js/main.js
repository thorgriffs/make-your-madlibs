window.onload = () => {
const upvoteEvent = (e) => {
    console.log(e.target.value);
    fetch(
        '/upvote',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: e.target.value})
        }
    ).then((response) => response.json())
    .then(response => {
        if (response.error) {
          //  const err = response.json();
            alert(JSON.stringify(response.error));
       } else {
          console.log(response);
          // get the updated upvotes count - response.upvotes
          // Make the text for the button - "Like " + new upvotes
          // e.target.text = new text 
         } 
    })
    .catch(err => {
        alert(err);
    });
}

[].slice.call(document.querySelectorAll('.upvote-button')).forEach((button) => {
    button.addEventListener('click', upvoteEvent);
});

}