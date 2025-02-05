"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import base_url from "@/lib/base_url";

export function ComboboxFoodType() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [foodTypes, setFoodTypes] = useState<{ id: number; name: string }[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Ma'lumot olish funksiyasi
  const fetchFoodTypes = async (query: string, pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(`${base_url}/foodtype/foodtypes?search=${query}&page=${pageNum}&limit=5`);
      const data = await res.json();
      setTotalPages(data.totalPages);
      setPage(+data.currentPage);
      setFoodTypes((prev) => (pageNum === 1 ? data.data : [...prev, ...data.data]));
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    setLoading(false);
  };

  // Scroll davomida yangi sahifani yuklash
  useEffect(() => {
    if (page > 1) fetchFoodTypes(search, page);
  }, [page]);

  // Foydalanuvchi qidiruvi uchun ma'lumot olish
  useEffect(() => {
    fetchFoodTypes(search, 1);
  }, [search]);

  useEffect(() => {
    
  }, [loading]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;
    if (bottom) {
      if (page < totalPages) {
        console.log("Bottom reached", page, totalPages);
        setPage((prev) => prev + 1);
      }
    }
      // setPage((prev) => prev + 1);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select food type"
          className="w-[200px] justify-between"
        >
          {selected ? foodTypes.find((item) => item.name === selected)?.name : "Select food type..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search food..."
            className="h-9"
            value={search}
            // onChange={(e) => {console.log(e)}}
            onValueChange={(value) => setSearch(value)}
          />
          <CommandList
            style={{ maxHeight: "160px", overflowY: "auto" }}
            onScroll={handleScroll}
          >
            <CommandEmpty>No food type found.</CommandEmpty>
            <CommandGroup>
              {foodTypes?.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => {
                    setSelected(item.name === selected ? null : item.name);
                    setOpen(false);
                  }}
                >
                  {item.name}
                  <Check className={selected === item.name ? "ml-auto opacity-100" : "ml-auto opacity-0"} />
                </CommandItem>
              ))}
            </CommandGroup>
            {loading && <div className="text-center p-2">Loading...</div>}
            <div ref={observerRef} />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}


