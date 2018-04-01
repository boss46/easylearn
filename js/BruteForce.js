function find(){
    var tb1 = document.getElementById("text1");
    var str = tb1.value;
    str = str.toUpperCase();
    var tb2 = document.getElementById("text2");
    var pat = tb2.value;
    pat = pat.toUpperCase();
    var m = str.length;
    var n = pat.length;
    
    var tbl = document.getElementById("table1");
    while(tbl.hasChildNodes())
	    tbl.removeChild(tbl.lastChild);
    var row = new Array();
    var cell = new Array();

    row[0] = document.createElement("tr");
    var c = 0;
    for (i = 0; i < m; i++) {
        cell[c] = document.createElement("td");
        cell[c].innerHTML = str.charAt(i);
        row[0].appendChild(cell[c++]);
    }
    tbl.appendChild(row[0]);

    for (i = 0; i <= m-n; i++) {
	    row[i+1]=document.createElement("tr");
	    for (k = 0; k < m; k++) {
	        cell[c] = document.createElement("td");
	        row[i + 1].appendChild(cell[c++]);
	    }
	    tbl.appendChild(row[i + 1]);
	    var c1 = c - m;
	    for (j = 0; j < n; j++) {
	        if (str.charAt(i + j) == pat.charAt(j)) {
	            cell[c1 + i + j].innerHTML = pat.charAt(j);
	            cell[c1 + i + j].setAttribute("bgcolor", "pink");
	        }
	        else {
	            cell[c1 + i + j].innerHTML = pat.charAt(j);
	            cell[c1 + i + j].setAttribute("bgcolor", "orange");
	            break;
	        }
	    }
	    c -= m;
	    if (j == n) {
	        for (k = 0; k < m; k++) {
	            if (k >= i && k < i + n)
	                cell[c].setAttribute("bgcolor", "plum");
	            c++;
            }
	    }
    }
}