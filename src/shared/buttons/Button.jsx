import styles from './buttons.module.scss'
import clsx from 'clsx'


function Button({className, primary, secondary, ...props}) {
  return (
   
    <button type='button'
            className={clsx(
              styles.button,
              className,
              primary && styles.button_primary,
              secondary && styles.button_secondary
            )}
            {...props} />
  )
}

export { Button as default, Button }