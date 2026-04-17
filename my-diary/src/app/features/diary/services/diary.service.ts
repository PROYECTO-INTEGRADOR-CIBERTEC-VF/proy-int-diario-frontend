import { axiosClient } from '../../../core/api/axiosClient'
import { endpoints } from '../../../core/api/endpoints'

export const diaryService = {
  async list() {
    return axiosClient.get(`${endpoints.diary}`)
  },
}
