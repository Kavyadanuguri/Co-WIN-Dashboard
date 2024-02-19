// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {genderDetailsData} = props

  return (
    <div className="gender-container">
      <h2 className="gender-h1">Vaccination by gender</h2>

      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="60%"
          data={genderDetailsData}
          startAngle={0}
          endAngle={180}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill="#2cc6c6" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="others" fill="#f54394" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
