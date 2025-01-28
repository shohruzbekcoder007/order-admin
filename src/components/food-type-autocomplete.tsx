"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Foodtype } from "@/lib/module_types";
import base_url from "@/lib/base_url";

export function ComboboxFoodType() {

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [foodTypes, setFoodTypes] = React.useState<Foodtype[]>([]);

  const fetchFoodTypes = async (search: string = "") => {
    const res = await fetch(`${base_url}/foodtype/foodtypes?search=${search}`);
    if (!res.ok) {
      throw new Error("Failed to fetch food types");
    }
    return res.json();
  };

  const handleInputChange = (value: string) => {
    console.log(value, "<-value")
    const filtered = foodTypes.filter((foodType) => foodType.name.toLowerCase().includes(value.toLowerCase()))
    console.log(filtered, "<-filtered")
    setFoodTypes(filtered)
  }

  React.useEffect(() => {
    fetchFoodTypes()
      .then((data) => setFoodTypes(data.data))
      .catch((error) => console.error("Error fetching food types:", error));
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? foodTypes.find((foodType: Foodtype) => foodType.id === value)?.name : "Select food type..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search food type..." onValueChange={handleInputChange}/>
          <CommandList>
            <CommandEmpty>No food type found.</CommandEmpty>
            <CommandGroup>
              {foodTypes.map((foodType: Foodtype) => (
                <CommandItem
                  key={foodType.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {foodType.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === foodType.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}