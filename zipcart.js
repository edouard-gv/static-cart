import { TestCase } from "./unitjs.js";

export let unzip = (base64String) => {
    return [];
}

export let zip = (productQtyList) => {
    return "";
}


//Unit tests
let testCase = new TestCase()

testCase.addTest("testA", () => {
    console.log("in the test")
    testCase.assertEquals(1,2);

});
console.log("in the test")

testCase.execute();
console.log("in the test")

