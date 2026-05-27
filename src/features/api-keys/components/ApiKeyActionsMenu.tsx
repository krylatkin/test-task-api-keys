import MoreHorizRounded from '@mui/icons-material/MoreHorizRounded'
import DriveFileRenameOutlineRounded from '@mui/icons-material/DriveFileRenameOutlineRounded'
import BlockRounded from '@mui/icons-material/BlockRounded'
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded'
import { useId, useState } from 'react'

type ApiKeyActionsMenuProps = {
  itemName: string
  onEdit: () => void
  onDisable: () => void
  onDelete: () => void
}

export function ApiKeyActionsMenu({
  itemName,
  onEdit,
  onDisable,
  onDelete,
}: ApiKeyActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuId = useId()

  function closeMenu() {
    setIsOpen(false)
  }

  function handleAction(action: () => void) {
    action()
    closeMenu()
  }

  return (
    <div
      className="table-actions"
      data-open={isOpen}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          closeMenu()
        }
      }}
    >
      <button
        type="button"
        className="table-actions__trigger"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-label={`Open actions for ${itemName}`}
        onClick={(event) => {
          event.stopPropagation()
          setIsOpen((current) => !current)
        }}
      >
        <MoreHorizRounded fontSize="small" />
      </button>

      {isOpen ? (
        <div
          id={menuId}
          role="menu"
          className="menu"
          aria-label={`Actions for ${itemName}`}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            role="menuitem"
            className="menu__item"
            onClick={() => handleAction(onEdit)}
          >
            <DriveFileRenameOutlineRounded fontSize="small" />
            Edit
          </button>
          <button
            type="button"
            role="menuitem"
            className="menu__item"
            onClick={() => handleAction(onDisable)}
          >
            <BlockRounded fontSize="small" />
            Disable
          </button>
          <button
            type="button"
            role="menuitem"
            className="menu__item menu__item--danger"
            onClick={() => handleAction(onDelete)}
          >
            <DeleteOutlineRounded fontSize="small" />
            Delete
          </button>
        </div>
      ) : null}
    </div>
  )
}
