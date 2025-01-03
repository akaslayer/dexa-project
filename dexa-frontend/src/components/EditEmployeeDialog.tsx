import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Employee } from "@/utils/Interface/Employee";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateEmployeeSchema } from "@/utils/Schema/EmployeeSchema";

interface EditEmployeeModalProps {
  isOpen: boolean;
  selectedEmployee: Employee | null;
  onClose: () => void;
  onSave: (updatedEmployee: any) => void;
}
type FormValues = z.infer<typeof UpdateEmployeeSchema>;

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
  isOpen,
  selectedEmployee,
  onClose,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(UpdateEmployeeSchema),
    defaultValues: {
      name: selectedEmployee?.name || "",
    },
  });

  useEffect(() => {
    if (selectedEmployee) {
      reset({
        name: selectedEmployee.name,
      });
    }
  }, [selectedEmployee, reset]);

  const onSubmit = (data: FormValues) => {
    if (selectedEmployee) {
      const updatedEmployee = { email: selectedEmployee.email, ...data };
      onSave(updatedEmployee);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[425px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Karyawan</DialogTitle>
            <DialogDescription>
              Anda dapat mengedit informasi karyawan di sini.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="code">Kode Karyawan</Label>
              <Input id="code" disabled={true} value={selectedEmployee?.code} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                disabled={true}
                value={selectedEmployee?.email}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nama</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeeModal;
