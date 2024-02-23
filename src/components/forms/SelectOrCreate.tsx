/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { FormControl } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { CheckIcon, PlusCircle } from "lucide-react";
import { FC } from "react";
import { Separator } from "../ui/separator";
import Modal from "../ui/modal";
import CreateCollectionForm from "./CreateCollectionForm";
import { MutationTrigger } from "node_modules/@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/query";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  onClose,
  onOpen,
  selectIsOpen,
} from "@/redux/features/modal/modalSlice";

type TSelectOrCreateProps = {
  collections: { name: string; _id: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  collectionName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  createCollection: MutationTrigger<
    MutationDefinition<
      any,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
      >,
      never,
      any,
      "api"
    >
  >;
};

const SelectOrCreate: FC<TSelectOrCreateProps> = ({
  collections,
  field,
  form,
  collectionName,
  createCollection,
}) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[200px] justify-between",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value
                ? collections.find(
                    (collection) => collection._id === field.value
                  )?.name
                : `Select ${collectionName}`}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${collectionName}...`}
              className="h-9"
            />
            <CommandEmpty>No {collectionName} found.</CommandEmpty>
            <CommandGroup>
              {/* add new Collection */}
              <CommandItem
                onSelect={() => {
                  dispatch(onOpen());
                }}
                className="flex items-center gap-2"
              >
                <PlusCircle size={16} /> Add {collectionName}
              </CommandItem>
              <Separator className="mt-1" />
              {collections?.map((collection) => (
                <CommandItem
                  value={collection.name}
                  key={collection._id}
                  onSelect={() => {
                    form.setValue(collectionName, collection._id);
                  }}
                >
                  {collection.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      collection._id === field.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* modal */}
      <Modal
        title={`Create ${collectionName}`}
        description={`Add new ${collectionName} to add new products.`}
        isOpen={isOpen}
        onClose={() => dispatch(onClose())}
      >
        <CreateCollectionForm
          form={form}
          collectionName={collectionName}
          createCollection={createCollection}
        />
      </Modal>
    </>
  );
};

export default SelectOrCreate;
