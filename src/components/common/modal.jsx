import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'

export default function Modal({ open, onHide, onSave, title, size='xs', children, variant, disableSubmit }) {
        
    return (
        <Dialog open={open} handler={onHide} size={size}>
            <DialogHeader>{title}</DialogHeader>
            <DialogBody>
                {children}
            </DialogBody>
            <DialogFooter>
                <div className='flex justify-end gap-2'>
                    <Button className={` border bg-white brightness-90 ${variant === 'danger'? 'border-red-900 text-red-900' : 'border-colorPrimario text-colorPrimario'}`} onClick={onHide} >
                        <span>Cancelar</span>
                    </Button>
                    <Button className={`hover:brightness-90 ${variant === 'danger'? 'bg-red-900' : 'bg-colorPrimario'}`} disabled={disableSubmit} onClick={onSave}>
                        <span>Aceptar</span>
                    </Button>
                </div>
            </DialogFooter>
        </Dialog>
    )
}