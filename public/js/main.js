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
    ).then(response => response.json()).then((json) => {
        console.log(json);
    });
}

[].slice.call(document.querySelectorAll('.upvote-button')).forEach((button) => {
    button.addEventListener('click', upvoteEvent);
});

}