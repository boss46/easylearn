function encrypt()
{
    var tb1=document.getElementById("text1");
    var pt=tb1.value;
    var len=pt.length;
    pt = pt.toUpperCase();
    var tb2=document.getElementById("text2");
    var key = parseInt(tb2.value);

    var tbl=document.getElementById("table1");
    while(tbl.hasChildNodes())
	    tbl.removeChild(tbl.lastChild);
    var row=new Array(7);
    var cell=new Array(7*len);
    var c=0;
    for (i = 0; i < 7; i++)
    {
        row[i]=document.createElement("tr");
        for (j = 0; j < len; j++)
        {
            cell[c]=document.createElement("td");
            row[i].appendChild(cell[c++]);
        }
        tbl.appendChild(row[i]);
    }
    row[1].setAttribute("bgcolor", "pink");
    row[5].setAttribute("bgcolor", "plum");

    var ct="";
    var alpha="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (i = 0; i < len; i++)
    {
        var index1=alpha.indexOf(pt.charAt(i));
        var index2=(index1+key)%26;
        ct+=alpha.charAt(index2);
    }

    c = 0;
    for (j = 0; j < len; j++)
        cell[c++].innerHTML = pt.charAt(j);

    for (j = 0; j < len; j++)
    {
        var index1=alpha.indexOf(pt.charAt(j));
        cell[c++].innerHTML=index1;
    }
    for (j = 0; j < len; j++)
        cell[c++].innerHTML = "+" + key;
	
    for (j = 0; j < len; j++) {
        var index1 = alpha.indexOf(pt.charAt(j));
        cell[c++].innerHTML = index1 + key;
    }
    for (j = 0; j < len; j++)
        cell[c++].innerHTML = "%26";
		
    for (j = 0; j < len; j++)
    {
        var index1=alpha.indexOf(pt.charAt(j));
        var index2=(index1+key)%26;
        cell[c++].innerHTML=index2;
    }
    for (j = 0; j < len; j++)
        cell[c++].innerHTML = ct.charAt(j);
}
