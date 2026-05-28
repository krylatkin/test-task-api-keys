import './ApiKeyEditDialog.css'
import CloseRounded from '@mui/icons-material/CloseRounded'

type ApiKeyEditDialogProps = {
  draftName: string
  isSaving: boolean
  onChangeDraftName: (value: string) => void
  onClose: () => void
  onSave: () => void
}

export function ApiKeyEditDialog({
  draftName,
  isSaving,
  onChangeDraftName,
  onClose,
  onSave,
}: ApiKeyEditDialogProps) {
  return (
    <div className="api-key-edit-dialog__backdrop" role="presentation">
      <div
        className="api-key-edit-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rename-key-title"
      >
        <div className="api-key-edit-dialog__header">
          <div>
            <h3 id="rename-key-title" className="api-key-edit-dialog__title">
              Edit
            </h3>
            <p className="api-key-edit-dialog__hint">
              Update the name of this API key.
            </p>
          </div>

          <button
            type="button"
            className="api-key-edit-dialog__close"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <CloseRounded fontSize="small" />
          </button>
        </div>

        <div className="api-key-edit-dialog__body">
          <label className="api-key-edit-dialog__label">
            Name
            <input
              autoFocus
              className="api-key-edit-dialog__input"
              value={draftName}
              onChange={(event) => onChangeDraftName(event.target.value)}
            />
          </label>
        </div>

        <div className="api-key-edit-dialog__footer">
          <button
            type="button"
            className="api-key-edit-dialog__action api-key-edit-dialog__action--secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="api-key-edit-dialog__action api-key-edit-dialog__action--primary"
            onClick={onSave}
            disabled={isSaving || !draftName.trim()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
