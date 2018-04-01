function create() {
    var tb = document.getElementById("text1");
    var alpha = tb.value;
    var beta = new Array();
    var c = 0;
    for (i = 0; i < alpha.length; i++) {
        if (!includes(beta, alpha.charAt(i)))
            beta[c++] = alpha.charAt(i);
    }
    var len = beta.length;

    var f = new Array(len);
    for (i = 0; i < len; i++)
        f[i] = 0;
    for (i = 0; i < len; i++) {
        for (j = 0; j < alpha.length; j++) {
            if (beta[i] == alpha.charAt(j))
                f[i]++;
        }
    }
    for (i = 1; i < len; i++) {
        var t1 = f[i];
        var t2 = beta[i];
        var j = i;
        while (j > 0 && t1 < f[j - 1]) {
            f[j] = f[j - 1];
            beta[j] = beta[j - 1];
            j--;
        }
        f[j] = t1;
        beta[j] = t2;
    }

    var row = new Array();
    var cell = new Array();
    var tbl1 = document.getElementById("table1");
    while(tbl1.hasChildNodes())
	    tbl1.removeChild(tbl1.lastChild);
    c = 0;
    var k = 0;
    row[0] = document.createElement("tr");
    for (j = 0; j < len + 1; j++) {
        cell[c] = document.createElement("td");
        if (c == 0)
            cell[c].innerHTML = "Character";
        else
            cell[c].innerHTML = beta[k++];
        row[0].appendChild(cell[c++]);
    }
    tbl1.appendChild(row[0]);
    row[1] = document.createElement("tr");
    k = 0;
    for (j = 0; j < len + 1; j++) {
        cell[c] = document.createElement("td");
        if (c == len + 1)
            cell[c].innerHTML = "Frequency";
        else
            cell[c].innerHTML = f[k++];
        row[1].appendChild(cell[c++]);
    }
    tbl1.appendChild(row[1]);

    var sum = new Array(len - 1);
    var left = new Array(len - 1);
    var right = new Array(len - 1);
    var t = f.slice();
    for (i = 0; i < len - 1; i++) {
        left[i] = t[0];
        right[i] = t[1];
        sum[i] = left[i] + right[i];
        t.shift();
        t[0] = sum[i];
        for (k = 1; k < t.length; k++) {
            var temp = t[k];
            var j = k;
            while (j > 0 && temp < t[j - 1]) {
                t[j] = t[j - 1];
                j--;
            }
            t[j] = temp;
        }
    }

    var tbl2 = document.getElementById("table2");
    while(tbl2.hasChildNodes())
	    tbl2.removeChild(tbl2.lastChild);
    c = 0;
    k = 0;
    row[2] = document.createElement("tr");
    for (j = 0; j < 3 * (len - 1) ; j++) {
        cell[c] = document.createElement("td");
        if (j % 3 == 1) {
            cell[c].setAttribute("bgcolor", "plum");
            cell[c].innerHTML = sum[k++];
        }
        row[2].appendChild(cell[c++]);
    }
    tbl2.appendChild(row[2]);
    var p = 0, q = 0;
    row[3] = document.createElement("tr");
    for (j = 0; j < 3 * (len - 1) ; j++) {
        cell[c] = document.createElement("td");
        if (j % 3 == 0){
            cell[c].setAttribute("bgcolor","pink");
            cell[c].innerHTML = left[p++];
        }
        if (j % 3 == 2){
            cell[c].setAttribute("bgcolor","pink");
            cell[c].innerHTML = right[q++];
        }
        row[3].appendChild(cell[c++]);
    }
    tbl2.appendChild(row[3]);
}

function includes(container, value) {
    var pos = container.indexOf(value);
    if (pos >= 0)
        return true;
    return false;
}