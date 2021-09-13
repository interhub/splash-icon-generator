const sharp = require('sharp')
const fs = require('fs')

const inputSplashPath = './splashscreen_image.png'
const inputIconPath = './icon.png'

const mainFolder = {
    IOS: 'ios',
    ANDROID: 'android'
}


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
]

const iconTypes = [{name: 'ic_launcher_round.png', round: true}, {name: 'ic_launcher.png', round: false}]

const start = async () => {
    await fs.mkdirSync(mainFolder.IOS)
    await fs.mkdirSync(mainFolder.ANDROID)

    for (const {height, width, folder} of splashFolders) {
        await fs.mkdirSync(folder)
        await sharp(inputSplashPath)
            .resize(width, height)
            .toFile(folder + '/splashscreen_image.png', (err, info) => {
                const message = !err ? ' ✅ Success' : ' ⛔️ Error'
                console.log(message, 'created result', folder, {width, height})
            })
    }

    for (const {size, folder} of iconFolders) {
        await fs.mkdirSync(folder)
        for (const {name, round} of iconTypes) {
            await sharp(inputIconPath)
                .resize(size, size)
                .toFile(folder + '/' + name, (err, info) => {
                    const message = !err ? ' ✅ Success' : ' ⛔️ Error'
                    console.log(message, 'created result', folder, {size})
                })
        }
    }


}

start()
