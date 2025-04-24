var button = document.getElementById("morebutton");

function MoreChildren(){
    document.getElementById("ChildrenList").innerHTML+=' <li class="primary-list-item">Josh Rich</li><li class="primary-list-item">Alex Earl</li><li class="primary-list-item">Mona Saleh</li>';
   button.style = "display: none;"
}

button.onclick= MoreChildren;

