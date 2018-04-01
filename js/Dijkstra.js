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
    btn.innerHTML = "Find";
    btn.setAttribute("onclick", "dijkstra();return false");
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
    for (i = 0; i < nov; i++) {
        for (j = 0; j < nov; j++) {
            if (i != j && a[i][j] == 0)
                a[i][j] = Infinity;
        }
    }

    var tbl = document.getElementById("table1");
    tbl.innerHTML = "";
    var row = new Array();
    cell = new Array();
    var c = 0;
    for (i = 0; i < nov + 1; i++) {
        row[i] = document.createElement("tr");
        for (j = 0; j < nov + 1; j++) {
            cell[c] = document.createElement("td");
            if (i == 0 && j == 0)
                cell[c].innerHTML = "V";
            if (j == 0 && i > 1) {
                cell[c].setAttribute("bgcolor", "pink");
            }
            if (i == 0 && j > 0) {
                cell[c].innerHTML = j - 1;
                cell[c].setAttribute("bgcolor", "pink");
            }
            row[i].appendChild(cell[c++]);
        }
        tbl.appendChild(row[i]);
    }
}

function dijkstra() {
    getData();
    var d = new Array(nov);
    for (j = 0; j < nov; j++) {
        d[j] = a[0][j];
    }
    var v = new Array();
    v.push(0);
    var t = new Array();

    var c = nov + 2;
    for (j = 0; j < nov; j++) {
        if (j == 0){
            cell[c].innerHTML = 0;
        }
        else
            cell[c].innerHTML = "oo";
        c++;
    }
    cell[c].setAttribute("bgcolor", "pink");
    cell[c++].innerHTML = 0;
    for (j = 0; j < nov; j++) {
        if (d[j] == Infinity)
            cell[c].innerHTML = "oo";
        else
            cell[c].innerHTML = d[j];
        if (j == 0)
            cell[c].innerHTML = "";
        c++;
    }

    for (i = 0; i < nov - 2; i++) {
        for (k = 0; k < nov; k++) {
            if (v.indexOf(k) != -1)
                t[k] = Infinity;
            else
                t[k] = d[k];
        }
        var j = t.indexOf(Math.min.apply(null, t));
        v.push(j);
        cell[c - nov + j].setAttribute("bgcolor", "plum");
        cell[c++].innerHTML = j;
        for (k = 0; k < nov; k++) {
            if (v.indexOf(k) == -1) {
                if(d[j] + a[j][k] < d[k])
                    d[k] = d[j] + a[j][k];
                if (d[k] == Infinity)
                    cell[c].innerHTML = "oo";
                else
                    cell[c].innerHTML = d[k];
            }
            c++;
        }
    }
}
