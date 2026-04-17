import { axiosClient } from '../../../core/api/axiosClient'
import { endpoints } from '../../../core/api/endpoints'

export const currencyService = {
  async list() {
    return axiosClient.get(`${endpoints.currency}`)
  },
}
