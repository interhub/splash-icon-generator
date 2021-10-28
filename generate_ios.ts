import fileManipulator from 'file-manipulator'
import {createImage} from './utils'

const inputSplashPath = './splashscreen_image.png'
const inputIconPath = './icon.png'

const MAIN_FOLDER = 'IOS'

const startIos = async () => {
    await fileManipulator.delete.folder({name: MAIN_FOLDER, path: './'})
    await fileManipulator.create.folder({name: MAIN_FOLDER, path: './', replaceExisting: true})

    for (const {height, width, folder} of splashFolders) {
        await fileManipulator.create.folder({
            name: `${mainFolder.ANDROID}/${folder}`,
            path: './',
            replaceExisting: true
        })
        const outPath = `${mainFolder.ANDROID}/${folder}/splashscreen_image.png`
        const result = await createImage(inputSplashPath, outPath, width, height, 0)
        const message = result ? ' ✅ Success' : ' ⛔️ Error'
        console.log(message, 'created result', folder, {width, height})
    }

    for (const {size, folder} of iconFolders) {
        await fileManipulator.create.folder({
            name: `${mainFolder.ANDROID}/${folder}`,
            path: './',
            replaceExisting: true
        })
        for (const {name, round} of iconTypes) {
            const outPath = `${MAIN_FOLDER}/${folder}/${name}`
            const roundPercent = round ? 100 : 10
            const result = await createImage(inputIconPath, outPath, size, size, roundPercent)
            const message = result ? ' ✅ Success' : ' ⛔️ Error'
            console.log(message, 'created result', folder, {size, round})
        }
    }

    for (const {height, width, folder} of customIconResizes) {
        await fileManipulator.create.folder({
            name: `${MAIN_FOLDER}/${folder}`,
            path: './',
            replaceExisting: true
        })
        const outPath = `${MAIN_FOLDER}/${folder}/splashscreen_image.png`
        const result = await createImage(inputIconPath, outPath, width, height, 0)
        const message = result ? ' ✅ Success' : ' ⛔️ Error'
        console.log(message, 'created result', folder, {width, height})
    }
}

startIos()
// startAndroid()
