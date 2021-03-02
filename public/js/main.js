window.onload = () => {
const upvoteEvent = (e) => {
    console.log('>>> Target Value',e.target.value);
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

          e.target.innerHTML = 'Like '+response.upvotes

        
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