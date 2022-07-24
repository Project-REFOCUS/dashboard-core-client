export const fontStyles = {
  fontFamily: "'Open Sans', sans-serif",
  fontSize: "14px",
  fontWeight: 400,
  fontStyle: "normal",
  lineHeight: "19px",
}

export function customFontStyles({ fontFamily, fontStyle, fontWeight, fontSize, lineHeight, color }){
  return {
    fontFamily,
    fontStyle,
    fontWeight,
    fontSize,
    lineHeight,
    color
  }
}