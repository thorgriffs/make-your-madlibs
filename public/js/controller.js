$(function () {
    $(".makeLib").click(function () {
        console.log("make lib button clicked");

        $.ajax(`/create/:id`, {
            type: "POST"
        }).then(() => {
            console.log("creating story...");
        });
    });
});