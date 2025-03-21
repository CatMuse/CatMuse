export interface ColorScheme {
  light: string
  lightgray: string
  gray: string
  darkgray: string
  dark: string
  secondary: string
  tertiary: string
  highlight: string
  textHighlight: string
}

interface Colors {
  lightMode: ColorScheme
  darkMode: ColorScheme
}

export type FontSpecification =
  | string
  | {
      name: string
      weights?: number[]
      includeItalic?: boolean
    }

export interface Theme {
  typography: {
    title?: FontSpecification
    header: FontSpecification
    body: FontSpecification
    code: FontSpecification
  }
  cdnCaching: boolean
  colors: Colors
  fontOrigin: "googleFonts" | "local"
}

export type ThemeKey = keyof Colors

const DEFAULT_SANS_SERIF =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
const DEFAULT_MONO = "ui-monospace, SFMono-Regular, SF Mono, Menlo, monospace"

export function getFontSpecificationName(spec: FontSpecification): string {
  if (typeof spec === "string") {
    return spec
  }

  return spec.name
}

function formatFontSpecification(
  type: "title" | "header" | "body" | "code",
  spec: FontSpecification,
) {
  if (typeof spec === "string") {
    spec = { name: spec }
  }

  const defaultIncludeWeights = type === "header" ? [400, 700] : [400, 600]
  const defaultIncludeItalic = type === "body"
  const weights = spec.weights ?? defaultIncludeWeights
  const italic = spec.includeItalic ?? defaultIncludeItalic

  const features: string[] = []
  if (italic) {
    features.push("ital")
  }

  if (weights.length > 1) {
    const weightSpec = italic
      ? weights
          .flatMap((w) => [`0,${w}`, `1,${w}`])
          .sort()
          .join(";")
      : weights.join(";")

    features.push(`wght@${weightSpec}`)
  }

  if (features.length > 0) {
    return `${spec.name}:${features.join(",")}`
  }

  return spec.name
}

export function googleFontHref(theme: Theme) {
  const { code, header, body } = theme.typography
  return `https://fonts.googleapis.com/css2?family=${code}&family=${header}:wght@400;700&family=${body}:ital,wght@0,350;0,600;1,400;1,600&display=swap`
}

export function googleFontSubsetHref(theme: Theme, title: string) {
  // Create a subset of the font for the page title
  // This is used to optimize font loading for the page title
  const titleFont = theme.typography.title || theme.typography.header
  const formattedFont = formatFontSpecification("title", titleFont)
  
  // Encode the title for use in the URL
  const encodedTitle = encodeURIComponent(title)
  
  return `https://fonts.googleapis.com/css2?family=${formattedFont}&text=${encodedTitle}&display=swap`
}

interface FontFile {
  url: string
  filename: string
  extension: string
}

export async function processGoogleFonts(
  stylesheet: string,
  baseUrl: string
): Promise<{ processedStylesheet: string; fontFiles: FontFile[] }> {
  const fontFiles: FontFile[] = []
  
  // Extract font URLs from the stylesheet
  const fontUrlRegex = /url\((.+?)\)/g
  let match
  let processedStylesheet = stylesheet
  
  while ((match = fontUrlRegex.exec(stylesheet)) !== null) {
    const fontUrl = match[1].replace(/["']/g, '')
    
    // Skip data URLs
    if (fontUrl.startsWith('data:')) continue
    
    // Generate a filename for the font file
    const urlParts = fontUrl.split('/')
    const filename = urlParts[urlParts.length - 1]
    
    // Determine the file extension
    const extension = filename.split('.').pop() || 'woff2'
    
    // Add the font file to the list
    fontFiles.push({
      url: fontUrl,
      filename,
      extension
    })
    
    // Replace the URL in the stylesheet
    const newUrl = `/static/fonts/${filename}`
    processedStylesheet = processedStylesheet.replace(
      fontUrl,
      `${baseUrl}${newUrl}`
    )
  }
  
  return { processedStylesheet, fontFiles }
}

export function joinStyles(theme: Theme, ...stylesheet: string[]) {
  return `
${stylesheet.join("\n\n")}

:root {
  --light: ${theme.colors.lightMode.light};
  --lightgray: ${theme.colors.lightMode.lightgray};
  --gray: ${theme.colors.lightMode.gray};
  --darkgray: ${theme.colors.lightMode.darkgray};
  --dark: ${theme.colors.lightMode.dark};
  --secondary: ${theme.colors.lightMode.secondary};
  --tertiary: ${theme.colors.lightMode.tertiary};
  --highlight: ${theme.colors.lightMode.highlight};
  --textHighlight: ${theme.colors.lightMode.textHighlight};

  --titleFont: "${getFontSpecificationName(theme.typography.title || theme.typography.header)}", ${DEFAULT_SANS_SERIF};
  --headerFont: "${getFontSpecificationName(theme.typography.header)}", ${DEFAULT_SANS_SERIF};
  --bodyFont: "${getFontSpecificationName(theme.typography.body)}", ${DEFAULT_SANS_SERIF};
  --codeFont: "${getFontSpecificationName(theme.typography.code)}", ${DEFAULT_MONO};
}

:root[saved-theme="dark"] {
  --light: ${theme.colors.darkMode.light};
  --lightgray: ${theme.colors.darkMode.lightgray};
  --gray: ${theme.colors.darkMode.gray};
  --darkgray: ${theme.colors.darkMode.darkgray};
  --dark: ${theme.colors.darkMode.dark};
  --secondary: ${theme.colors.darkMode.secondary};
  --tertiary: ${theme.colors.darkMode.tertiary};
  --highlight: ${theme.colors.darkMode.highlight};
  --textHighlight: ${theme.colors.darkMode.textHighlight};
}
`
}
