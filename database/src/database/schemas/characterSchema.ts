import { Schema, SchemaTypeOptions } from 'mongoose'
import { Gender } from '../../types/enum'
import { ICharacter, ICharacterModel } from '../../types/types'

const characterSchema = new Schema<ICharacter, ICharacterModel>({
  _id: String,
  name: String,
  height: String,
  mass: String,
  hair_color: String,
  skin_color: String,
  eye_color: String,
  birth_year: String,
  gender: {
    type: String,
    enum: Object.values(Gender) as SchemaTypeOptions<string>['enum'],
  },
  homeworld: {
    type: String,
    ref: 'Planet',
  },
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

characterSchema.statics.list = async function (skip = 0, limit = 10) {
  const total = await this.countDocuments({ isDeleted: false })
  const characters = await this.find({ isDeleted: false })
    .populate('homeworld', { _id: 1, name: 1 })
    .populate('films', { _id: 1, title: 1 })
    .skip(skip)
    .limit(limit)

  const currentPage = Math.floor(skip / limit) + 1
  const totalPages = Math.ceil(total / limit)
  const nextPage = currentPage < totalPages ? currentPage + 1 : null
  const prevPage = currentPage > 1 ? currentPage - 1 : null

  return {
    total,
    characters,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  }
}

characterSchema.statics.get = async function (id: string) {
  return await this.findById(id, { isDeleted: false })
    .populate('homeworld', { _id: 1, name: 1 })
    .populate('films', {
      _id: 1,
      title: 1,
    })
}

characterSchema.statics.insert = async function (character: ICharacter) {
  return await this.create(character)
}

characterSchema.statics.update = async function (
  id: string,
  characterData: Partial<ICharacter>
) {
  return await this.findByIdAndUpdate(id, characterData, { new: true })
}

characterSchema.statics.delete = async function (id: string) {
  return await this.findByIdAndDelete(id)
}

characterSchema.statics.softDelete = async function (id: string) {
  return await this.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
}

characterSchema.statics.filterBy = async function (
  type: 'gender' | 'name',
  value: string,
  skip = 0,
  limit = 10
) {
  let total
  let characters
  if (type === 'gender') {
    total = await this.countDocuments({
      gender: value,
      isDeleted: false,
    })
    characters = await this.find({
      gender: value,
      isDeleted: false,
    })
      .populate('homeworld', {
        _id: 1,
        name: 1,
      })
      .populate('films', {
        _id: 1,
        title: 1,
      })
      .skip(skip)
      .limit(limit)
  } else if (type === 'name') {
    total = await this.countDocuments({
      name: { $regex: value, $options: 'i' },
      isDeleted: false,
    })
    characters = await this.find({
      name: { $regex: value, $options: 'i' },
      isDeleted: false,
    })
      .populate('homeworld', {
        _id: 1,
        name: 1,
      })
      .populate('films', {
        _id: 1,
        title: 1,
      })
      .skip(skip)
      .limit(limit)
  }

  const currentPage = Math.floor(skip / limit) + 1
  const totalPages = Math.ceil(total! / limit)
  const nextPage = currentPage < totalPages ? currentPage + 1 : null
  const prevPage = currentPage > 1 ? currentPage - 1 : null

  return {
    total,
    characters,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  }
}

export default characterSchema
