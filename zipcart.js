import { TestCase } from "./unitjs.js";

export let unzip = (base64String) => {
    return [];
}

export let zip = (productQtyList) => {
    let iCart = cartAsInteger(productQtyList)
    let sxCart = convertHexToString(iCart)
    return btoa(sxCart)
}

let cartAsInteger = (aCart) => {
    let computed = 0
    for (let i = 0; i < aCart.length; i++) {
        computed += (aCart[i][0]*1000+aCart[i][1])*(10000**(aCart.length-i-1))
    }
    return computed
}

let convertHexToString = (input) => {
    let output = ""
    let iAsXString = input.toString(16)
    let size = iAsXString.length / 2
    for (let i = 0; i < size; i++) {
        output +=  String.fromCharCode(parseInt(iAsXString.slice(i*2, i*2+2), 16))
    }
    return output
}

//Unit tests
let testCase = new TestCase()

testCase.addTest("Full zip test", () => {
    let cart = [[1, 1], [3, 2], [4, 7]]
    let zippedCart = 'F1A26kc='
    testCase.assertEquals(zippedCart, zip(cart));
});

testCase.addTest("convertHexToString", () => {
    testCase.assertEquals('\x17\x50\x36\xea\x47', convertHexToString(0x175036ea47))
})

testCase.addTest("cartAsInteger", () => {
    testCase.assertEquals(100130024007, cartAsInteger([[1, 1], [3, 2], [4, 7]]))
})



testCase.execute();

    //Pour récupérer un panier à partir d'une URL
    //

    //Pour construire le code à partir du panier
    //Si 1 x 001, 3 x 002 et 4 x 007 => 100130024007
    //A convertir en hexa => 175036ea47
    //A convertir en string en itérant avec String.fromCharCode sur chaque ? => '\x17\x50\x36\xea\x47'
    //A convertir en base64 via btoa : 'F1A26kc='

    //Inversement : atob
    //on converti en hexa en itérant et appliquant sum (.charAtCode(i) * 16^i)

