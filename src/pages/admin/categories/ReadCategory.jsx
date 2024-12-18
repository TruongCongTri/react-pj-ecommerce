import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { HiMiniWrenchScrewdriver } from "react-icons/hi2";

import BreadCrumb from "../../../components/layouts/BreadCrumb";
import NormalButton from "../../../components/buttons/NormalButton";

import LoadingTable from "../../../components/tables/LoadingTable"
import apis from "../../../apis";

import FileUploader from "../../../components/forms/FileUploader";
import NormalInput from "../../../components/forms/NormalInput";
import NormalTextarea from "../../../components/forms/NormalTextarea";

export default function ReadCategory() {
  // Lưu lại danh sách categories từ server
  const [singleData, setSingleData] = useState([]);
  // Dùng để set state loading của table (first load hoặc searching)
  const [loadingGet, setLoadingGet] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const handleEditCate = () => {
    // Xử lý đăng nhập thành công
    navigate(`/admin/categories/${params.id}/edit`);
  };

  useEffect(() => {
    setLoadingGet(true);
    apis.categories
      .getSingleData(params.id)
      .then(
        (res) => {
          const { category } = res.data.data;
          // xử lý categories nếu cần (Xử lý computed data)
          setSingleData(category);
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        setTimeout(() => {
          setLoadingGet(false);
        }, 1000);
      });
    return () => {};
  }, []);
  console.log(singleData);
  
  return (
    <div className="mx-6 my-8 ">
      <div className="flex justify-between mb-6">
        <div>
          <BreadCrumb />
        </div>
        <div className="flex gap-x-4 items-end ">
          <NormalButton
            color="bg-[#5C59E8]"
            text="text-white"
            border="border border-[#5C59E8]"
            type="submit"
            icon={<HiMiniWrenchScrewdriver />}
            iconStyle="size-5"
            onClick={handleEditCate}
          >
            Edit Category
          </NormalButton>
        </div>
      </div>
      {loadingGet ? (
        <div>Loading data</div>
      ) : (
        <div className="grid grid-cols-4 grid-rows-3 gap-5">
          <div className="col-span-1 row-span-2">
            <FileUploader
              color="bg-white"
              border="border border-neutral-100"
              text="text-neutral-800 font-medium text-lg"
              labelText="text-neutral-600 font-medium text-sm"
              label="Photo"
              type="text"
              placeholder="Drag and drop image here, or click add image"
              isDisabled="true"
              value={singleData.image}
            >
              Thumbnail
            </FileUploader>
          </div>
          <div className="col-span-3 row-span-2.5">
            {/* general information */}
            <div className="bg-white p-6 border border-neutral-100 rounded-lg">
              <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                General Information
              </div>
              <div>
                <div className="mb-3">
                  <NormalInput
                    size="w-full"
                    value={singleData.name}
                    type="text"
                    name={`CategoryName`}
                    isDisabled="true"
                  >
                    Category Name 
                  </NormalInput>
                </div>
                <div>
                  <NormalTextarea
                    size="w-full "
                    rows="6"
                    type="text"
                    value={singleData.description}
                    name={`CategoryDesc`}
                    isDisabled="true"
                  >
                    Description
                  </NormalTextarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
