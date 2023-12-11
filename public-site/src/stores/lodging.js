import { API_URL } from '../../config/api'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useLodgingStore = defineStore('lodging', {
  state: () => {
    return {
      // mirip dengan data di component
      dataLodgings: [],
      dataBookmarks: [],
      dataDetailLodging: [],
      qrcode: '',
      isBookmark: false
    }
  },
  getters: {
    // mirip dengan computed di component
  },
  actions: {
    async getLodgings({ page = 1, name, location, pmin, pmax } = {}) {
      try {
        const params = {
          page: page,
          name: name || '',
          location: location || '',
          pmin: pmin || 0,
          pmax: pmax || 0
        }

        const { data } = await axios.get(API_URL + '/public/lodgings', {
          params: params
        })

        this.dataLodgings = data
        // console.log(this.dataLodgings)
      } catch (error) {
        console.log(error)
      }
    },

    async getBookmark() {
      try {
        const { data } = await axios.get(API_URL + '/public/lodgings/bookmark', {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        this.dataBookmarks = data.getBookmark
      } catch (error) {
        console.log(error)
      }
    },

    async getDetailLodging(id) {
      try {
        const { data } = await axios.get(API_URL + `/public/lodgings/bookmark/${id}`, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        // console.log(data, '<<<< data Detail Lodging in Store')
        this.dataDetailLodging = data.getLodging
        this.qrcode = data.qrcode
      } catch (error) {
        console.log(error)
      }
    },

    async postBookmark(id) {
      try {
        const { data } = await axios.post(API_URL + `/public/lodgings/bookmark/${id}`, null, {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        this.isBookmark = true
      } catch (error) {
        console.log(error)
      }
    }
  }
})
