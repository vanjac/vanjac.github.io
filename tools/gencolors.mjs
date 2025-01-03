import * as fs from 'node:fs';
// Generate link colors for the navigation sidebar

// https://twitter.com/jon_barron/status/1388233935641976833
// https://basecase.org/env/on-rainbows
// https://krazydad.com/tutorials/makecolors.php
let numColors = process.argv[2]
let f = x => Math.floor(Math.sin(Math.PI * x)**2 * 230).toString(16).toUpperCase().padStart(2, '0')
let css = ''
for (let i = 0; i < numColors; i++) {
    let h = i / numColors
    let r = f(3/6 - h), g = f(5/6 - h), b = f(7/6 - h)
    let className = '.link-color' + i
    css += `${className}:hover {
    background-color: #${r}${g}${b};
}
${className}:target {
    background-color: #${r}${g}${b};
}
`
}

fs.writeFileSync('colors.css', css)
