export const isActive = (current,link)=>{
    return link == '/' ? current == link : current.startsWith(link || '/')
}