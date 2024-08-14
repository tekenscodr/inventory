'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Card, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { logs } from "../actions/logs";



type FormFields = {
  productName: '',
  description: '',
  category: '',
  unitPrice: 0.00,
  sellingPrice: 0.00,
  quantityPerUnit: 0,
  reorderLevel: 0,
  quantity: 0,
}

const AddProduct = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormFields>();
  const { toast } = useToast();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('/api/product', data);
      const user = await localStorage.getItem('user')
      await logs('Added Product', 'inventory', user || '')
      router.push('/dashboard/product')
      reset()
      return toast({
        title: 'Success',
        description: "Your data has been saved!",
      })
    } catch (error) {
      console.error('Error creating product:', error);
      return toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request." + error,
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" text-white bg-blue-900 hover:bg-blue-800 my-2"> Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription className='text-black'>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 ">
            <div className="flex flex-col gap-3">
              <Label>
                Product name
              </Label>
              <Input
                {...register('productName', {
                  required: "Product Name is required"
                })}
                id="productName"
                placeholder="Product name"
              />
              {errors.productName && (
                <div className="text-red-500">{errors.productName.message}</div>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label>
                Description
              </Label>
              <Input
                {...register('description', {
                  required: "Description is required"
                })}
                id="description"
                placeholder="Description"
              />
              {errors.description && (
                <div className="text-red-500">{errors.description.message}</div>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label>
                Category
              </Label>
              <Input
                {...register('category', {
                  required: "Category is required"
                })}
                id="cartgory"
                placeholder="Category"
              />
              {errors.category && (
                <div className="text-red-500">{errors.category.message}</div>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label>
                Unit Price
              </Label>
              <Input
                {...register('unitPrice', {
                  required: "Unit price is required"
                })}
                type='number'
                id="unitPrice"
                step={0.1}
                placeholder="0.00"
              />
              {errors.unitPrice && (
                <div className="text-red-500">{errors.unitPrice.message}</div>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label>
                Selling Price
              </Label>
              <Input
                {...register('sellingPrice', {
                  required: "Selling price is required"
                })}
                type='number'
                id="sellingPrice"
                placeholder="0.00"
              />
              {errors.sellingPrice && (
                <div className="text-red-500">{errors.sellingPrice.message}</div>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label>
                Quantity Per Unit
              </Label>
              <Input
                {...register('quantityPerUnit', {
                  required: "Quantity per unit is required",
                  valueAsNumber: true
                })}
                type='number'
                id="qtyPerUnit"
                placeholder="0"
              />
              {errors.quantityPerUnit && (
                <div className="text-red-500">{errors.quantityPerUnit.message}</div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label>
                Reorder Level
              </Label>
              <Input
                {...register('reorderLevel', {
                  required: "Reorder Level is required",
                  valueAsNumber: true
                })}
                type='number'
                id="reorderLevel"
                placeholder="0"
              />
              {errors.reorderLevel && (
                <div className="text-red-500">{errors.reorderLevel.message}</div>
              )}
            </div>


            <div className="flex flex-col gap-3">
              <Label>
                Quantity
              </Label>
              <Input
                {...register('quantity', {
                  required: "Quantity is required",
                  valueAsNumber: true
                })}
                type='number'
                id="qty"
                placeholder="0"
              />
              {errors.quantity && (
                <div className="text-red-500">{errors.quantity.message}</div>
              )}
            </div>

            <DialogClose asChild>
              <Button type="submit" size="sm" className="px-3 text-white bg-blue-900 p-2 rounded-md">
                Save
              </Button>
            </DialogClose>
          </div>
        </form>
        <DialogFooter className="sm:justify-start">
          <p>Design by Tekens Technologies</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>)

};


export default AddProduct;


