import React from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button';

const inputFields = [
  { label: 'Email', type: 'email', id: 'email', placeholder: 'Email' },
  { label: 'Name', type: 'text', id: 'name', placeholder: 'Name' },
  { label: 'Ticker', type: 'text', id: 'ticker', placeholder: 'Ticker' },
  { label: 'Description', type: 'text', id: 'description', placeholder: 'Description' },
  { label: 'Image', type: 'file', id: 'image', accept: 'image/*' },
];

export default function CreateMemeForm() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="text-xl font-semibold">Create a meme</div>
      <div className="my-4 grid w-full max-w-sm items-center gap-1.5">
        {inputFields.map((field, index) => (
          <div key={index}>
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              type={field.type}
              id={field.id}
              placeholder={field.placeholder}
              className='bg-slate-50'
              {...(field.accept && { accept: field.accept })}
            />
          </div>
        ))}
        <Button className='mt-2'>
            Create a meme
        </Button>
      </div>
    </div>
  );
}
