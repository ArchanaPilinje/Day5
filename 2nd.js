var posts = [];
var todo = [];
var album = [];
var users = [];
var comments=[];
var userid;

function select(id) {
    document.getElementById('abt').innerHTML=""
    document.getElementById('list').innerHTML=""
    document.getElementById('area').innerHTML=""
  
    userid = id

    gettodo()
    getalbum()
    getpost()
}

function getuser() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then((data) => {
            users = data
            // document.getElementById('spinner').innerHTML = ""
            mapUser()
        })
}
function mapUser() {
    var u = ""
    for (let i = 0; i < users.length; i++) {
        u += "<a href='#' class='list-group-item list-group-item-action' onclick='select(" + users[i].id + ")'>" + users[i].name + "</a>"
    }
    document.getElementById('userarea').innerHTML = u
}

function getpost() {
   
    
    fetch('https://jsonplaceholder.typicode.com/users/' + userid + '/posts')
        .then(response => response.json())
        .then((data) => {
            posts = data
            mapPosts()
        })
    
}


function mapPosts() {
    var p = ""
    for (let i = 0; i < posts.length; i++) {
        p += "<div class='card my-2'>"
            + "<div class='card-body'>"
            + "<h5 class='card-title-top text-primary'>" + posts[i].title + "</h5>"
            + "<p class='card-text'>" + posts[i].body + "</p>"
            +"<button class='btn btn-primary'  onclick='getComments(" + posts[i].id + ") '>View Comments</button>"
            +"<div id='" + posts[i].id +"'></div>"
            + "</div>"
            + "</div>"
    }
    document.getElementById('area').innerHTML = p
}


function gettodo() {
    fetch('https://jsonplaceholder.typicode.com/users/' + userid + '/todos')
        .then(response => response.json())
        .then((data) => {
            todo = data
            maptodo()
        })
}
function maptodo() {
    var t = ""
    for (let i = 0; i < todo.length; i++) {
        t += "<li class='list-group-item d-flex justify-content-between align-items-center'>"
            + todo[i].title
            + "<span >" + ((todo[i].completed) ? "<span class='material-icons text-success' >assignment_turned_in</span>" : "<span class='material-icons text-warning'>assignment_late</span>")
            + "</span>"
            + " </li>"
    }
    document.getElementById('list').innerHTML = t
}



function getalbum() {
    fetch('https://jsonplaceholder.typicode.com/users/' + userid + '/albums')
        .then(response => response.json())
        .then((data) => {
            album = data
            mapalbum()
        })
}
function mapalbum() {
    var a = ""
    for (let i = 0; i < album.length; i++) {
        a += "<div class='card my-2'>"
            + "<img src='placeholder.jpg' alt='' class='card-img-top'>"
            + "<div class='card-body'>"
            + "<h5 class='card-title text-warning'>" + album[i].title + "</h5>"
            + " </div>"
            + "</div>"
    }
    document.getElementById('abt').innerHTML = "<div class='card-columns'>" + a + "</div>"
}




function getComments(id){
    fetch('https://jsonplaceholder.typicode.com/posts/' + id + '/comments')
    .then(response => response.json())
    .then(data => {
        comments = data
        mapComments(id)
    })
}

function mapComments(id){
    var listComments=""
    for(let i=0;i<comments.length;i++){
        listComments+="<li class='list-group-item'>"+
                       "<div class='row'>"+
                       "<div class='col-sm-5 text-danger'>"+comments[i].email+"</div>"+
                       "<div class='col-sm px-2 text-justify'>"+comments[i].body+"</div>"+
                       "</div>"+
                        "</li>"
    }

    document.getElementById(id).innerHTML="<ul class='list-group'>"+listComments+"</ul>"
}




function readMe(){

    
    var online=""
    online+="<div class='alert alert-success' role='alert'>"+
    "<h4 class='alert-heading'>Instruction</h4>"+
    "<p>Please first use the sidebar to select the user</p>"+
    "<hr>"+
    "<p class='mb-0'>Then use the navigation bar to navigate all the posts,to-dos and albums of that user</p>"+
  "</div>"
  document.getElementById('abt').innerHTML=online
  document.getElementById('list').innerHTML=online
  document.getElementById('area').innerHTML=online
  
}