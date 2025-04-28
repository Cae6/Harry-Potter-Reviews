import axios from "axios";

class HpottersDataService {


  getAll(page = 0) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/cae6/Hpotters?page=${page}`
    );
  }
  get(id) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/cae6/Hpotters/id/${id}`
    );
  }

  getSpecies() {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/cae6/Hpotters/species`
    );
  }
  
  find(query, by = "name", page = 0) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/cae6/Hpotters?${by}=${query}&page=${page}`
    )
  }

  createAnalysis(data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/cae6/Hpotters/analysis`, data)
  }

  updateAnalysis(data) {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/cae6/Hpotters/analysis`, data)
  }
  deleteAnalysis(id, userId) {
    return axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/cae6/Hpotters/analysis`,
      { data: { analysis_id: id, user_id: userId } }
    )
  }

}
export default new HpottersDataService();
//Chizorom Ekweghariri
//4/28/25
// IT302-452
//cae6@njit.edu
//IT-302 Phase 5