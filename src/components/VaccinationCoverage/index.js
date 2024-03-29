// Write your code here
import {BarChart, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {coverageDetailsData} = props

  const dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="coverage-container">
      <h2 className="coverage-h1">Vaccination Coverage</h2>
      <BarChart width={1000} height={300} data={coverageDetailsData}>
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: '#6c757d',
            strokeWidth: 0.5,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <YAxis tickFormatter={dataFormatter} />
        <Tooltip />
        <Legend
          wrapperStyle={{
            paddingTop: 20,
            textAlign: 'center',
            fontSize: 12,
            fontFamily: 'Roboto',
          }}
        />
        <Bar
          dataKey="dose1"
          name="Dose1"
          barSize={505}
          fill="#5a8dee"
          radius={[5, 5, 0, 0]}
        />
        <Bar
          dataKey="dose2"
          name="Dose2"
          barSize={505}
          fill="#f54394"
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
