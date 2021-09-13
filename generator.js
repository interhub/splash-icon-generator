const sharp = require('sharp')
const fs = require('fs')
const rimraf = require('rimraf')

const inputSplashPath = './splashscreen_image.png'
const inputIconPath = './icon.png'

// const getCircleShapeByWidth = (width) => Buffer.from(`<svg><circle cx="${width / 2}" cy="${width / 2}" r="${width / 2}" /></svg>`)

const getRoundedShape = (width, radiusPercent) => {
    const radius = width * Number(radiusPercent) / 100
    return Buffer.from(`
<svg><rect x="0" y="0" height="${width}" width="${width}" rx="${radius}" ry="${radius}"/></svg>
`)
}

const mainFolder = {
    IOS: 'ios',
    ANDROID: 'android'
}

const iosIconFolderName = 'AppIcon.appiconset'

const removeDir = async (path) => {
    return new Promise((ok) => {
        rimraf(path, function () {
            console.log('removed', path)
            ok()
        })
    })
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

const startAndroid = async () => {
    await removeDir(mainFolder.ANDROID)
    await fs.mkdirSync(mainFolder.ANDROID)

    for (const {height, width, folder} of splashFolders) {
        await fs.mkdirSync(`${mainFolder.ANDROID}/${folder}`)
        await sharp(inputSplashPath)
            .resize(width, height)
            .toFile(`${mainFolder.ANDROID}/${folder}/splashscreen_image.png`, (err, info) => {
                const message = !err ? ' ✅ Success' : ' ⛔️ Error'
                console.log(message, 'created result', folder, {width, height})
            })
    }

    for (const {size, folder} of iconFolders) {
        await fs.mkdirSync(`${mainFolder.ANDROID}/${folder}`)
        for (const {name, round} of iconTypes) {
            await sharp(inputIconPath)
                .resize(size, size)
                .composite([{
                    input: getRoundedShape(size, round ? 100 : 10),
                    blend: 'dest-in'
                }])
                .toFile(`${mainFolder.ANDROID}/${folder}/${name}`, (err, info) => {
                    const message = !err ? ' ✅ Success' : ' ⛔️ Error'
                    console.log(message, 'created result', folder, {size})
                })
        }
    }

}

// startIos()
startAndroid()
