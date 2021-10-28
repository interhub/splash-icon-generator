import fileManipulator from 'file-manipulator'
import {createImage} from './utils'

const inputSplashPath = './splashscreen_image.png'
const inputIconPath = './icon.png'

const MAIN_FOLDER = 'ANDROID'

// const iosIconFolderName = 'AppIcon.appiconset'

const iconTypes = [{name: 'ic_launcher_round.png', round: true}, {name: 'ic_launcher.png', round: false}]

const splashFolders = [
    {folder: 'drawable-mdpi', width: 320, height: 480},
    {folder: 'drawable-hdpi', width: 480, height: 720},
    {folder: 'drawable-xhdpi', width: 640, height: 960},
    {folder: 'drawable-xxhdpi', width: 960, height: 1440},
    {folder: 'drawable-xxxhdpi', width: 1280, height: 1920},
]

const iconFolders = [
    {folder: 'mipmap-mdpi', size: 48},
    {folder: 'mipmap-hdpi', size: 72},
    {folder: 'mipmap-xhdpi', size: 96},
    {folder: 'mipmap-xxhdpi', size: 144},
    {folder: 'mipmap-xxxhdpi', size: 192},
    //play store
    {folder: 'play-store-icon', size: 512},
]

const customIconResizes = [
    //play store
    {folder: 'play-store-banner', width: 1024, height: 500},
]

const startAndroid = async () => {
    await fileManipulator.delete.folder({name: MAIN_FOLDER, path: './'})
    await fileManipulator.create.folder({name: MAIN_FOLDER, path: './', replaceExisting: true})


    await fileManipulator.create.file({name: 'Contents', ext: 'json', path: './', replaceExisting: true, content: ''})

    for (const {height, width, folder} of splashFolders) {
        await fileManipulator.create.folder({
            name: `${MAIN_FOLDER}/${folder}`,
            path: './',
            replaceExisting: true
        })
        const outPath = `${MAIN_FOLDER}/${folder}/splashscreen_image.png`
        const result = await createImage(inputSplashPath, outPath, width, height, 0)
        const message = result ? ' ✅ Success' : ' ⛔️ Error'
        console.log(message, 'created result', folder, {width, height})
    }

    for (const {size, folder} of iconFolders) {
        await fileManipulator.create.folder({
            name: `${MAIN_FOLDER}/${folder}`,
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

startAndroid()
