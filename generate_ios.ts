import fileManipulator from 'file-manipulator'
import {createImage} from './utils'

const inputIconPath = './icon.png'

const MAIN_FOLDER = 'IOS'

type AppIconItem = {
    name: string, size: number
}

const iconFolderName = 'AppIcon.appiconset'

const appIcons: AppIconItem[] = [
    {name: 'icon-20', size: 20},
    {name: 'icon-20@2x', size: 40},
    {name: 'icon-20@3x', size: 60},
    {name: 'icon-29', size: 29},
    {name: 'icon-29@2x', size: 58},
    {name: 'icon-29@3x', size: 87},
    {name: 'icon-40', size: 40},
    {name: 'icon-40@2x', size: 80},
    {name: 'icon-40@3x', size: 120},
    {name: 'icon-60@2x', size: 120},
    {name: 'icon-60@3x', size: 180},
    {name: 'icon-76', size: 76},
    {name: 'icon-76@2x', size: 152},
    {name: 'icon-83.5@2x', size: 157},
    {name: 'icon-1024', size: 1024},
]

const startIos = async () => {
    await fileManipulator.delete.folder({name: MAIN_FOLDER, path: './'})
    await fileManipulator.create.folder({name: MAIN_FOLDER, path: './', replaceExisting: true})
    await fileManipulator.create.folder({name: iconFolderName, path: `./${MAIN_FOLDER}`, replaceExisting: true})
    await fileManipulator.copy.file({
        name: 'Contents',
        ext: 'json',
        from: './',
        to: `./${MAIN_FOLDER}/${iconFolderName}`,
        replaceExisting: true
    })

    for (const {size, name} of appIcons) {
        const outPath = `${MAIN_FOLDER}/${iconFolderName}/${name}.png`
        const result = await createImage(inputIconPath, outPath, size, size, 0)
        const message = result ? ' ✅ Success' : ' ⛔️ Error'
        console.log(message, 'created result', {size, name})
    }
    
    console.log('IOS finished 🎉')
}

startIos()
