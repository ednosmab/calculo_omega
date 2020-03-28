
let exec = document.getElementById("exec")

exec.addEventListener("click", mostra)
function mostra(){
    //Coletando dados de entrada dos inputs da base, dos graus esféricos e cilíndricos
    let baseGrau = document.getElementById("base")
    let oEsfd = document.getElementById("ged") 
    let oEsfe = document.getElementById("gef")
    let oCild = document.getElementById("gcd")
    let oCile = document.getElementById("gcf")

    //Coletando referências para retorno dos modelos calculados
    let med = document.getElementById("med") 
    let mee = document.getElementById("mee")
    let mcd = document.getElementById("mcd")
    let mce = document.getElementById("mce")
    
    //Convertendo os dados de entrada para Número
    let oEsfD = Number(oEsfd.value)
    let oEsfE = Number(oEsfe.value)
    let oCilD = Number(oCild.value)
    let oCilE = Number(oCile.value)
    baseGrau = Number(baseGrau.value)

    //Vetor contendo Grau e Modelo
    let vetor = {
            1065:{
                800: 362,
                825: 337,
                850: 312,
                875: 287,
                900: 262,
                925: 237,
                950: 225
                
            },
            1176:{
                975: 325,
                1000: 300,
                1025: 275,
                1050: 250,
                1075: 225,
                1100: 200
            },
            1284:{
                1125: 300,
                1150: 275,
                1175: 250,
                1200: 225,
                1225: 212
            },
            1389:{
                1250: 312,
                1275: 287,
                1300: 262,
                1325: 250,
                1350: 225,
                1375: 200
            },
            1490:{
                1400: 312,
                1425: 300,
                1450: 275,
                1475: 250,
                1500: 225,
                1525: 212
            },
            1588:{
                1550: 300,
                1575: 287,
                1600: 262,
                1625: 250,
                1650: 225,
                1675: 212
            },
            1665:{
                1700: 287,
                1725: 262,
                1750: 237,
                1775: 225,
                1800: 212
            }
        }
        
    //Atribuindo objeto de segundo nível mediante a base informada    
    let tamVet = vetor[baseGrau]
        
    //Armazenando a quantidade de items dentro do objeto coletado
    let total = Object.keys(tamVet).length

    //Coletando propriedade grau da propriedade base
    let grauUm = "", grauDois = ""
    Object.keys(tamVet).forEach(function(element, indice){
        if (indice == 0) {
            grauUm = element
        }
        if (indice == total -1) {
            grauDois = element
        }
    });
    
    //Calculando modelo esférico   
    function modelo(grau, grauUm, grauDois){
        let dif = 0
        let modelo = 0
        if(grau < grauUm){
            dif = grauUm - grau
            grau = grauUm
            modelo = vetor[baseGrau][grau] + dif
        }else if(grau > grauDois){
            dif = grau - grauDois
            grau = grauDois
            modelo = vetor[baseGrau][grau] - dif
        }else{
            modelo = vetor[baseGrau][grau]
        }
        return modelo
    }
    
    //Calculando modelo cilíndrico
    function cilindro(cil, grau){
        if(cil > 75){
            //Coletando apenas duas casas decimais, convertendo para string para remover o ponto decimal
            cil = ((cil / 94).toFixed(2)).toString().replace(/\./g, "")
    
            //Calculando o modelo esférico com o cilindro convertido em inteiro para gerar modelo cilindrico
            cil = modelo(grau, grauUm, grauDois) + parseInt(cil)
        }else{
            cil = modelo(grau, grauUm, grauDois) + cil
        }
        return cil
    }
    
    //Retorno dos modelos calculados para a página
        //Olho Esférico
    if(oEsfD){
        grauD = oEsfD
        med.innerHTML = modelo(grauD, grauUm, grauDois)
    }
    if(oEsfE){
        grauE = oEsfE
        mee.innerHTML = modelo(grauE, grauUm, grauDois)
    }

        //Olho Cilíndrico
    let cil = ""
    if(oCilD){
        cil = oCilD
        mcd.innerHTML = cilindro(cil, oEsfD)
    }
    if(oCilE){
        cil = oCilE
        mce.innerHTML = cilindro(cil, oEsfE)
    }

    if(oEsfD && oEsfE == ""){
        mee.innerHTML = ""
        mce.innerHTML = ""
        console.log('entrou')
    }else if(oEsfE && oEsfD == ""){
        med.innerHTML = ""
        mcd.innerHTML = ""
        console.log('entrou aqui')
    }
    //Para zerar os inputs de entrada do grau esférico e cilíndrico
    oEsfd.value = ""
    oEsfe.value = ""
    oCild.value = ""
    oCile.value = ""
}