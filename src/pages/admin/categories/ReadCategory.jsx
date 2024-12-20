import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { HiMiniWrenchScrewdriver } from "react-icons/hi2";

import apis from "../../../apis";

import BreadCrumb from "../../../components/layouts/BreadCrumb";
import NormalButton from "../../../components/buttons/NormalButton";

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
          // xử lý category nếu cần (Xử lý computed data)
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
    <>
      {singleData.length !== 0 ? (
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
            <div className="grid grid-cols-4 gap-5">
              <div className="col-span-1 ">
                <div className="bg-white p-6 border border-neutral-100 rounded-lg">
                  <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                    Thumbnail
                  </div>
                  <div>
                    <div className="mb-3">
                      {singleData.image ? (
                        <img
                          src={singleData.image}
                          alt=""
                          className="w-full h-[250px] object-cover"
                        />
                      ) : (
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                          alt=""
                          className="w-full h-[250px] object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-3 ">
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
      ) : (
        <h1>Category does not exist</h1>
      )}
    </>
  );
}
