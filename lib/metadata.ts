export const HOME_TITLE = "codewitch's laboratory"
export const PAGE_SUFFIX = ` | ${HOME_TITLE}`

export function buildPageTitle(title: string) {
  return `${title}${PAGE_SUFFIX}`
}

export function extractPageTitle(title: string) {
  return title.replace(PAGE_SUFFIX, "")
}
