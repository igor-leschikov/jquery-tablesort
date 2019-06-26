$(document).ready(function () {
    $('table>thead>tr th.sortable').parent().parent().parent()
        .each(function (e, i) {
            makeSortable(i);
        });
});
function sortTable(e,table, col, reverse) {
    var tb = table.tBodies[0], 
        tr = Array.prototype.slice.call(tb.rows, 0),
        i;
    var $sortable = $('.sortable');
    $sortable.removeClass('asc').removeClass('desc');
    if (reverse === 1) {
        $(e.target).addClass('desc');
    }
    else {
        $(e.target).addClass('asc');
    }
    reverse = -((+reverse) || -1);
    tr = tr.sort(function (a, b) {
        return reverse
            * (a.cells[col].textContent.trim() 
                .localeCompare(b.cells[col].textContent.trim())
            );
    });
    for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); 
}

function makeSortable(table) {
    var th = table.tHead, i;
    th && (th = th.rows[0]) && (th = th.cells);
    if (th) i = th.length;
    else return;
    while (--i >= 0) (function (i) {
        var dir = 1; 
        if (th[i].classList.contains('sortable')) {
            th[i].addEventListener('click', function (e) { sortTable(e,table, i, (dir = 1 - dir)) });
        }
    }(i));
}
