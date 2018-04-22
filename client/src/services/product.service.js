import axios from '@/services/axios'
const edge = 'products'

function search (keywords) {
  return axios.get(`/${edge}`, {
    params: {
      keywords: keywords
    }
  })
    .then(response => {
      return response.data
    }, (err) => {
      console.log(err)
    })
}

export default {
  search
}
