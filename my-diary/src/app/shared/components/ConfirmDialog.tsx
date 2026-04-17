type ConfirmDialogProps = {
  title?: string
  message?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export function ConfirmDialog({
  title = 'Confirmar acción',
  message = '¿Deseas continuar?',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="confirm-dialog">
      <h3>{title}</h3>
      <p>{message}</p>
      <div className="confirm-dialog__actions">
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
        <button type="button" onClick={onConfirm}>
          Confirmar
        </button>
      </div>
    </div>
  )
}
