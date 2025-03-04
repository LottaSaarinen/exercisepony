import styles from './buttons.module.scss'
import clsx from 'clsx'
import Button from './Button.jsx'

function FloatingButton({className, ...props}) {
  return (
    <Button className={clsx(
              styles.button_floating,
              className
            )}
            {...props} />
  )
}

export { FloatingButton as default, FloatingButton }