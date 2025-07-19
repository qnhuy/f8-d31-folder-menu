// function getTreeNames(tree, indent = '') {
//     for (node of tree) {
//         console.log(indent + node.name)
//         if (node.child) {
//             getTreeNames(node.child, indent + '|  ')
//         }
//     }
// }
// getTreeNames(tree)const $ = document.querySelector.bind(document)

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const tree = [
    {
        type: 'folder',
        name: 'src',
        child: [
            {
                type: 'folder',
                name: 'components',
                child: [
                    { type: 'file', name: 'Header.js' },
                    { type: 'file', name: 'Footer.js' }
                ]
            },
            { type: 'file', name: 'index.js' }
        ]
    },
    { type: 'file', name: 'README.md' },
    {
        type: 'folder',
        name: 'folder-1',
        child: [
            {
                type: 'folder',
                name: 'folder-11',
                child: [
                    {
                        type: 'folder',
                        name: 'folder-111'
                    },
                    {
                        type: 'folder',
                        name: 'folder-112',
                        child: [
                            {
                                type: 'file',
                                name: 'html-1123.html'
                            },
                            {
                                type: 'file',
                                name: 'css-1124.css'
                            },
                        ]
                    },
                    {
                        type: 'folder',
                        name: 'folder-113,'
                    }
                ]
            }
        ]
    },
    {
        type: 'folder',
        name: 'folder-2',
        child: [
            {
                type: 'folder',
                name: 'folder-21',
            },
            {
                type: 'folder',
                name: 'folder-22',
                child: [
                    {
                        type: 'folder',
                        name: 'folder-211'
                    },
                    {
                        type: 'folder',
                        name: 'folder-212',
                        child: [
                            {
                                type: 'file',
                                name: 'img2121.img'
                            },
                            {
                                type: 'file',
                                name: 'img2122.img'
                            },
                        ]
                    },
                ]
            },
            {
                type: 'file',
                name: 'json-23.json',
            }
        ]
    },
    {
        type: 'folder',
        name: 'folder-3',
        child: [
            {
                type: 'file',
                name: 'info-31.md'
            },
            {
                type: 'folder',
                name: 'folder-32'
            }
        ]
    },
    {
        type: 'folder',
        name: 'folder-4',
        child: [
            {
                type: 'folder',
                name: 'folder-41',
                child: [
                    {
                        type: 'file',
                        name: 'img-411.img'
                    },
                    {
                        type: 'file',
                        name: 'img-412.img'
                    },
                    {
                        type: 'file',
                        name: 'img-413.img'
                    },
                    {
                        type: 'file',
                        name: 'img-414.img'
                    },
                ]
            }
        ]
    },
    {
        type: 'folder',
        name: 'folder-5',
    },
    {
        type: 'folder',
        name: 'folder-6',
    },
    {
        type: 'folder',
        name: 'folder-7',
    },
    {
        type: 'folder',
        name: 'folder-8',
    },
    {
        type: 'folder',
        name: 'folder-9',
    },
    {
        type: 'folder',
        name: 'folder-10',
    },
    {
        type: 'file',
        name: 'index.html',
    },
    {
        type: 'file',
        name: 'style.css',
    },
    {
        type: 'file',
        name: 'main.js',
    },
    {
        type: 'file',
        name: '.gitignore',
    },
    {
        type: 'file',
        name: 'hoangvanbinh',
    },
];

// ================= handle render tree =================
const menuFolder = document.createElement('div')
menuFolder.className = 'menu-folder'
const workspace = $('.workspace')

//get extension part of file
function getFileExtension(fileName) {
    const lastDotIndex = fileName.lastIndexOf('.')
    if (lastDotIndex < 0) return ''
    return fileName.slice(lastDotIndex)
}

//get icon class base on file name
function getFileIcon(fileName) {
    const fileExtension = getFileExtension(fileName)
    let iconClass = ''

    if (fileExtension.length === 0) {
        iconClass = 'folder fa-solid fa-folder'
    } else if (fileExtension === '.html') {
        iconClass = 'html mdi mdi-language-html5'
    } else if (fileExtension === '.css') {
        iconClass = 'css mdi mdi-language-css3'
    } else if (fileExtension === '.js') {
        iconClass = 'js mdi mdi-language-javascript'
    } else if (fileExtension === '.img') {
        iconClass = 'image mdi mdi-image'
    } else if (fileExtension === '.md') {
        iconClass = 'md mdi mdi-information'
    } else if (fileExtension === '.font') {
        iconClass = 'font mdi mdi-format-letter-case'
    } else if (fileExtension === '.json') {
        iconClass = 'json mdi mdi-code-json'
    } else if (fileExtension === '.gitignore') {
        iconClass = 'gitignore fa-solid fa-code-branch'
    }

    return `<span class="menu-folder__icon ${iconClass}"></span>`
}

//get drop down icon if file is a folder
function getFolderDropDown(fileType) {
    if (fileType === 'folder') {
        return '<i class="drop-down fa-solid fa-chevron-down"></i>'
    } else {
        return ''
    }
}

//render menu folder
function renderMenuFolder(tree, parentElement) {
    for (node of tree) {
        const childElement = document.createElement('div')
        childElement.className = 'menu-folder__item'

        childElement.innerHTML = `
            <div class="menu-folder__info">
                ${getFileIcon(node.name)}
                <p class="menu-folder__name">${node.name}</p>
                ${getFolderDropDown(node.type)}
            </div>`

        parentElement.appendChild(childElement)
        if (node.child) {
            renderMenuFolder(node.child, childElement)
        }
    }
}
renderMenuFolder(tree, menuFolder)
//append menu folder to workspcace
workspace.appendChild(menuFolder)

// ================= handle menu folder action =================
//get all file in tree and handle on click
const fileItems = [...$$('.menu-folder__info')]
fileItems.forEach(fileItem => {
    //handle mark file when click whether right or left mouse
    fileItem.onmousedown = handleMarkFile

    fileItem.onclick = () => {
        //check is folder or not
        const isFolder = checkFolder.call(fileItem)
        if (isFolder && !isTyping) {
            toogleFolderContent.call(fileItem)
        }
    }
})

//handle mark file is selected
function handleMarkFile(e) {
    //remove state seleted from all files
    fileItems.forEach(fileItem => fileItem.classList.remove('selected'))

    //if is not typing, active selected state
    if (!isTyping) {
        this.classList.add('selected')
    }
}

//check element is folder or not
function checkFolder() {
    //get element that contain class folder in it
    const folder = [...this.children].filter(child => child.classList.contains('folder'))
    if (folder.length > 0) {
        return true
    }
    return false
}

//handle show/hide folder's files
function toogleFolderContent() {
    const parentFolder = this.closest('.menu-folder__item')
    //get children having class menu-folder__item
    const children = [...parentFolder.children].filter(child => child.className === 'menu-folder__item')
    children.forEach(child => child.hidden = !child.hidden)

    //get folder info
    const folderInfo = [...parentFolder.children].filter(child => child.classList.contains('menu-folder__info'))[0]
    //get drop down icon
    const dropDown = [...folderInfo.children].filter(child => child.classList.contains('drop-down'))[0]
    dropDown.classList.toggle('rotated')
}

// ================= handle file's context menu =================
document.oncontextmenu = handleFileContextMenu

document.onclick = (e) => {
    hideFileContextMenu()
}

const contextMenu = $('.context-menu')

//handle file's context menu action
function handleFileContextMenu(e) {
    e.preventDefault()
    if (e.target.closest('.menu-folder__info')) {
        handleMenuPosition(e)
        handleShowMenu(e)
        handleMenuOptions(e)
    }
}

//handle position of context menu
function handleMenuPosition(e) {
    //identify x coordinate
    contextMenu.style.top = `
        ${contextMenu.offsetHeight + e.y > innerHeight ?
            e.y - contextMenu.offsetHeight : e.y}px`

    //identify y coordinate
    contextMenu.style.left = e.x + 'px'
}

//handle show context menu
function handleShowMenu(e) {
    if (e.target.closest('.menu-folder__info')) {
        contextMenu.classList.add('show')
    } else {
        contextMenu.classList.remove('show')
    }
}

let isTyping = false
//handle context menu's options
function handleMenuOptions(e) {
    const renameBtn = $('.context-menu--rename')
    const deleteBtn = $('.context-menu--delete')

    const fileItem = e.target.closest('.menu-folder__item')
    const fileInfo = e.target.closest('.menu-folder__info')
    //get paragraph element in file info
    const fileName = [...fileInfo.children].filter(child => child.classList.contains('menu-folder__name'))[0]

    //create element input
    const input = document.createElement('input')
    input.type = 'text'
    input.className = 'rename-input'

    renameBtn.onclick = () => handleRenameFile(fileInfo, fileName, input)

    deleteBtn.onclick = () => fileItem.remove()
}

//handle rename file
function handleRenameFile(fileInfo, fileName, input) {
    fileInfo.classList.remove('selected')

    input.value = fileName.textContent

    fileName.replaceWith(input)

    //setting when focus on input
    input.onfocus = () => {
        isTyping = true //set to is typing
        fileInfo.classList.remove('selected')
    }
    input.focus() //focus on input

    let isSaving = false //to handle onblur and onkeydown dont have event conflict

    //save file name when unfocus (click to another place)
    input.onblur = () => {
        if (!isSaving) {
            isSaving = true
            saveName(fileName, input)
            isSaving = false
        }
    }

    //save name when press enter
    input.onkeydown = (e) => {
        if (e.key === 'Enter' && !isSaving) {
            isSaving = true
            saveName(fileName, input)
            isSaving = false
        }
    }
}

//save file name
function saveName(fileName, input) {
    fileName.textContent = input.value
    input.replaceWith(fileName)
    isTyping = false
}

//hide context menu when clicked
function hideFileContextMenu(e) {
    contextMenu.classList.remove('show')
}