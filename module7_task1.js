// Задание 1. (7.3-1)

// Написать, функцию, которая принимает в качестве аргумента объект 
// и выводит в консоль все ключи и значения только собственных свойств. 
// Данная функция не должна возвращать значение.

function getObjectOwnProps(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
                console.log(key, obj[key]);
        }
    }
}

const playerClassWizard = {
    className: "Wizard",
    classType: "Spellcaster",
    canCastSpells: true,
    baseHitPoints: 4,
}

const baseFamiliar = {
    classType: "Magical beast",
    canCastSpells: false,
}

const userWizard = Object.create(playerClassWizard);

userWizard.name = "Joe"
userWizard.level = 2
userWizard.hasFamiliar = true;
userWizard.userFamiliar = Object.create(baseFamiliar);
userWizard.userFamiliar.famType = "cat";
userWizard.userFamiliar.famName = "Murzik";

getObjectOwnProps(userWizard);
getObjectOwnProps(userWizard.userFamiliar);

