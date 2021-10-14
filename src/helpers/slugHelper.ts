const slugify = require('slugify')

export const useSlugify = (): {
  getSluggedTitle: (title: string) => string,
} => {


  const getSluggedTitle = (title: string): string => {
    const sluggedTitle: string = slugify(title).toLowerCase()
    return sluggedTitle
  }

  return {
    getSluggedTitle
  }
}
