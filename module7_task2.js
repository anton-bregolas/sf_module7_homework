// Задание 2. (7.3-2)

// Написать функцию, которая принимает в качестве аргументов строку и объект,
// а затем проверяет есть ли у переданного объекта свойство с данным именем. 
// Функция должна возвращать true или false.

// Simple property check:

function checkObjHasProp(str, obj) {

    return str in obj;

}

// Own property check:

function checkObjHasOwnProp(str, obj) {

    if (obj.hasOwnProperty(str)) {

        return true;
    }

    return false;
}

const userWizard = {

    name: 'Joe',
    level: 2,
    hasFamiliar: true,
    userFamiliar: { famType: 'cat', famName: 'Murzik' }

}

console.log(checkObjHasProp("hasFamiliar", userWizard));
console.log(checkObjHasProp("__proto__", userWizard));
console.log(checkObjHasOwnProp("hasFamiliar", userWizard));
console.log(checkObjHasOwnProp("__proto__", userWizard));