'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm, useFieldArray, useWatch, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import axios, { AxiosResponse } from 'axios';
import { toast } from '@/components/ui/use-toast';
import { useReactToPrint } from 'react-to-print';
import React from 'react';
import { useRouter } from 'next/navigation';
import Receipt from './Receipt';
import { logs } from '../actions/logs';


interface Option {
  label: string;
  value: string;
  unitPrice: number;
}

const Price = ({ control, index }: { control: any; index: number }) => {
  const value = useWatch({
    control,
    name: `fields.${index}`,
  });
  return (
    <div className="flex flex-col text-end">
      <p className="text-lg font-medium mt-2">
        GHC{((+value.qty || 0) * (+value.unitPrice || 0))}
      </p>
    </div>
  );
};


const TotalPrice = ({ control }: { control: any }) => {
  const fields = useWatch({
    control,
    name: 'fields',
  });

  const totalPrice = fields.reduce((total: number, field: { qty: number; unitPrice: number; }) => total + field.qty * field.unitPrice, 0);

  return (
    <div className="flex flex-col text-end">
      <p className="text-lg font-medium mt-2">
        GHC {totalPrice.toFixed(2)}
      </p>
    </div>
  );
};



const SalesForm = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fields: [{ productName: '', qty: 0, unitPrice: 0, discount: 0 }],
    },
  });
  const router = useRouter();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [order, setOrder] = useState<AxiosResponse<any, any> | null>(null);

  useEffect(() => {
    axios.get('/api/product/get-products')
      .then(response => {
        setOptions(response.data.map((option: { productID: any; productName: any; sellingPrice: any }) => ({
          value: option.productID,
          label: option.productName,
          unitPrice: option.sellingPrice
        })));
        console.log(options.find)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fields.forEach((field, index) => {
      const productName = field.productName;
      const unitPrice = options.find((option) => option.value === productName)?.unitPrice;
      console.log(`Setting unit price for field ${index} to ${unitPrice}`);
      setValue(`fields.${index}.unitPrice`, unitPrice || 0);
    });
  }, [fields, options, setValue]);



  const onSubmit = async (data: any) => {
    try {
      const user = await localStorage.getItem('user')
      await logs('Sales Made', 'inventory', user || '')
      const mappedData = data.fields.map((field: any) => {
        const productName = options.find((option: any) => option.value === field.productName)?.label;
        return {
          ...field,
          qty: parseInt(field.qty),
          unitPrice: parseInt(field.unitPrice),
        };
      });
      data.fields = mappedData;
      data.totalPrice = data.fields.reduce((total: number, field: { qty: number; unitPrice: number; }) => total + field.qty * field.unitPrice, 0);
      console.log(data);
      const order = await axios.post('/api/order/', data).then(response => {
        reset()
        toast({
          title: "Yay! Sales made",
          description: "Order Booked"
        })
        setOrder(response.data);
        setShowReceipt(true);
        console.log(response)

      })

    } catch (error) {
      console.log("Failed" + error)
      toast({
        title: "Aawwnnn! Order Rejected",
        description: "Order bounced" + error
      })
    }
  };


  return (
    <>
      <Receipt
        receiptDetails={order}
        showReceipt={showReceipt}
        onClose={() => setShowReceipt(false)}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mt-5 ">
          <CardHeader>
            <CardTitle>Point of Sale</CardTitle>
          </CardHeader>
          <CardContent>
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-row gap-3">
                <div className="flex flex-col w-full">
                  <Label>Product Name</Label>
                  <Controller
                    name={`fields.${index}.productName`}
                    control={control}
                    render={({ field }: { field: any }) => (
                      <Select
                        className="mt-2"
                        value={options.find((option) => option.value === field.value)}
                        onChange={(newValue) => {
                          field.onChange(newValue?.value);
                          setSelectedOption(newValue);
                          const unitPrice = newValue?.unitPrice || 0;
                          setValue(`fields.${index}.unitPrice`, unitPrice);
                        }}
                        options={options.map((option) => ({
                          value: option.value,
                          label: option.label,
                          unitPrice: option.unitPrice
                        }))}
                        isSearchable
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col">
                  <Label>Qty</Label>
                  <Input
                    step={0.1}
                    type="number"
                    {...register(`fields.${index}.qty`, {
                    })}
                    className="w-full mt-2"
                    placeholder="Quantity"
                  />
                </div>

                <div className="flex flex-col">
                  <Label>Discount</Label>
                  <Input
                    type="number"
                    {...register(`fields.${index}.discount`, {
                      valueAsNumber: true
                    })}
                    className="w-full mt-2"
                    placeholder="Discount"
                  />
                </div>

                <div className="flex flex-col">
                  <Label>Unit Price</Label>
                  <Input
                    type="number"
                    step={0.1}
                    defaultValue={Number(`fields.${index}.unitPrice`) - Number(`fields.${index}.discount`)}
                    {...register(`fields.${index}.unitPrice`, {
                    })}
                    className="w-full mt-2"
                    placeholder="Unit price"
                  />
                </div>
                <div className="flex items-center justify-center mt-6 ring-1 bg-red-500 ring-red-900 px-2 rounded text-white my-3 ">
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                </div>
                <div className="w-1/3"></div>
                <Price control={control} index={index} />
              </div>
            ))}
            <div className="flex flex-row justify-between mt-10 ml-3">
              <Button type="button" onClick={() => append({ productName: '', qty: 0, unitPrice: 0, discount: 0 })}>
                Add Field
              </Button>
              <TotalPrice control={control} />
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <Button type="submit" className="bg-slate-800 text-white p-2 rounded-lg w-full">
              Create Invoice
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default SalesForm;

