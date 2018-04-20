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

function driversList(data) {
    var drivers = document.querySelector("#drivers");

    drivers.innerHTML = "";
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
        // Declaração de todos os elementos dentro desta função da pagina
        var divcollg4 = document.createElement("div"),
            a = document.createElement("a"),
            img = document.createElement("img"),
            h3 = document.createElement("h3"),
            small = document.createElement("small"),
            p = document.createElement("p");

        
        // Detalhar classes e Atributos de cada butao
        divcollg4.className = "col-lg-4 col-sm-6 text-center mb-4";

        // Ao clicar na foto de um codutor deve fazer...
        a.addEventListener("click", function () {
            onClickOneDri(drivers.id);
        });

        // Continuação do Detalhar
        img.className = "rounded-circle img-fluid d-block mx-auto";
        img.src = strImageDri(drivers.id);
        img.width = 200;
        img.height = 200;
        h3.innerText = drivers.name + " ";
        small.innerText = drivers.nickname;
        p.innerText = drivers.nationality;

        // Agregar todos os botoes onde sao devidos segundo o bootstrap
        append(a, img);
        append(divcollg4, a)
        append(h3, small);
        append(divcollg4, h3);
        append(divcollg4, p);
        append(divrow, divcollg4);
    });

    buttoncats = document.createElement("button");

    buttoncats.innerText = "Categorias";
    buttoncats.addEventListener("click", function () {
        onClickGoToCat();
    });
    buttoncats.className = "btn btn-primary";

    append(drivers, buttoncats);
}

function oneDriver(data) {
    var onedriver = document.querySelector("#onedriver");
    onedriver.innerHTML = "";
    var divcont = document.createElement("div"),
        divrow = document.createElement("div"),
        divcollg8 = document.createElement("div"),
        h1 = document.createElement("h1"),
        pbirthdate = document.createElement("p"),
        ptext = document.createElement("p"),
        hr = document.createElement("hr"),
        img = document.createElement("img"),
        pintroduction = document.createElement("p"),
        buttondrivers = document.createElement("button");

    divcont.className = "container";
    divrow.className = "row";
    divcollg8.className = "col-lg-8";
    h1.className = "mt-4";
    buttondrivers.innerText = sessionStorage.cat;
    buttondrivers.addEventListener("click", function () {
        onClickCat(sessionStorage.cat);
    });
    buttondrivers.className = "btn btn-primary";

    // Necessária uma captura mais eficaz de javascript
    // PAra aquilo que recebemos em JSON
    h1.innerText = data.career[0].title;
    pbirthdate.innerText = data.birth_date;
    ptext.innerText = data.career[0].text;
    img.src = strImageDri(data.id);
    img.widht = 900;
    img.height = 300;
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
    // Colocar Aqui a Multimedia

    // Cria o bootstrap para receber a metada dos videos...
    data.multimedia.videos.forEach(function (video) {
        
        var div2col = document.createElement("div"),
            divcollg6 = document.createElement("div"),
            divcard = document.createElement("div"),
            videocam = document.createElement("iframe"),
            divcardbody = document.createElement("div"),
            h4 = document.createElement("h4"),
            a = document.createElement("a");

        div2col.className = "row";
        divcollg6.className = "col-lg-6 portfolio-item";
        divcard.className = "card h-100";
        divcardbody.className = "card-body";
        video.title = video.caption;
        videocam.width = 480;
        videocam.height = 390;
        videocam.src = "https://www.youtube.com/embebed/" + video.youtube_id;
        videocam.allowFullscreen = true;
        h4.innerText = video.caption;
        a.href = "https://www.youtube.com/watch?v=" + video.youtube_id;
        h4.className = "card-title";

        //console.log(video);

        
        append(div2col, divcollg6);
        append(divcollg6, divcard);
        append(divcard, videocam);
        append(divcard, divcardbody);
        append(divcardbody, a);
        append(a, h4);
        // No final colocar esta dive no respectivo container...
        append(divcont, div2col);
    });
    // Colocar Aqui Informações Adicionais
    append(divcollg8, buttondrivers);
}

function categories(data) {
    var root = document.querySelector("#root");

    root.innerHTML = "";
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
        img.width = 700;
        img.height = 300;
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

function onClickGoToCat() {
    // Apenas um estado apenas uma div
    document.querySelector("#root").style.display = "block";
    document.querySelector("#onedriver").style.display = "none";
    document.querySelector("#drivers").style.display = "none";
    // Informação disponibilizada pela API acerca das categorias disponiveis
    const url = 'http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/categories';
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            categories(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function onClickCat(id) {
    // Apenas um estado apenas uma div
    document.querySelector("#root").style.display = "none";
    document.querySelector("#onedriver").style.display = "none";
    document.querySelector("#drivers").style.display = "block";
    // Informação disponibilizada pela API acerca das categorias disponiveis
    var url = 'http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/categories/' + id + '/drivers';
    // Memorisa o valor do ID da Categoria
    sessionStorage.cat = id;
    fetch(url)
        .then(driverslist => driverslist.json())
        .then(function (data) {
            driversList(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function onClickOneDri(id) {
    // Todos o conductores gerais deixam de poder ser vistos
    document.querySelector("#root").style.display = "none";
    document.querySelector("#drivers").style.display = "none";
    document.querySelector("#onedriver").style.display = "block";
    // Informação disponibilizada pela API de apenas um conductor
    var url = 'http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/drivers/' + id;
    // Memorisa a infomacao do corredor ID
    sessionStorage.driv = id;
    fetch(url)
        .then(driverslist => driverslist.json())
        .then(function (data) {
            oneDriver(data);
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





