var nov;
var atb;
var a;
var btn;
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
    btn.innerHTML = "Submit";
    btn.setAttribute("onclick", "warshall();return false");
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
    var row = new Array();
    cell = new Array();
    var c = 0;
    for (i = 0; i < nov + 1; i++) {
        row[i] = document.createElement("tr");
        for (j = 0; j < nov + 1; j++) {
            cell[c] = document.createElement("td");
            if (i == 0 && j == 0)
                cell[c].innerHTML = "V";
            if (j == 0 && i > 0) {
                cell[c].innerHTML = i - 1;
                cell[c].setAttribute("bgcolor", "pink");
            }
            if (i == 0 && j > 0) {
                cell[c].innerHTML = j - 1;
                cell[c].setAttribute("bgcolor", "pink");
            }
            if (i != 0 && j != 0) {
                cell[c].innerHTML = a[i - 1][j - 1];
            }
            row[i].appendChild(cell[c++]);
        }
        tbl.appendChild(row[i]);
    }
}

function warshall() {
    getData();
    for (i = 0; i < nov; i++) {
        for (j = 0; j < nov; j++) {
            if (i != j && a[i][j] == 0)
                a[i][j] = Infinity;
        }
    }
    btn.innerHTML = "Start";
    btn.setAttribute("onclick", "next();return false");
}

var k = 0;
function next() {
    for (i = 0; i < nov; i++) {
        for (j = 0; j < nov; j++) {
            if (a[i][k] + a[k][j] < a[i][j]) {
                a[i][j] = a[i][k] + a[k][j];
                show(i, j, k);
            }
        }
    }
    k++;
    if (k == nov) {
        btn.innerHTML = "Finish";
        btn.setAttribute("onclick", "return true");
    }
    else
        btn.innerHTML = "Next";
}
function show(p,q,r) {
    var c = 0;
    for (i = 0; i < nov + 1; i++) {
        for (j = 0; j < nov + 1; j++) {
            if (i != 0 && j != 0) {
                if (i - 1 == r || j - 1 == r)
                    cell[c].setAttribute("bgcolor", "yellow");
                else
                    cell[c].setAttribute("bgcolor", "white");
                if (i - 1 == p && j - 1 == q) {
                    cell[c].innerHTML = a[p][q];
                    cell[c].setAttribute("bgcolor", "plum");
                }
            }
            c++;
        }
    }
}
