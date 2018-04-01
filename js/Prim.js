var nov;
var atb;
var a;
var src, dst;
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
            if (j > 0 && j < i) {
                atb[k].readOnly = true;
                atb[k].style.backgroundColor = "orange";
            }
            form.appendChild(atb[k++]);
        }
        var br = document.createElement("br");
        form.appendChild(br);
    }
    form.appendChild(document.createElement("br"));
    btn.innerHTML = "Submit";
    btn.setAttribute("onclick", "prim();return false");
    form.appendChild(btn);
}

function getData() {
    a = new Array(nov);
    for (i = 0; i < nov; i++)
        a[i] = new Array(nov);
    var k = 0;
    for (i = 0; i < nov + 1; i++) {
        for (j = 0; j < nov + 1; j++) {
            if (i != 0 && j != 0) {
                if (i == j)
                    a[i - 1][j - 1] = 0;
                if (j > i)
                    a[i - 1][j - 1] = parseInt(atb[k].value);
                if (j < i)
                    a[i - 1][j - 1] = a[j - 1][i - 1];
            }
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
                if (a[i - 1][j - 1] == 0)
                    cell[c].innerHTML = "";
                else
                    cell[c].innerHTML = a[i - 1][j - 1];
            }
            row[i].appendChild(cell[c++]);
        }
        tbl.appendChild(row[i]);
    }
}

function prim() {
    getData();
    for (i = 0; i < nov; i++) {
        for (j = 0; j < nov; j++) {
            if (a[i][j] == 0)
                a[i][j] = Infinity;
        }
    }
    src = new Array(nov - 1);
    dst = new Array(nov - 1);
    var t = new Array();
    var mst = new Array(nov);
    var k = 0;
    var i = 0, j;
    do {
        t = t.concat(a[i]);
        mst[k] = i;
        do {
            j = t.indexOf(Math.min.apply(null, t));
            t[j] = Infinity;
            i = mst[Math.floor(j / nov)];
            j = j % nov;
        } while (mst.indexOf(j) != -1);
        src[k] = i;
        dst[k++] = j;
        a[i][j] = Infinity;
        a[j][i] = Infinity;
        i = j;
    } while (k < nov - 1);

    btn.innerHTML = "Start";
    btn.setAttribute("onclick", "next();return false");
}

var k = 0, x = 0;
function next() {
    var c = 0;
    for (i = 0; i < nov + 1; i++) {
        for (j = 0; j < nov + 1; j++) {
            if (i != 0 && j != 0) {
                if (x == 0) {
                    if (i == 1)
                        cell[c].setAttribute("bgcolor", "yellow");
                    if (j == 1)
                        cell[c].innerHTML = "";
                }
                if (x % 2 == 0) {
                    if (i - 1 == dst[k - 1])
                        cell[c].setAttribute("bgcolor", "yellow");
                }
                else {
                    if (src[k] == i - 1 && dst[k] == j - 1) {
                        cell[c].setAttribute("bgcolor", "plum");
                    }
                    if (j - 1 == dst[k] && i - 1 != src[k])
                        cell[c].innerHTML = "";
                }
            }
            c++;
        }
    }
    if (x % 2 == 1) {
        k++;
    }
    x++;
    if (k == nov - 1) {
        btn.innerHTML = "Finish";
        btn.setAttribute("onclick", "return true");
    }
    else
        btn.innerHTML = "Next";
}