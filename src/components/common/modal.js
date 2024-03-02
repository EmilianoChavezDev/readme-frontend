import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'

export default function Modal({ open, onHide, onSave, title, size='xs', children }) {
        
    return (
        <Dialog open={open} handler={onHide} size={size}>
            <DialogHeader>{title}</DialogHeader>
            <DialogBody>
                {children}
            </DialogBody>
            <DialogFooter>
                <div className='flex justify-end gap-2'>
                    <Button className='border border-colorPrimario bg-white text-colorPrimario brightness-90' onClick={onHide} >
                        <span>Cancelar</span>
                    </Button>
                    <Button className='bg-colorPrimario hover:brightness-90' onClick={onSave}>
                        <span>Aceptar</span>
                    </Button>
                </div>
            </DialogFooter>
        </Dialog>
    )
}