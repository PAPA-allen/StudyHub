import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
 
} from "@/components/ui/dialog"
import { FC } from "react";

interface Props{
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: unknown;
    component: any;
    setRoute?:(route:string)=>void
}


  
export const Modal: FC<Props> = ({ open, setOpen, component: Component, setRoute }) => {
            return (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle/>
                        </DialogHeader>
                        <Component setOpen={setOpen} setRoute={setRoute} />
                    </DialogContent>
                </Dialog>
            )
}