import { getModule } from 'vuex-module-decorators'

export const useEnum = (currentEnum: any) => {

  const getTypesArray = () : String[] => {
    let returnArray : String[] = []
    Object.keys(currentEnum).forEach((key: any) => returnArray.push(currentEnum[key]))
    return returnArray
  }

  const convertType = (inputType: string): string | undefined => {
    let type : undefined | string
    Object.keys(currentEnum).forEach((key: any) => {
      if (currentEnum[key] === inputType) {
        type = key
      }
    })

    return type
  }

  return {
    getTypesArray,
    convertType
  }

}
