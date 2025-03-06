import useForm from '../../shared/useform/useform'
import styles from './ItemForm.module.scss'
import Button from '../../shared/buttons'
import { useNavigate } from 'react-router-dom'

function ItemForm(props) {
  
  const navigate = useNavigate()

  const submit = () => {
     let storedValues = Object.assign({}, values)  
     
     storedValues.id = storedValues.id ? storedValues.id : crypto.randomUUID()  

     props.onItemSubmit(storedValues) 
     navigate(-1)  
  }

  const initialState = props.formData ? props.formData : {
    type: "",
    duration: "",         
    exerciseDate: "",    
    comment: "",         
    rating: "",          
  }

  const { values, handleChange, handleSubmit } = useForm(submit, initialState, false)

  const handleCancel = () => {
    navigate(-1)
  }

  const handleDelete = () => {
    props.onItemDelete(values.id)
    navigate(-1)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.itemform}>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='type'>Exercise type</label>
              <select id='type' name='type' onChange={handleChange} value={values.type}>
              <option value="">(select)</option>
              <option value='rest day'>rest day</option>
                <option value='walking'>walking</option>
                <option value='lunging'>lunging</option>
                <option value='groundwork'>groundwork</option>
               

                <option value='light work out'>light work out</option>
                <option value='regular work out'>regular work out</option>
                <option value="intense work out">intense work out</option>
               
                <option value="trail work out">trail work out</option>
                <option value="light trail"> light trail</option>
                <option value="regular trail">regular trail</option>
                <option value="intense trail">intense trail</option>

                <option value="coaching session">coaching session</option>
                <option value="jumping coaching">jumping coaching</option>
                <option value="dressage coaching">dressage coaching</option>
                <option value="eventing coaching">eventing coaching</option>
                <option value="driving coaching">driving coaching</option>

                <option value='light pole exercise'>light pole exercise</option>
                <option value='regular pole exercise'>regular pole exercise</option>
                <option value='intense pole exercise'>intense pole exercise</option>
               
                <option value='light s-jumping'>light s-jumping</option>
                <option value='normal s-jumping'>normal s-jumping</option>
                <option value='intense s-jumping'>intense s-jumping</option>

                    
              
                <option value='cross country jumping'>cross country jumping</option>
               
                <option value='competitions'>competitions</option>
                <option value='s-jumping competitions'>show jumping competitions</option>
                <option value='eventing competitions'>eventing competitions</option>
                <option value='driving competitions'>driving competitions</option>
                <option value='dressage competitions'>dressage competitions</option>
                <option value='trotting race'>trotting race</option>

           
                <option value='light driving'>light driving</option>
                <option value='regular driving'>regular driving</option>
                <option value='intense driving'>intense driving</option>
  {props.typelist.map(type => <option key={type} value={type}>{type}</option>)}
</select>

            </div>
          </div>
         
       

          <div className={styles.itemform_row}>
            <div>
            
              <label htmlFor='duration'>Duration</label>
              <input 
                id='duration' 
                type='number' 
                name='duration' 
                step='5' 
                onChange={handleChange} 
                value={values.duration} 
              />
            </div>
            </div>
            
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='exerciseDate'>Exercise date</label>
              <input 
                id='exerciseDate' 
                type='date' 
                name='exerciseDate' 
                onChange={handleChange} 
                value={values.exerciseDate} 
              />
            </div>
          </div>

          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='rating'>Rating</label>
              <select 
                id='rating' 
                name='rating' 
                onChange={handleChange} 
                value={values.rating}>
                <option value="">(select)</option>
                <option value='went really well'>really well</option>
                <option value='fairly well'>fairly well</option>
                <option value='normally'>normally</option>
                <option value="not so well">not so well</option>
                <option value="not well at all">not well at all</option>
                
  
              </select>
            </div>
          </div>

          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='comment'>Comment</label>
              <textarea 
                id='comment' 
                name='comment' 
                onChange={handleChange} 
                value={values.comment} 
              />
            </div>
          </div>

          <div className={styles.itemform_row}>
            <div>
              <Button onClick={handleCancel}>CANCEL</Button>
            </div>
            <div>
              <Button 
                primary
                disabled={values.type && values.duration && values.exerciseDate ? "" : "true"}
                type='submit'>
                { props.formData ? "SAVE" : "ADD" }
              </Button>
            </div>
          </div>

          { props.onItemDelete ? 
            <div className={styles.itemform_row}>
              <div>
                <Button secondary onClick={handleDelete}>DELETE</Button>
              </div>
            </div>
            : null }
        </div>
      </form>
    </div>
  )
}

export default ItemForm
