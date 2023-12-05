import { Schema, SchemaTypeOptions } from 'mongoose'
import { Director } from '../../types/enum'
import { IFilm, IFilmModel } from '../../types/types'

const filmSchema = new Schema<IFilm, IFilmModel>({
  _id: String,
  title: String,
  opening_crawl: String,
  director: {
    type: String,
    enum: Object.values(Director) as SchemaTypeOptions<string>['enum'],
  },
  producer: String,
  release_date: Date,
  characters: [
    {
      type: String,
      ref: 'Character',
    },
  ],
  planets: [
    {
      type: String,
      ref: 'Planet',
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

filmSchema.statics.list = async function (skip = 0, limit = 10) {
  const total = await this.countDocuments({ isDeleted: false })
  const films = await this.find({ isDeleted: false })
    .populate('characters', { _id: 1, name: 1 })
    .populate('planets', { _id: 1, name: 1 })
    .skip(skip)
    .limit(limit)

  const currentPage = Math.floor(skip / limit) + 1
  const totalPages = Math.ceil(total / limit)
  const nextPage = currentPage < totalPages ? currentPage + 1 : null
  const prevPage = currentPage > 1 ? currentPage - 1 : null

  return {
    total,
    films,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  }
}

filmSchema.statics.get = async function (id: string) {
  return await this.findById(id)
    .populate('characters', { _id: 1, name: 1 })
    .populate('planets', { _id: 1, name: 1 })
}

filmSchema.statics.insert = async function (film: IFilm) {
  return await this.create(film)
}

filmSchema.statics.update = async function (
  id: string,
  filmData: Partial<IFilm>
) {
  return await this.findByIdAndUpdate(id, filmData, { new: true })
}

filmSchema.statics.delete = async function (id: string) {
  return await this.findByIdAndDelete(id)
}

filmSchema.statics.softDelete = async function (id: string) {
  return await this.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
}

export default filmSchema
