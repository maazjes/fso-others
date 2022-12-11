import { updateFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
    const handleChange = (event) => {
        props.updateFilter(event.target.value)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

const mapDispatchToProps = {
  updateFilter
}

const connectedFilter = connect(null, mapDispatchToProps)(Filter)
export default connectedFilter