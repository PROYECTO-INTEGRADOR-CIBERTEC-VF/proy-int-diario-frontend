import { axiosClient } from '../../../core/api/axiosClient'
import { endpoints } from '../../../core/api/endpoints'

export const dashboardService = {
  async getSummary() {
    return axiosClient.get(`${endpoints.dashboard}/summary`)
  },
}
