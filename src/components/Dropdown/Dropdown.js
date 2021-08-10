import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import classNames from 'classnames'
import classes from './Dropdown.module.scss'

const DropdownComponent = (props) => {
  const [show, setShow] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const handleClose = () => {
    setShow(false)
  }

  const { componentClass, mainComponent, childrenComponent, customMenu, onToggle } = props

  return (
    <Dropdown
      show={show}
      onToggle={(show) => {
        setShow(show)

        if (onToggle) {
          onToggle(show)
        }
        setTimeout(() => {
          setShowMenu(show)
        }, 10)
      }}
      // drop='start'
    >
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        as={React.forwardRef(({ onClick }, ref) => (
          <div
            className={componentClass}
            ref={ref}
            onClick={(e) => {
              e.preventDefault();
              onClick(e);
            }}
          >
            { mainComponent }
          </div>
        ))}
      />
      <Dropdown.Menu className={classNames(classes.menu, customMenu)}>
        {showMenu && childrenComponent(handleClose)}
      </Dropdown.Menu>

    </Dropdown>

  )
}

export default DropdownComponent
