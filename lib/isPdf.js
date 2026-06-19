import path from "node:path"

export default function isPdf (file) {
    const ext = path.extname(file)
    return /(pdf)$/gi.test(ext)
}