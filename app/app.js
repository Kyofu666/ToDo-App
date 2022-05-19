const themeBtns = document.querySelectorAll('.toDo__header__theme')
const input = document.querySelector('input')
const itemContainer = document.querySelector('.toDo__listContainer__items')
const itemLeft = document.querySelector('.toDo__listContainer__btn__itemLeft')
const filtersBtn = document.querySelectorAll('.btn')
const themeBtn = document.querySelectorAll('.toDo__header__theme')
let numberOfParents


themeBtn.forEach(btn => {
    btn.addEventListener('click',() => {
        if(btn.classList.contains('toDo__header__light')){
            btn.parentElement.parentElement.parentElement.classList.add('lightTheme')
            document.querySelector('.toDo__header__dark').style.display = 'block'
            document.querySelector('.toDo__header__light').style.display = 'none'

        }else{
            btn.parentElement.parentElement.parentElement.classList.remove('lightTheme')
            document.querySelector('.toDo__header__light').style.display = 'block'
            document.querySelector('.toDo__header__dark').style.display = 'none'
        }
    })
})

window.addEventListener('keypress', (e) => {
    const check = e.key
    const value = input.value

    if (check === 'Enter') {
        if (value === ' ' || value === null || value === '') {
            return
        } else {
            DisplayItem(value)
            getItemsParent()
            updateItemLeft()
            checkMark()
            closeBtn()
        }
    }
    else {
        return;
    }
})

function DisplayItem(value) {
    itemContainer.innerHTML += `
        
        <div class="toDo__listContainer__items__item toDo__listContainer__items__item">
            <div class="toDo__listContainer__items__item__checkContainer">
              <img src="https://kyofu666.github.io/ToDo-App/images/icon-check.svg" alt="Check" class="toDo__listContainer__items__item__checkContainer__checkMark ">
            </div>
          
            <p class="toDo__listContainer__items__item__todo">${value}</p>
          
            <img src="https://kyofu666.github.io/ToDo-App/images/icon-cross.svg" alt="Close" class="toDo__listContainer__items__item__closeBtn btn2">
                
        </div>
        `
    input.value = ''

}

function getItemsParent() {
    const toDos = document.querySelectorAll('.toDo__listContainer__items__item__todo')
    const toDoParent = Array.from(toDos).filter(toDo => {
        return toDo.parentElement
    })
    numberOfParents = toDoParent.length
}

function checkMark() {
    const checkMark2 = document.querySelectorAll('.toDo__listContainer__items__item__checkContainer')
    checkMark2.forEach(check => {
        check.addEventListener('click', () => {
            const parent = check.parentElement
            if (parent.classList.contains('toDo__listContainer__items__item--active')) {
                parent.classList.remove('toDo__listContainer__items__item--active')
                updateItemLeft()
            } else {
                parent.classList.add('toDo__listContainer__items__item--active')
                updateItemLeft()
            }
        })

    })
}

function updateItemLeft() {
    const checkMarkList = document.querySelectorAll('.toDo__listContainer__items__item__checkContainer')
    const checkList = Array.from(checkMarkList).filter(checkDiv => {
        if (checkDiv.parentElement.classList.contains('toDo__listContainer__items__item--active')) {
            return checkDiv
        }
    })

    let result = numberOfParents - checkList.length
    if (result > 1) {
        itemLeft.innerHTML = ` ${result} items left`
    } else {
        itemLeft.innerHTML = ` ${result} item left`
    }
}

filtersBtn.forEach(btn => {

    btn.addEventListener('click', (e) => {
        filtersBtn.forEach(item => {
            if (item !== btn) {
                item.classList.remove('toDo__listContainer__btn__filter--active')
            }
        })
        btn.classList.add('toDo__listContainer__btn__filter--active')

        const checkBtn = e.currentTarget
        filter(checkBtn)
    })
})

function filter(checkBtn) {
    let itemsLeftAfterFilter = []
    const itemsList = document.querySelectorAll('.toDo__listContainer__items__item')

    const checkLists = Array.from(itemsList).filter(check => {
        return check.classList.contains('toDo__listContainer__items__item--active')
    })

    const notCheckLists = Array.from(itemsList).filter(check => {
        return !check.classList.contains('toDo__listContainer__items__item--active')
    })

    const allCheckLists = Array.from(itemsList).filter(check => {
        return check.classList.contains('toDo__listContainer__items__item--active')
    })

    if (checkBtn.classList.contains('toDo__listContainer__btn__filter__active')) {

        notCheckLists.forEach(active => {
            active.style.display = 'flex'
        })

        itemsLeftAfterFilter.push(...notCheckLists)
        if (itemsLeftAfterFilter.length > 1) {
            itemLeft.innerHTML = ` ${itemsLeftAfterFilter.length} items `
        } else {
            itemLeft.innerHTML = ` ${itemsLeftAfterFilter.length} item `
        }

        checkLists.forEach(active => {
            active.style.display = ' none'
        })
    }

    if (checkBtn.classList.contains('toDo__listContainer__btn__filter__complete')) {
        notCheckLists.forEach(active => {
            active.style.display = ' none'
        })


        checkLists.forEach(active => {
            active.style.display = 'flex'
        })
        itemsLeftAfterFilter.push(...checkLists)
        if (itemsLeftAfterFilter.length > 1) {
            itemLeft.innerHTML = ` ${itemsLeftAfterFilter.length} items `
        } else {
            itemLeft.innerHTML = ` ${itemsLeftAfterFilter.length} item `
        }
    }

    if (checkBtn.classList.contains('toDo__listContainer__btn__filter__all')) {
        notCheckLists.forEach(active => {
            active.style.display = 'flex'
        })

        checkLists.forEach(active => {
            active.style.display = 'flex'
        })
        updateItemLeft()
    }

    if (checkBtn.classList.contains('toDo__listContainer__btn__clearBtn')) {
        checkLists.forEach(item => item.remove())
        numberOfParents = notCheckLists.length
        updateItemLeft()
    }
}

function closeBtn() {
    const closeBtns = document.querySelectorAll('.btn2')
    closeBtns.forEach(close => {
        close.addEventListener('click', (e) => {
            const closeBtnParent = e.target.parentElement
            console.log(closeBtnParent);
            closeBtnParent.remove()
            numberOfParents--
            updateItemLeft()
        })
    })
}


