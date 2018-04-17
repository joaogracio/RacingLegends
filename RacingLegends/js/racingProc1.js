//discotProcs1.js
//************************************************
//inicializa a aplicação
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function strImageCat(id) {
    var str = 'http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/categories/' + id + '/image';
    return str;
}

function strImageDri(driverId) {
    var str = 'http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/drivers/' + driverId + '/image'; 
    return str;
}

function categories(root, data) {
    //Cria a div contentora dos items
    var divcontainer = createNode("div");
    divcontainer.className = "container";
    append(root, divcontainer);

    // Cria o cabeçalho fofinho para o titulo
    var h1my4 = createNode("h1");
    h1my4.className = "my-4";
    h1my4.innerText = "Categorias de Corridas ";
    var small = createNode("small");
    small.innerText = "Selecione uma";
    append(h1my4, small);
    append(divcontainer, h1my4);

    //Explicita as categorias uma a uma
    data.forEach(function (categorie) {
        // De acordo com o bootstrap 1 Col Portfolio
        let div = createNode('div'), // Uma linha
            divcol = createNode('div'), // Mini Contentor
            a = createNode('a'), // Link para a imagem
            img = createNode('img'), // Imagem da Categoria
            divcoldesc = createNode('div'), // Div para descricao
            h3 = createNode('h3'),
            p = createNode('p'), // Paragrafo com pequeno texto Categoria
            acat = createNode('a'); // Botao mudar catg.

        acat.addEventListener('click', function () {
            onClickCat(categorie.id);
        });


        // Declaracao das classes e atributos especificos
        div.className = "row";
        divcol.className = "col-md-7";
        img.className = "img-fluid rounded mb-3 mb-md-0"
        img.src = strImageCat(categorie.id);
        divcoldesc.className = "col-md-5";
        h3.innerHTML = `${categorie.name}`;
        p.innerHTML = `${categorie.description}`;
        acat.className = "btn btn-primary";
        acat.innerHTML = `${categorie.id}`;


        // Devidas alocacoes appends
        append(a, img);
        append(divcol, a);
        append(div, divcol);
        append(divcoldesc, h3);
        append(divcoldesc, p);
        append(divcoldesc, acat);
        append(div, divcoldesc);
        append(divcontainer, div);
    })


}

function driversList(drivers, data) {
    var divcont = document.createElement("div");
    divcont.className = "container";
    append(drivers, divcont);

    var divrow = document.createElement("div");
    divrow.className = "row";
    var divcol = document.createElement("div");
    divcol.className = "col-lg-12";
    var h2 = document.createElement("h2");
    h2.className = "my-4";
    h2.innerText = "A nossa equipa de Pilotos ";
    append(divcol, h2);
    append(divrow, divcol);
    append(divcont, divrow);

    data.forEach(function (drivers) {
        var divcollg4 = document.createElement("div"),
            a = document.createElement("a"),
            img = document.createElement("img"),
            h3 = document.createElement("h3"),
            small = document.createElement("small"),
            p = document.createElement("p");

        divcollg4.className = "col-lg-4 col-sm-6 text-center mb-4";

        a.addEventListener("click", function () {
            onClickOneDri(drivers.id);
        });

        img.className = "rounded-circle img-fluid d-block mx-auto";
        img.src = strImageDri(drivers.id);
        h3.innerText = drivers.name + " ";
        small.innerText = drivers.nickname;
        p.innerText = drivers.nationality;
        append(a, img);
        append(divcollg4, a)
        append(h3, small);
        append(divcollg4, h3);
        append(divcollg4, p);
        append(divrow, divcollg4);
    });
}

function oneDriver(onedriver, data) {
    var divcont = document.createElement("div"),
        divrow = document.createElement("div"),
        divcollg8 = document.createElement("div"),
        h1 = document.createElement("h1"),
        pbirthdate = document.createElement("p"),
        ptext = document.createElement("p"),
        hr = document.createElement("hr"),
        img = document.createElement("img"),
        pintroduction = document.createElement("p");

    divcont.className = "container";
    divrow.className = "row";
    divcollg8.className = "col-lg-8";
    h1.className = "mt-4";

    // Necessária uma captura mais eficaz de javascript
    // PAra aquilo que recebemos em JSON
    h1.innerText = data.career[0].title;
    pbirthdate.innerText = data.birth_date;
    ptext.innerText = data.career[0].text;
    img.src = strImageDri(data.id);
    pintroduction.innerText = data.introduction;

    append(onedriver, divcont);
    append(divcont, divrow);
    append(divrow, divcollg8);
    append(divcollg8, h1);
    append(divcollg8, img);
    append(divcollg8, pbirthdate);
    append(divcollg8, ptext);
    append(divcollg8, hr);
    append(divcollg8, pintroduction);
}

function onClickCat(id) {
    document.querySelector("#root").style.display = "none";
    var drivers = document.querySelector("#drivers");
    var url = 'http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/categories/' + id + '/drivers';
    fetch(url)
        .then(driverslist => driverslist.json())
        .then(function (data) {
            driversList(drivers, data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function onClickOneDri(id) {
    // Todos o conductores gerais deixam de poder ser vistos
    document.querySelector("#drivers").style.display = "none";
    // Seleciona-se a div #onedriver para apresentar os dados desse mesmo conductor
    var onedriver = document.querySelector("#onedriver");
    // Informação disponibilizada pela API de apenas um conductor
    var url = 'http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/drivers/' + id;
    fetch(url)
        .then(driverslist => driverslist.json())
        .then(function (data) {
            oneDriver(onedriver, data);
        })
        .catch(function (error) {
            console.log(error);
        });
}



































function inic() {
    cds = docXML.getElementsByTagName("cd");
    numcds = numCDs();
    grupos = Math.floor(numcds / 6);
    path = window.location.pathname;
    page = path.split("/").pop();
    page = page.substr(6, 1);
    page = parseInt(page);
    mudaPagina();
}

function mudaLinks(iCD) {
    var ICD = iCD + 1;
    var shrt1 = document.querySelector("body > div > div > div:nth-child(" + ICD + ") > div > div > h4 > a");
    // Para cada uma dessas tags atribui-lhes um novo href
    shrt1.href = "/cd" + iCD + ".html";
    // String para conter o conteudo do ID do 
    var str = new String("#img").concat(new String(iCD));

    //var shrt2 = document.querySelector(str);

    //shrt2.href = "/cd" + iCD + ".html";
}

function mudaBigImg(iCD) {
    var img = new String("img");
    // String auxiliar
    var CD = new String(iCD);
    // Concatenação das Strings para formar uma String de pesquisa válida
    var img1 = new String(img.concat(CD))

    var img = document.querySelector("#img" + iCD);
    img.src = fichImgBigCapaCD(iCD);
}

function mudaTitulo(iCD) {
    var ICD = iCD + 1;
    var h4 = document.querySelector("body > div > div > div:nth-child(" + ICD + ") > div > div > h4 > a");
    //var h4child = h4[iCD].childNodes[1];
    h4.innerText = tituloCD(iCD);
}

function mudaTexto(iCD) {
    var ICD = iCD + 1;
    var p = document.querySelector("body > div > div > div:nth-child(" + ICD + ") > div > div > p");
    //p = p[iCD];
    p.innerText = editoraCD(iCD);
}

function mudaLayout() {
    var discoteca = new String("Discoteca");
    var pagina = String(page);
    discoteca.concat(" " + pagina);
    var discotelayout1 = document.querySelector("body > nav > div > a");
    var discotelayout2 = document.querySelector("body > div > h1");
    discotelayout1.innerText = discoteca;
    discotelayout2.innerText = discoteca;

}

function mudaLista(iCD) {
    var ICD = iCD + 1;

    cds = docXML.getElementsByTagName("cd")[iCD];

    var conteudos = cds.querySelector("conteudos");

    var faixas = conteudos.querySelectorAll("faixa");

    //var faixasAUX = faixas[0].getAttribute("ref");

    var numfaixas = conteudos.querySelectorAll("faixa").length;

    var live = [];
    // Criar um elemento que corresponda a ul 
    var ul = document.querySelector("body > div > div > div:nth-child(" + ICD + ") > div > div > ul");
    // Determinar o numero de conteudos dentro de conteudos
    for (var i = 0; i < numfaixas - 1; i++) {
        var li = document.createElement("li");
        li.className = "list-group-item";
        li.appendChild(document.createTextNode(faixas[i].getAttribute("ref")));
        ul.appendChild(li);
    }
    // Para cada elemento anterior criar um elemento do tipo li e anexar a tag ul
    docXML.querySelector("cd");
}

function conteudosOBJ(iCD) {
    var cd = docXML.getElementsByTagName("cd")[iCD];
    var cont = cd.getElementsByTagName("conteudos")[0].getElementsByTagName("conteudo");
    return cont;
}

function myFunction(iCD) {
    var ICD = iCD + 1;
    var input, filter, ul, innerText, li, i;
    input = document.querySelector("body > div > div > div:nth-child(" + ICD + ") > div > div > input[type='text']");
    filter = input.value.toUpperCase();
    ul = document.querySelector("body > div > div > div:nth-child(" + ICD + ") > div > div > ul");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        innerText = li[i].innerText;
        if (innerText.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}

function mudaPesquisaAlbuns(iCD) {
    var ICD = iCD + 1;
    var input, filter;
    input = document.querySelector("");
    filter = input.value.toUpperCase();
    var list = [];
    list = document.querySelector("body > div > div > div:nth-child(" + ICD + ")");

}

function mudaPagina() {
    //gruposPorPagina = Math.ceil(gruposPorPagina);
    //console.log(gruposPorPagina);
    mudaLayout();
    for (var i = (6 * page); i < ((page + 1) * 6) && i < numcds; i++) {
        //console.log(i);
        mudaBigImg(i);
        mudaLinks(i);
        mudaTexto(i);
        mudaTitulo(i);
        mudaLista(i);
    }
}





