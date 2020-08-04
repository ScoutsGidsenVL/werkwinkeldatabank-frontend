import BaseRepository from './baseRepository'

export default class RepositoryFactory {
  private static repositoryInstances: any = {}

  public static get<T extends BaseRepository> (
    RepositoryClass: new (...params: any[]) => T
  ): T {
    let repository = this.repositoryInstances[RepositoryClass.prototype.id]

    if (!repository) {
      RepositoryClass.prototype.id = this.generateUUID()
      repository = new RepositoryClass()
      this.repositoryInstances[RepositoryClass.prototype.id] = repository
    }

    return repository
  }

  private static generateUUID (): string {
    let dt = new Date().getTime()
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (dt + Math.random() * 16) % 16 | 0
      dt = Math.floor(dt / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
  }
}
