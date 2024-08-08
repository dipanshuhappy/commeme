import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Link } from "wouter";



export default function CreateMemeForm() {
  const [loading, setLoading] = useState(false);
  const [memeName, setMemeName] = useState("");
  const [memeDescription, setMemeDescription] = useState("");
  const [memeSymbol, setMemeSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);
  };

  useEffect(() => {
    if (!selectedImage) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  return (
    <div className="flex flex-col justify-center items-center overflow-x-scroll">
      <div className="text-xl  font-semibold">Create a meme</div>
      <div className="my-4 grid w-full max-w-sm items-center gap-1.5">
        {/* {inputFields.map((field, index) => (
         
        ))} */}
        <div>
          <Label htmlFor={"name"}>Meme Name</Label>
          <Input
            type="text"
            placeholder={"Meme Name"}
            className="bg-slate-50"
            value={memeName}
            onChange={(e) => setMemeName(e.target.value)}
          />
          <Label htmlFor={"symbol"}>Meme Symbol</Label>
          <Input
            type="text"
            placeholder={"Symbol"}
            className="bg-slate-50"
            value={memeSymbol}
            onChange={(e) => setMemeSymbol(e.target.value)}
          />
          <Label htmlFor={"supply"}>Total Supply</Label>
          <Input
            type="number"
            placeholder={"Supply"}
            className="bg-slate-50"
            value={totalSupply}
            onChange={(e) => setTotalSupply(e.target.value)}
          />

          <Label htmlFor={"description"}>Description</Label>
          <Input
            type="text"
            placeholder={"Description"}
            className="bg-slate-50"
            value={memeDescription}
            onChange={(e) => setMemeDescription(e.target.value)}
          />

         
            <Label htmlFor="image">Upload an image</Label>
            <div className="grid gap-2">
              <Input
                id="image"
                type="file"
                className="bg-slate-50"
                accept="image/*"
                onChange={handleImageChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  width={300}
                  height={300}
                  className="aspect-square mx-auto rounded-md object-fill"
                />
              )}
          </div>
        </div>
        <div className="text-xl"> OR</div>
        <Link href="/meme-template" className="text-blue-500 underline">
          Use our meme template
        </Link>
        <Button className="mt-2">Create a meme</Button>
      </div>
    </div>
  );
}
