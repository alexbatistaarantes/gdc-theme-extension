(() => {

    if(window.hasRun){ return; }
    window.hasRun = true;

    /* Define the colors of the dark theme */
    const dark_theme = {
        /* cor do fundo do canvas e do painel de controle */
        backgroundColor: "#303030",
        /* cor da fonte do texto do painel de controle */
        fontColor: "white",

        /* cor de fundo das divisórias do painel de controle (ex: GLYPH SETS, SELECT LAYER) */
        headerDivisionBgColor: "white",
        /* cor da fonte das divisórias */
        headerDivisionFontColor: "black",

        /* cor da borda do glyph selecionado atualmente (o que aparece no canto esquerdo em baixo) */
        vectorBorderColor: "red",
        /* tamanho da borda (em pixel) */
        vectorBorderSize: '1',
        /* cor de fundo */
        vectorBackgroundColor: "white",

        /* cor de fundo do menu de seleção de glyphs */
        glyphContBgColor: "#6f6f6f",

        /* cores de fundo e fonte dos inputs, selects e buttons do painel */
        fieldsBgColor: "#6f6f6f",
        fieldsFontColor: "white",

        /* cor de fundo e fonte dos spans do painel de controle */
        spansBgColor: "white",
        spansFontColor: "black",
        /* == # == */
    }
    /* Return everything to the default theme */
    const default_theme = {
        /* cor do fundo do canvas e do painel de controle */
        backgroundColor: "",
        /* cor da fonte do texto do painel de controle */
        fontColor: "",

        /* cor de fundo das divisórias do painel de controle (ex: GLYPH SETS, SELECT LAYER) */
        headerDivisionBgColor: "",
        /* cor da fonte das divisórias */
        headerDivisionFontColor: "",

        /* cor da borda do glyph selecionado atualmente (o que aparece no canto esquerdo em baixo) */
        vectorBorderColor: "",
        /* tamanho da borda (em pixel) */
        vectorBorderSize: "",
        /* cor de fundo */
        vectorBackgroundColor: "",

        /* cor de fundo do menu de seleção de glyphs */
        glyphContBgColor: "",

        /* cores de fundo e fonte dos inputs, selects e buttons do painel */
        fieldsBgColor: "",
        fieldsFontColor: "",

        /* cor de fundo e fonte dos spans do painel de controle */
        spansBgColor: "",
        spansFontColor: "",
        /* == # == */
    }
    /* The themes available */
    const themes = {
        'dark': dark_theme,
        'default': default_theme
    }

    let preference = undefined;

    /* Vector: current selected Glyph (bottom left), glyphs on Glyph Sets and on Selected Layers tabs  */
    /* Canvas: the space below the space where you draw */
    /* Controls Container: the controls panel on the right side */
    /* Header Division: the header of each section in the Controls Container */

    /* ## Vector ## */
    function editVectorBorder(color){
        document.querySelectorAll(".vector").forEach((vector) => {
            vector.querySelector("svg").style.border = `1px solid ${color}`;
        })
    }
    function editVectorBackgroundColor(color){
        document.querySelectorAll(".vector").forEach((vector) => {
            vector.querySelector("svg").style.backgroundColor = color;
        })
    }

    /* ## Canvas ## */
    function editCanvasBackgroundColor(color){
        document.querySelector('.canvas_container').style.backgroundColor = color;
    }

    /* ## Controls Container ## */
    function editControlsContainerBackgroundColor(color){
        document.querySelector(".controls_container").style.backgroundColor = color;
    }
    function editControlsContainerFontColor(color){
        document.querySelector(".controls_container").style.color = color;
    }

    /* ## Header division ## */
    function editHeaderDivisionBackgroundColor(color){
        const headerDivision = document.querySelector(".controls_container");
        headerDivision.querySelectorAll("h3").forEach((header) => {
            header.style.backgroundColor = color;
        });
    }
    function editHeaderDivisionFontColor(color){
        const headerDivision = document.querySelector(".controls_container");
        headerDivision.querySelectorAll("h3").forEach((header) => {
            header.style.color = color;
        });
    }

    /* Apply the colors to each component */
    function applyTheme(theme){

        editVectorBorder(themes[theme].vectorBorderColor);
        editVectorBackgroundColor(themes[theme].vectorbackgroundColor);
        
        editCanvasBackgroundColor(themes[theme].backgroundColor);
        
        editControlsContainerBackgroundColor(themes[theme].backgroundColor);
        editControlsContainerFontColor(themes[theme].fontColor);

        editHeaderDivisionBackgroundColor(themes[theme].headerDivisionBgColor);
        editHeaderDivisionFontColor(themes[theme].headerDivisionFontColor);
        
		const controlsContainer = document.querySelector(".controls_container");
        
        /* Glyphs mostrados no painel de controle (Ex: map keys, glyphs de cada layer da celula selecionada) */
        var vectors = controlsContainer.getElementsByClassName("vector");
        for( var i = 0; i < vectors.length; i++ ){ 
            vectors[i].getElementsByTagName("svg")[0].style.backgroundColor = themes[theme].vectorBackgroundColor;
            vectors[i].getElementsByTagName("svg")[0].style.border = themes[theme].vectorBorderSize+"px solid "+ themes[theme].vectorBorderColor ;
        };
        
        /* Menu de seleção de glyphs */
        document.getElementById("glyphcont").style.backgroundColor = themes[theme].glyphContBgColor;
        
        /* Inputs do painel de controle */
        var inputs = controlsContainer.getElementsByTagName("input");
        for( var i = 0; i < inputs.length; i++ ){
            inputs[i].style.backgroundColor = themes[theme].fieldsBgColor;
            inputs[i].style.color = themes[theme].fieldsFontColor;
        };
        
        /* Buttons do painel de controle */
        var buttons = controlsContainer.getElementsByTagName("button");
        for( var i = 0; i < buttons.length; i++ ){
            buttons[i].style.backgroundColor = themes[theme].fieldsBgColor;
            buttons[i].style.color = themes[theme].fieldsFontColor;
        };
        
        /* Selects do painel de controle */
        var selects = controlsContainer.getElementsByTagName("select");
        for( var i = 0; i < selects.length; i++ ){
            selects[i].style.backgroundColor = themes[theme].fieldsBgColor;
            selects[i].style.color = themes[theme].fieldsFontColor;
        };
        
        /* Spans do painel de controle */
        var spans = controlsContainer.getElementsByTagName("span");
        for( var i = 0; i < spans.length; i++ ){
            spans[i].style.backgroundColor = themes[theme].spansBgColor;
            spans[i].style.color = themes[theme].spansFontColor;
        };

    }

    browser.runtime.onMessage.addListener((message) => {
        console.log(message);
        if (message.command === "apply-theme") {
            applyTheme(message.theme);
            preference = themes[theme];
        }
    });
})();
