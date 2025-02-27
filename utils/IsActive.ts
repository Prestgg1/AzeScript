export const isActive = (current: string, link: string) => {
    return link == '/' ? current == link : current.startsWith(link || '/')
}