// ----------------------------------
// -------------- MODEL -------------
// ----------------------------------

// dados do model: 
// variavel que apontará para o gato selecionado no momento e lista de informações
let model = {

    currentCat: null,
    catData: [
        {
            name:'Pepper',
            clickCount:0,
            image:'img/pepper.png'
        },
        {
            name:'Spots',
            clickCount:0,
            image:'img/spots.png'
        },
        {
            name:'Smokey',
            clickCount:0,
            image:'img/smokey.png'
        },
        {
            name:'Callie',
            clickCount:0,
            image:'img/callie.png'
        },
        {
            name:'Lexy',
            clickCount:0,
            image:'img/lexy.png'
        }, 
        {
            name:'Apricot',
            clickCount:0,
            image:'img/apricot.png'
        },        
        {
            name:'Snowball',
            clickCount:0,
            image:'img/snowball.png'
        }                                                       
    ],
    admin: false
};

//model.currentCat = model.catData[0];

// ----------------------------------
// ----------- CONTROLLER -----------
// ----------------------------------

class CatController { 

    //
    constructor(catListView, catView) {
        this.catListView = catListView;
        this.catView = catView;
    }

    // função inicia as views e define o gato selecionado como o primeiro
    init() {
        model.currentCat = model.catData[0];
        //this.setCurrentCat(this.getCats()[0]);        
        this.catListView.init(this, this.catView);
        this.catView.init(this);
    }

    //retorna o array de objetos (gatos)
    getCats() {
        return model.catData;
    }

    //retorna o gato selecionado
    getCurrentCat() {
        return model.currentCat;
    }

    // é passada por parametro uma referencia ao objeto cat, fazendo com que
    // currentcat aponte para este.
    setCurrentCat(cat) {
        model.currentCat = cat; 
    }

    // incrementa o contador do gato selecionado e depois renderiza sua view
    incrementCounter(){
        model.currentCat.clickCount++;  
        this.catView.render(this);
    }

    // altera o nome no model e renderiza as views
    changeInfo(value){
        model.currentCat.name = value;    
        this.catView.render(this); 
        this.catListView.render(this, this.catView);                    
    }

    clearInput(input){
        input.value = '';
    }

}


// ----------------------------------
// -------------- VIEW --------------
// ----------------------------------

class CatListView {

    //define a variavel e inicializa
    init(controller, catView) {
        this.catListElement = document.getElementById('cat-list');
        this.render(controller, catView);
    }

    //renderiza os botões de acordo com os gatos na array do model
    render(controller, catView) {

        this.catListElement.innerHTML = '';

        let btn, content;
        let cats = controller.getCats();

        (cats).forEach( cat => {
            //debugger;
            btn = document.createElement('button');    
            content = document.createTextNode(cat.name);
            btn.appendChild(content);   

            btn.addEventListener('click', () => {
                controller.setCurrentCat(cat);
                catView.render(controller);
            });  

            this.catListElement.appendChild(btn);            
        });

    }
}

class CatView {

    //inicializa as variáveis e incrementa o contador quando clicado
    //configura os eventos dos botoes da area admin
    init(controller) {

        //area gatos
        this.catElement = document.getElementById('cat');
        this.catNameElement = document.getElementById('cat-name');
        this.catImageElement = document.getElementById('cat-img');
        this.countElement = document.getElementById('cat-count');  
        //area admin        
        this.adminInfoElement = document.getElementById('admin-info');
        this.adminNameElement = document.getElementById('admin-name');
        this.btnAdmin = document.getElementById('btn-admin');  
        this.btnCancel = document.getElementById('btn-cancel');  
        this.btnSave = document.getElementById('btn-save');   

        this.render(controller); 

        //funcoes onclick
        this.catImageElement.addEventListener('click', () => {
            controller.incrementCounter();
        });        

        this.btnAdmin.addEventListener('click', () => {
            this.adminInfoElement.hidden = false;  
        });    

        this.btnCancel.addEventListener('click', () => {
            this.adminInfoElement.hidden = true;  
            controller.clearInput(this.adminNameElement);              
        });           

        this.btnSave.addEventListener('click', () => {            
            let value = this.adminNameElement.value;
            controller.changeInfo(value);   
            controller.clearInput(this.adminNameElement);
        });                                        

    }

    //renderiza a view
    render(controller) {

        const currentCat = controller.getCurrentCat();

        this.catNameElement.textContent = currentCat.name;
        this.countElement.textContent = currentCat.clickCount;        
        this.catImageElement.src = currentCat.image;        
    }
}


// define os objetos e
// start!

const controllerGatos = new CatController( new CatListView() , new CatView() );
controllerGatos.init();

//const listagatosview = new CatListView();
//const gatosview = new CatView();
//const controllerGatos = new CatController( listagatosview , gatosview);


