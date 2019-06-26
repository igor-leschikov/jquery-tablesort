$(document).ready(function () {
    $('table>thead>tr th.sortable').parent().parent().parent()
        .each(function (e, i) {
            makeSortable(i);
        });
});
function sortTable(e, table, col, reverse) {
    var tb = table.tBodies[0],
        tr = Array.prototype.slice.call(tb.rows, 0),
        i;
    console.log($(tr));
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
        console.log('a ' + a.cells[col].textContent);
        console.log('b ' + b.cells[col].textContent);
        return reverse
            * (a.cells[col].textContent.trim()
                .localeCompare(b.cells[col].textContent.trim())
            );
    });
    for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]);
}

function FormatDate(date) {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
}


function sortTableMoney(e, table, col, reverse) {
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
    var cur_re = /\D*(\d+|\d.*?\d)(?:\D+(\d{2}))?\D*$/;
    tr = tr.sort(function (a, b) {
        var partsA = cur_re.exec(a.cells[col].textContent.trim());
        var partsB = cur_re.exec(b.cells[col].textContent.trim());
        var a1 = parseFloat(partsA[1].replace(/\D/, '') + '.' + (partsA[2] ? partsA[2] : '00'));
        var b1 = parseFloat(partsB[1].replace(/\D/, '') + '.' + (partsB[2] ? partsB[2] : '00'));
        return reverse
            * (a1-b1
            );
    });
    for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]);
}

function sortTableDate(e, table, col, reverse) {
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
    var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    tr = tr.sort(function (a, b) {
        var a1 = FormatDate(new Date(a.cells[col].textContent.trim().replace(pattern, '$3-$2-$1'))).toString();
        var b1 = FormatDate(new Date(b.cells[col].textContent.trim().replace(pattern, '$3-$2-$1'))).toString();
        return reverse
            * (a1
                .localeCompare(b1)
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
            if (th[i].classList.contains('sortable-date')) {
                th[i].addEventListener('click', function (e) { sortTableDate(e, table, i, (dir = 1 - dir)) });
            }
            else if (th[i].classList.contains('sortable-money')) {
                th[i].addEventListener('click', function (e) { sortTableMoney(e, table, i, (dir = 1 - dir)) });
            }
            else {
                th[i].addEventListener('click', function (e) { sortTable(e, table, i, (dir = 1 - dir)) });
            }
        }
    }(i));
}
