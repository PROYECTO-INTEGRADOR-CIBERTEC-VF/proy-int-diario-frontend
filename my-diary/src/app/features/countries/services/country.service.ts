import { axiosClient } from '../../../core/api/axiosClient'
import { endpoints } from '../../../core/api/endpoints'

export const countryService = {
  async list() {
    return axiosClient.get(`${endpoints.countries}`)
  },
}
