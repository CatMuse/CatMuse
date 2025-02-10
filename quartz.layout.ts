import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: 'giscus',
      options: {
        // from data-repo
        repo: 'CatMuse/CatMuse',
        // from data-repo-id
        repoId: 'R_kgDON1wDZg',
        // from data-category
        category: 'Announcements',
        // from data-category-id
        categoryId: 'DIC_kwDON1wDZs4Cmywd',
        themeUrl: "https://catmuse.me/static/giscus", // corresponds to quartz/static/giscus/
        lightTheme: "light-theme", // corresponds to light-theme.css in quartz/static/giscus/
        darkTheme: "dark-theme", // corresponds to dark-theme.css quartz/static/giscus/
      }
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/CatMuse",
      RSS: "https://catmuse.me/index.xml",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    // Component.Explorer(),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Recent Writing",
        limit: 4,
        filter: (f) =>
          f.slug!.startsWith("Posts/") && f.slug! !== "Posts/index" && !f.frontmatter?.noindex,
        linkToMore: "Posts/" as SimpleSlug,
      }),
    ),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Recent Notes",
        limit: 2,
        filter: (f) => f.slug!.startsWith("Thoughts/"),
        linkToMore: "Thoughts/" as SimpleSlug,
      }),
    ),
    Component.DesktopOnly(Component.TableOfContents()),
  ],
  right: [
    Component.Graph({
      localGraph: {
        showTags: false,
      },
      globalGraph: {
        showTags: false,
      },
    }),
    // Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    // Component.Explorer(),
  ],
  right: [],
}
