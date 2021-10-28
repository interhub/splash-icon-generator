import sharp from 'sharp'
import fileManipulator from 'file-manipulator'

const inputSplashPath = './splashscreen_image.png'
const inputIconPath = './icon.png'

const getRoundedShape = (width, height, radiusPercent) => {
    const radiusW = width * Number(radiusPercent) / 100
    const radiusH = height * Number(radiusPercent) / 100
    return Buffer.from(`
<svg><rect x="0" y="0" width="${width}" height="${height}" rx="${radiusW}" ry="${radiusH}"/></svg>
`)
}

const mainFolder = {
    IOS: 'ios',
    ANDROID: 'android'
}

// const iosIconFolderName = 'AppIcon.appiconset'

const iconTypes = [{name: 'ic_launcher_round.png', round: true}, {name: 'ic_launcher.png', round: false}]

const createImage = async (inputPath, outputPath, width, height, roundPercent = 0) => {
    return new Promise((ok) => {
        try {
            sharp(inputPath)
                .resize(width, height)
                .composite([{
                    input: getRoundedShape(width, height, roundPercent),
                    blend: 'dest-in'
                }])
                .toFile(outputPath, (err, info) => {
                    //info
                    ok(!err)
                })
        } catch (e) {
            console.log(e, 'err')
        }
    })
}


const startAndroid = async () => {
    await fileManipulator.delete.folder({name: mainFolder.ANDROID, path: './'})
    await fileManipulator.create.folder({name: mainFolder.ANDROID, path: './', replaceExisting: true})


    await fileManipulator.create.file({name: 'Contents', ext: 'json', path: './', replaceExisting: true, content: ''})


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
            const outPath = `${mainFolder.ANDROID}/${folder}/${name}`
            const roundPercent = round ? 100 : 10
            const result = await createImage(inputIconPath, outPath, size, size, roundPercent)
            const message = result ? ' ✅ Success' : ' ⛔️ Error'
            console.log(message, 'created result', folder, {size, round})
        }
    }

    for (const {height, width, folder} of customIconResizes) {
        await fileManipulator.create.folder({
            name: `${mainFolder.ANDROID}/${folder}`,
            path: './',
            replaceExisting: true
        })
        const outPath = `${mainFolder.ANDROID}/${folder}/splashscreen_image.png`
        const result = await createImage(inputIconPath, outPath, width, height, 0)
        const message = result ? ' ✅ Success' : ' ⛔️ Error'
        console.log(message, 'created result', folder, {width, height})
    }

}

// const startIos = async () => {
//     await fileManipulator.delete.folder({name: mainFolder.IOS, path: './'})
//     await fileManipulator.create.folder({name: mainFolder.IOS, path: './', replaceExisting: true})
//
//     for (const {height, width, folder} of splashFolders) {
//         await fileManipulator.create.folder({
//             name: `${mainFolder.ANDROID}/${folder}`,
//             path: './',
//             replaceExisting: true
//         })
//         const outPath = `${mainFolder.ANDROID}/${folder}/splashscreen_image.png`
//         const result = await createImage(inputSplashPath, outPath, width, height, 0)
//         const message = result ? ' ✅ Success' : ' ⛔️ Error'
//         console.log(message, 'created result', folder, {width, height})
//     }
//
//     for (const {size, folder} of iconFolders) {
//         await fileManipulator.create.folder({
//             name: `${mainFolder.ANDROID}/${folder}`,
//             path: './',
//             replaceExisting: true
//         })
//         for (const {name, round} of iconTypes) {
//             const outPath = `${mainFolder.ANDROID}/${folder}/${name}`
//             const roundPercent = round ? 100 : 10
//             const result = await createImage(inputIconPath, outPath, size, size, roundPercent)
//             const message = result ? ' ✅ Success' : ' ⛔️ Error'
//             console.log(message, 'created result', folder, {size, round})
//         }
//     }
//
//     for (const {height, width, folder} of customIconResizes) {
//         await fileManipulator.create.folder({
//             name: `${mainFolder.ANDROID}/${folder}`,
//             path: './',
//             replaceExisting: true
//         })
//         const outPath = `${mainFolder.ANDROID}/${folder}/splashscreen_image.png`
//         const result = await createImage(inputIconPath, outPath, width, height, 0)
//         const message = result ? ' ✅ Success' : ' ⛔️ Error'
//         console.log(message, 'created result', folder, {width, height})
//     }
// }

// startIos()
startAndroid()
