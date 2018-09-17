import axios from './axios'

const apis = {
   getLatestProject(){
   	return axios.get(`/projectApplication/latestProject`) 	
   },
   getProjectBanner(){
   	return axios.get(`/projectApplication/projectBanner`) 	
   },
   getRecommendedProject(){
   	return axios.get(`/projectApplication/recommendedProject`) 	
   },
   getBaseData(){
   	  return axios.get(`/projectApplication/getBaseData`)
   },
   saveProjectApplication(params){
   	return axios.post(`/projectApplication/saveProjectApplicaton`,params)
   },
   findProductsScreen(params){
   	return axios.get(`/search/findProductsScreen`,{
   		params:params
   	})
   },
   searchProjectsSearch(params){
   	 return axios.get(`/search/projectsSearch`,{
      params: params
    })
   }   
}
export default apis
