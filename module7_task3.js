// Задание 3. (7.3-3)

// Написать функцию, которая создает пустой объект, но без прототипа.

function createEmptyObject() {

    return Object.create(null);

}

const iFeelEmpty = createEmptyObject();

console.log(iFeelEmpty);
