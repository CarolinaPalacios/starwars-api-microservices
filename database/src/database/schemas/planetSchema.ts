import { Schema } from 'mongoose'
import { IPlanet, IPlanetModel } from '../../types/types'

const planetSchema = new Schema<IPlanet, IPlanetModel>({
  _id: String,
  name: String,
  rotation_period: String,
  orbital_period: String,
  diameter: String,
  climate: String,
  gravity: String,
  terrain: String,
  surface_water: String,
  residents: [
    {
      type: String,
      ref: 'Character',
    },
  ],
  films: [
    {
      type: String,
      ref: 'Film',
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

planetSchema.statics.list = async function (skip = 0, limit = 10) {
  const total = await this.countDocuments({ isDeleted: false })
  const planets = await this.find({ isDeleted: false })
    .populate('residents', { _id: 1, name: 1 })
    .populate('films', {
      _id: 1,
      title: 1,
    })
    .skip(skip)
    .limit(limit)

  const currentPage = Math.floor(skip / limit) + 1
  const totalPages = Math.ceil(total / limit)
  const nextPage = currentPage < totalPages ? currentPage + 1 : null
  const prevPage = currentPage > 1 ? currentPage - 1 : null

  return {
    total,
    planets,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  }
}

planetSchema.statics.get = async function (id: string) {
  return await this.findById(id)
    .populate('residents', { _id: 1, name: 1 })
    .populate('films', {
      _id: 1,
      title: 1,
    })
}

planetSchema.statics.insert = async function (planet: IPlanet) {
  return await this.create(planet)
}

planetSchema.statics.update = async function (
  id: string,
  planetData: Partial<IPlanet>
) {
  return await this.findByIdAndUpdate(id, planetData, { new: true })
}

planetSchema.statics.delete = async function (id: string) {
  return await this.findByIdAndDelete(id)
}

planetSchema.statics.softDelete = async function (id: string) {
  return await this.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
}

export default planetSchema
