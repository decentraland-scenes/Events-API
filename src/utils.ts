export function splitTextIntoLines(text: string, maxLenght: number) {
  let finalText: string = ''
  for (let i = 0; i < text.length; i++) {
    let lines = finalText.split('\n')

    if (lines[lines.length - 1].length >= maxLenght && i !== text.length) {
      if (finalText[finalText.length - 1] !== ' ') {
        finalText = finalText.concat('-')
      }
      finalText = finalText.concat('\n')
    }

    finalText = finalText.concat(text[i])
  }

  return finalText
}

export function shortenText(text: string, maxLenght: number) {
  let finalText: string = ''

  if (text.length > maxLenght) {
    finalText = text.substring(0, maxLenght)
    finalText = finalText.concat('...')
  } else {
    finalText = text
  }

  return finalText
}
