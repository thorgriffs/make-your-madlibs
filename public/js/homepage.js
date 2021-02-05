$('.generate').click(function(){
    $(".hidediv").hide();
    $(".creatediv").append(`<div class="row" style="padding-top: 2%;">
    <div class="col-2"></div>
    <div class="col-10">
        <div class="card" style="width: 75%;">
            <div class="card-body">
              <h5 class="card-title">Story Title</h5>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi, soluta <span>NOUN</span> eius asperiores distinctio facere? Unde <span>ADJECTIVE</span>, rem natus necessitatibus quis maxime voluptatem recusandae ipsa eius harum omnis iure possimus! Lorem ipsum,  amet consectetur adipisicing elit. Omnis distinctio ullam cumque rem explicabo! Perspiciatis, ea nostrum et praesentium <span>NOUN(PLURAL)</span> ad. Accusantium autem culpa quae rerum optio, est earum quis! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere porro saepe dolorem labore, quaerat fugiat repellendus tempora deserunt? Rerum facilis dolore quam temporibus <span>VERB</span> corporis officia tenetur ut architecto ab.</p>
                <a href="#" ><button class="btn btn-primary">Save</button></a>
                <a href="/" ><button class="btn btn-primary">Retry</button></a>
            </div>
          </div>
    </div>
</div>`)
});