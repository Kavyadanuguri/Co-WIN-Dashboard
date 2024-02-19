// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const stages = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'LOADING',
}

class CowinDashboard extends Component {
  state = {
    stageValue: stages.progress,
    fetchedData: {},
  }

  componentDidMount() {
    this.getCoverageData()
  }

  getCoverageData = async () => {
    this.setState({stageValue: stages.progress})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok === true) {
      this.setState({stageValue: stages.success})
      const data = await response.json()
      console.log(data)

      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachVaccine => ({
          dose1: eachVaccine.dose_1,
          dose2: eachVaccine.dose_2 * eachVaccine.dose_2,
          vaccineDate: eachVaccine.vaccine_date,
        })),
        vaccinationByAge: data.vaccination_by_age.map(eachAge => ({
          age: eachAge.age,
          count: eachAge.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(each => ({
          gender: each.gender,
          count: each.count,
        })),
      }

      this.setState({
        fetchedData: updatedData,
      })
    } else {
      this.setState({stageValue: stages.failure})
    }
  }

  renderSuccess = () => {
    const {fetchedData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = fetchedData
    return (
      <>
        <VaccinationCoverage coverageDetailsData={last7DaysVaccination} />
        <VaccinationByGender genderDetailsData={vaccinationByGender} />
        <VaccinationByAge ageDetailsData={vaccinationByAge} />
      </>
    )
  }

  renderLoadingView = props => {
    console.log(props)
    return (
      <div className="loader" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    )
  }

  renderFailureView = props => {
    console.log(props)

    return (
      <div className="failure-container">
        <img
          className="failure-img"
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
          alt="failure view"
        />
        <h1 className="failure-h1">Something went wrong</h1>
      </div>
    )
  }

  renderStages = () => {
    const {stageValue} = this.state

    switch (stageValue) {
      case stages.success:
        return this.renderSuccess()
      case stages.failure:
        return this.renderFailureView()
      case stages.progress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-con1">
          <img
            className="dashboard-img1"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          />
          <h2 className="dashboard-h2">Co-WIN</h2>
        </div>
        <h1 className="dashboard-h1">CoWIN Vaccination in India</h1>
        {this.renderStages()}
      </div>
    )
  }
}

export default CowinDashboard
