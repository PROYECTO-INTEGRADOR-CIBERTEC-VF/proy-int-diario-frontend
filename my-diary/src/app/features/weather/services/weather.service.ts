import { axiosClient } from '../../../core/api/axiosClient'
import { endpoints } from '../../../core/api/endpoints'

export const weatherService = {
  async list() {
    return axiosClient.get(`${endpoints.weather}`)
  },
}
