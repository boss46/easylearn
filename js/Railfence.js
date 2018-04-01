function encrypt()
{
    var tb=document.getElementById("text1");
    var pt=tb.value;
    var len=pt.length;

    var tbl = document.getElementById("table1");
    while (tbl.hasChildNodes())
        tbl.removeChild(tbl.lastChild);
    var row = new Array(4);
    var cell = new Array(4 * len);
    var c = 0;
    for (i = 0; i < 4; i++) {
        row[i] = document.createElement("tr");
        for (j = 0; j < len; j++) {
            cell[c] = document.createElement("td");
            row[i].appendChild(cell[c++]);
        }
        tbl.appendChild(row[i]);
    }

    c = 0;
    for (i = 0; i < len; i++) {
        cell[c].setAttribute("bgcolor", "pink");
        cell[c++].innerHTML = pt.charAt(i);
    }
    for (i = 0; i < len; i++) {
        cell[c++].innerHTML = i;
    }
    for (i = 0; i < len; i = i + 2) {
        cell[c++].innerHTML = i;
    }
    for (i = 1; i < len; i = i + 2) {
        cell[c++].innerHTML = i;
    }
    for (i = 0; i < len; i = i + 2) {
        cell[c].setAttribute("bgcolor", "plum");
        cell[c++].innerHTML = pt.charAt(i);
    }
    for (i = 1; i < len; i = i + 2) {
        cell[c].setAttribute("bgcolor", "plum");
        cell[c++].innerHTML = pt.charAt(i);
    }
}