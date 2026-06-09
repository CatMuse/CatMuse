import fs from "fs"
import path from "path"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { BuildCtx } from "./quartz/util/ctx"
import { FilePath, FullSlug, joinSegments, resolveRelative } from "./quartz/util/path"

const config = await loadQuartzConfig()

const writeLegacyRedirect = async (
  ctx: BuildCtx,
  legacySlug: FullSlug,
  canonicalSlug: FullSlug,
): Promise<FilePath> => {
  const redirectUrl = resolveRelative(legacySlug, canonicalSlug)
  const outputPath = joinSegments(ctx.argv.output, `${legacySlug}.html`) as FilePath
  await fs.promises.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.promises.writeFile(
    outputPath,
    `<!doctype html>
<html lang="${ctx.cfg.configuration.locale}">
<head>
<title>${canonicalSlug}</title>
<link rel="canonical" href="${redirectUrl}">
<meta name="robots" content="noindex">
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=${redirectUrl}">
</head>
</html>
`,
  )
  return outputPath
}

const legacyV4Slug = (relativePath: FilePath): FullSlug => {
  let slug = relativePath.replace(/\.md$/, "")
  slug = slug.replace(/_index$/, "index")
  slug = slug.replace(/\s/g, "-").replace(/&/g, "-and-").replace(/%/g, "-percent")
  return slug as FullSlug
}

config.plugins.emitters.push({
  name: "CatMuseLegacyRedirects",
  async *emit(ctx, content) {
    for (const [_tree, file] of content) {
      const relativePath = file.data.relativePath as FilePath | undefined
      const canonicalSlug = file.data.slug as FullSlug | undefined
      if (!relativePath || !canonicalSlug) continue

      const legacySlug = legacyV4Slug(relativePath)
      if (legacySlug === canonicalSlug) continue

      yield writeLegacyRedirect(ctx, legacySlug, canonicalSlug)
    }
  },
  async *partialEmit(ctx, _content, _resources, changeEvents) {
    for (const changeEvent of changeEvents) {
      if (changeEvent.type === "delete" || !changeEvent.file) continue
      const relativePath = changeEvent.file.data.relativePath as FilePath | undefined
      const canonicalSlug = changeEvent.file.data.slug as FullSlug | undefined
      if (!relativePath || !canonicalSlug) continue

      const legacySlug = legacyV4Slug(relativePath)
      if (legacySlug === canonicalSlug) continue

      yield writeLegacyRedirect(ctx, legacySlug, canonicalSlug)
    }
  },
})

export default config
export const layout = await loadQuartzLayout()
