import React from "react";
import FileUploader from "../forms/FileUploader";
import GeneralInformation from "../forms/GeneralInformation"


export default function CategoryForm() {
  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-5">
      <div className="col-span-1 row-span-2">
        <FileUploader
          color="bg-white"
          // size="min-w-[264px] max-w-[264px] min-h-[318px] max-h-[318px]"
          // size="h-[318px]"
          border="border border-neutral-100"
          text="text-neutral-800 font-medium text-lg"
          labelText="text-neutral-600 font-medium text-sm"
          label="Photo"
          type="text"
          // icon={<HiMiniAdjustmentsHorizontal />}
          // iconStyle="size-5"
          placeholder="Drag and drop image here, or click add image"
        >
          Thumbnail
        </FileUploader>
      </div>
      <div className="col-span-3 row-span-2.5">
        {/* general information */}
        <GeneralInformation>Category</GeneralInformation>
      </div>

    </div>
  );
}
