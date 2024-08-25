
'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { logs } from '../actions/logs'

type secret = {
    productID: string,
    productName: string,
    description: string,
    category: string,
}

type FormFields = {
    productID: '',
    productName: '',
    description: '',
    category: '',

}

const EditProduct = (props: secret) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormFields>();
    const { toast } = useToast();
    const router = useRouter();

    const onSubmit = async (data: any) => {
        try {
            const response = await axios.put(`/api/product/${data.productID}/edit`, data);
            const user = await localStorage.getItem('user')
            await logs('Added Product', 'inventory', user || '', JSON.stringify(response.data))
            router.push('/dashboard/product')
            reset()
            return toast({
                description: "Your data has been edited!",
            })
        } catch (error) {
            console.error('Error creating product:', error);
            return toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request." + error,
            });
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className=" text-white text-start w-full bg-black"> Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription className='text-black'>
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <Label>
                                Product Name
                            </Label>
                            <Input
                                id="productId"
                                defaultValue={props.productName}
                                {...register('productName')}

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
                                id="description"
                                defaultValue={props.description}
                                {...register('description')}

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
                                id="category"
                                defaultValue={props.category}
                                {...register('category')}

                            />
                            {errors.category && (
                                <div className="text-red-500">{errors.category.message}</div>
                            )}
                        </div>

                        <Button type="submit" size="sm" className="px-3 text-white bg-blue-900 p-2 rounded-md">
                            Save
                        </Button>
                    </div>
                </form>

                <DialogFooter className="sm:justify-start">
                    <p>Design by Tekens Technologies</p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditProduct
