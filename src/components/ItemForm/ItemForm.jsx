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
              <label htmlFor='type'>Treenityyppi</label>
              <select id='type' name='type' onChange={handleChange} value={values.type}>
              <option value="">(valitse)</option>
              <option value='vapaapäivä'>vapaapäivä</option>
                <option value='kävely'>kävely</option>
                <option value='juoksutus'>juoksutus</option>
                <option value='maastatyöskentely'>maastatyöskentely</option>
               

                <option value='kevyt treeni'>kevyt treeni</option>
                <option value='normaali treeni'>normaali treeni</option>
                <option value="raskas treeni">raskas treeni</option>
               
                <option value="maastoilu">maastoilu</option>
                <option value="kevyt maastoilu">kevyt maastoilu</option>
                <option value="normaali maastoilu">normaali maastoilu</option>
                <option value="raskas maastoilu">raskas maastoilu</option>

                <option value="valmennus">valmennus</option>
                <option value="estevalmennus">estevalmennus</option>
                <option value="kouluvalmennus">kouluvalmennus</option>
                <option value="kenttävalmennus">kenttävalmennus</option>
                <option value="valjakkovalmennus">valjakkovalmennus</option>

                <option value='kevyt puomityöskentely'>kevyt puomityöskentely</option>
                <option value='normaali puomityöskentely'>normaali puomityöskentely</option>
                <option value='raskas puomityöskentely'>raskas puomityöskentely</option>
               
                <option value='kevyt estetyöskentely'>estetyöskentely</option>
                <option value='normaali estetyöskentely'>normaali estetyöskentely</option>
                <option value='raskas estetyöskentely'>raskas estetyöskentely</option>

                <option value='kilpailut'>kilpailut</option>
                <option value='estekilpailut'>estekilpailut</option>
                <option value='kenttäkilpailut'>kenttäkilpailut</option>
                <option value='valjakkokilpailut'>valjakkokilpailut</option>
                <option value='koulukilpailut'>koulukilpailut</option>
                <option value='ravikilpailut'>ravikilpailut</option>

           
                <option value='kevyt ajaminen'>kevyt ajaminen</option>
                <option value='normaali ajaminen'>normaali ajaminen</option>
                <option value='raskas ajaminen'>raskas ajaminen</option>
  {props.typelist.map(type => <option key={type} value={type}>{type}</option>)}
</select>

            </div>
          </div>
         
       

          <div className={styles.itemform_row}>
            <div>
            
              <label htmlFor='duration'>treeniin käytetty aika</label>
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
              <label htmlFor='exerciseDate'>pvm</label>
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
              <label htmlFor='rating'>Arvio</label>
              <select 
                id='rating' 
                name='rating' 
                onChange={handleChange} 
                value={values.rating}>
                <option value="">(valitse)</option>
                <option value='sujui tosi hyvin'>sujui tosi hyvin</option>
                <option value='sujui melko hyvin'>sujui melko hyvin</option>
                <option value='sujui normaalisti'>sujui normaalisti</option>
                <option value="ei sujunut kovin hyvin">ei sujunut kovin hyvin</option>
                <option value="ei sujunut ollenkaan hyvin">ei sujunut ollenkaan hyvin</option>
                
  
              </select>
            </div>
          </div>

          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='comment'>Kommentti</label>
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
              <Button onClick={handleCancel}>PERUUTA</Button>
            </div>
            <div>
              <Button 
                primary
                disabled={values.type && values.duration && values.exerciseDate ? "" : "true"}
                type='submit'>
                { props.formData ? "TALLENNA" : "LISÄÄ" }
              </Button>
            </div>
          </div>

          { props.onItemDelete ? 
            <div className={styles.itemform_row}>
              <div>
                <Button secondary onClick={handleDelete}>POISTA</Button>
              </div>
            </div>
            : null }
        </div>
      </form>
    </div>
  )
}

export default ItemForm
