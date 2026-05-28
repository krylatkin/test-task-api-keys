import './ApiKeyActionsMenu.css';
import MoreVertRounded from '@mui/icons-material/MoreVertRounded';
import { useId, useState } from 'react';
import type { ApiKeyStatus } from '../../model/apiKeys.types';

type ApiKeyActionsMenuProps = {
  itemName: string;
  itemStatus: ApiKeyStatus;
  onEdit: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
};

export function ApiKeyActionsMenu({
  itemName,
  itemStatus,
  onEdit,
  onToggleStatus,
  onDelete,
}: ApiKeyActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const toggleLabel = itemStatus === 'revoked' ? 'Enable' : 'Disable';

  function closeMenu() {
    setIsOpen(false);
  }

  function handleAction(action: () => void) {
    action();
    closeMenu();
  }

  return (
    <div
      className="table-actions"
      data-open={isOpen}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          closeMenu();
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
          event.stopPropagation();
          setIsOpen((current) => !current);
        }}
      >
        <MoreVertRounded fontSize="small" />
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
            Edit
          </button>
          <button
            type="button"
            role="menuitem"
            className="menu__item"
            onClick={() => handleAction(onToggleStatus)}
          >
            {toggleLabel}
          </button>
          <button
            type="button"
            role="menuitem"
            className="menu__item menu__item--danger"
            onClick={() => handleAction(onDelete)}
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}
