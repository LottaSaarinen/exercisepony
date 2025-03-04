import styles from './buttons.module.scss'
import clsx from 'clsx'

function ButtonContainer({className, children, ...props}) {
  return (
    <div className={clsx(
           styles.button_container,
           className
         )}
         {...props} >
      { children }
    </div>
  )
}

export { ButtonContainer as default, ButtonContainer }