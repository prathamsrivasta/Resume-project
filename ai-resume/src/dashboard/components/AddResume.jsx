import { PlusSquare } from "lucide-react";
import React from "react";
// import { Button } from './components/ui/button';


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function AddResume() {

    const [openDialog, setOpenDialog] = React.useState(false);
  return (
    <div>
      <div
        className="p-14 py-24 border items-center justify-center flex bg-secondary rounded-lg h-[280px]
        hover:scale-105 transition-all hover:shadow-md
        cursor-pointer border-dashed "
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
                <p>Add a Title for a new resume</p>
             <Input className="mt-2" placeholder="Ex. Full stack resume"/>
            </DialogDescription>
            <div className="flex justify-end gap-4">
                <Button  onClick={()=>setOpenDialog(false)}variant='ghost'>Cancel</Button>
                <Button>Create</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
