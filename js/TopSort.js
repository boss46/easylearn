var nov;
var atb;
var a;
var cell;

function create() {
    var tb = document.getElementById("text1");
    nov = parseInt(tb.value);
    var form = document.getElementById("form1");
    var lbl = document.getElementById("label1");
    form.removeChild(lbl);
    form.removeChild(tb);
    btn = document.getElementById("button1");
    form.removeChild(btn);
    form.appendChild(document.createElement("br"));

    atb = new Array();
    var k = 0;
    for (i = 0; i < nov + 1; i++) {
        for (j = 0; j < nov + 1; j++) {
            atb[k] = document.createElement("input");
            atb[k].type = "text";
            atb[k].size = "1";
            if (i == j) {
                atb[k].value = 0;
                atb[k].readOnly = true;
                if (i == 0)
                    atb[k].value = "";
            }
            if (j == 0 && i > 0) {
                atb[k].value = i - 1;
                atb[k].readOnly = true;
                atb[k].style.backgroundColor = "yellow";
            }
            if (i == 0 && j > 0) {
                atb[k].value = j - 1;
                atb[k].readOnly = true;
                atb[k].style.backgroundColor = "yellow";
            }
            form.appendChild(atb[k++]);
        }
        var br = document.createElement("br");
        form.appendChild(br);
    }
    form.appendChild(document.createElement("br"));
    btn.innerHTML = "Sort";
    btn.setAttribute("onclick", "sort();return false");
    form.appendChild(btn);
}

function getData() {
    a = new Array(nov);
    for (i = 0; i < nov; i++)
        a[i] = new Array(nov);
    var k = 0;
    for (i = 0; i < nov + 1; i++) {
        for (j = 0; j < nov + 1; j++) {
            if (i != 0 && j != 0)
                a[i - 1][j - 1] = parseInt(atb[k].value);
            k++;
        }
    }
    var tbl = document.getElementById("table1");
    while (tbl.hasChildNodes())
        tbl.removeChild(tbl.lastChild);
    var row = new Array();
    cell = new Array();
    row[0] = document.createElement("tr");
    cell[0] = document.createElement("td");
    cell[0].innerHTML = "V";
    row[0].appendChild(cell[0]);
    cell[1] = document.createElement("td");
    cell[1].colSpan = nov - 1;
    cell[1].align = "center";
    cell[1].innerHTML = "Queue";
    row[0].appendChild(cell[1]);
    tbl.appendChild(row[0]);
    var c = nov;
    for (i = 0; i < nov + 1; i++) {
        row[i] = document.createElement("tr");
        for (j = 0; j < nov; j++) {
            cell[c] = document.createElement("td");
            if (j == 0 && i > 0) {
                cell[c].innerHTML = i - 1;
                cell[c].setAttribute("bgcolor", "plum");
            }
            row[i].appendChild(cell[c++]);
        }
        tbl.appendChild(row[i]);
    }
}

function sort() {
    getData();
    var ind = new Array(nov);
    for (i = 0; i < nov; i++)
        ind[i] = 0;
    for (i = 0; i < nov; i++) {
        for (j = 0; j < nov; j++) {
            if (a[i][j] != 0)
                ind[j]++;
        }
    }
    var v = new Array();
    var q = new Array();
    for (i = 0; i < nov; i++) {
        if (ind[i] == 0)
            q.push(i);
    }
    v.push(q[0]);
    var i, k = 1;
    var c = nov+1;
    do {
        for (j = 0; j < nov - 1; j++) {
            if (q[j] != undefined) {
                cell[c].innerHTML = q[j];
                cell[c].setAttribute("bgcolor", "pink");
            }
            c++;
        }
        i = q.shift();
        cell[c++].innerHTML = i;
        for (j = 0; j < nov; j++) {
            if (a[i][j] != 0) {
                ind[j]--;
                if (ind[j] == 0)
                    q.push(j);
                v[k++] = j;
            }
            else {

            }
        }
    } while (q.length != 0);
}