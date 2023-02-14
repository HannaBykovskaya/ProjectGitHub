let $add = document.getElementsByClassName('addNew')[0];
let $form = document.getElementById('group');
let parent = document.getElementById('place');

$add.addEventListener('click', function(event) {
   let inp = $form.cloneNode(true);
   parent.appendChild(inp);
});
