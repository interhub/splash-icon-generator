import sharp from 'sharp'


export const getRoundedShape = (width, height, radiusPercent) => {
    const radiusW = width * Number(radiusPercent) / 100
    const radiusH = height * Number(radiusPercent) / 100
    return Buffer.from(`
<svg><rect x="0" y="0" width="${width}" height="${height}" rx="${radiusW}" ry="${radiusH}"/></svg>
`)
}

export const createImage = async (inputPath, outputPath, width, height, roundPercent = 0) => {
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
