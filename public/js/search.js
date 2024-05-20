document.querySelector('#searchInput').addEventListener('keyup', fuzzySearch);

function fuzzySearch(){
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toLowerCase();
    ul = document.getElementById('pokemon-list');
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++){
        a = li[i].getElementsByTagName('a')[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1){
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}