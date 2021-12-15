import dayjs from "dayjs";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  calcStatus,
  Character,
  defaultSkillName,
  dicedStatusName,
  SkillCategory,
  statusColor,
  undicedStatusName,
} from "../database/characterType";
import { ItemInterface } from "../database/itemInterface";
import { Item as ItemType } from "../database/type";
import { useNavigate } from "react-router-dom";
import { storageInterface } from "../database/storageInterface";
import { updateDoc } from "firebase/firestore";

type FormData = Pick<ItemType, "name" | "description" | "job" | "status">;

const defaultValues: FormData = {
  name: "",
  description: "",
  job: "",
  status: Object.fromEntries([...dicedStatusName, undicedStatusName].map((name) => [name, 0])),
};

type Props = {};

const CreateItem: React.VFC<Props> = ({}) => {
  const { register, handleSubmit, watch, reset } = useForm<FormData>({ defaultValues });

  const navigate = useNavigate();

  // 選択された画像を保持する。
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files?.length == 0) return;

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setFile(file);
      e.target && setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // fileのインプットのref
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = handleSubmit(async (value) => {
    // ここでUndicedStatusの値を計算する。
    let status = { ...value.status };
    undicedStatusName.forEach((name) => {
      status[name] = calcStatus(status, name);
    });

    // firestoreに追加
    let item: ItemType = {
      ...value,
      status,
      icon: "",
      id: "",
      skill: {},
      items: {},
      categoryId: "",
      reviews: [],
      downloaded: 0,
      goods: 0,
      timeStamp: dayjs(),
    };

    const ref = await ItemInterface.create(item);

    // icon画像をstorageにアップロード
    if (file) {
      const url = await storageInterface.upload(
        `item/${ref.id}/icon.${file.type.split("/")[1]}`,
        file
      );

      updateDoc(ref, { icon: url });
    }

    reset();
    navigate("/");
  });

  return (
    <div className="container flex items-center justify-center">
      <form onSubmit={onSubmit} className="flex flex-col gap-6" style={{ maxWidth: "512px" }}>
        <input type="file" onChange={onUpload} hidden ref={inputRef} />
        {image ? (
          <img
            onClick={() => {
              inputRef.current?.click();
            }}
            src={image as string}
            className="w-full object-contain border border-gray-300 shadow-lg"
            style={{ aspectRatio: "16/9" }}
          />
        ) : (
          <div
            onClick={() => {
              inputRef.current?.click();
            }}
            className="w-full flex cursor-pointer items-center justify-center bg-white border border-gray-300 shadow-lg"
            style={{ aspectRatio: "16/9" }}
          >
            <p className="text-center text-4xl text-gray-500 font-bold">No Image</p>
          </div>
        )}

        <input
          placeholder="キャラクター名"
          {...register("name", { required: true })}
          className="p-4 border border-gray-500"
        />
        <input placeholder="職業" {...register("job")} className="p-4 border border-gray-500" />
        <textarea
          placeholder="キャラクター説明"
          {...register("description")}
          className="p-4 border border-gray-500"
        />

        <div className="grid grid-cols-2 divide-x divide-gray-300 border border-gray-300 rounded-lg shadow-lg">
          <div>
            {dicedStatusName.map((name, index) => (
              <div
                className={`w-full flex flex-row items-center ${
                  index % 2 == 1 ? "bg-white" : "bg-gray-200"
                }`}
                key={`create-status-${name}`}
              >
                <p className="w-20 p-2">{name}</p>
                <input
                  {...register(`status.${name}`)}
                  className={`flex-1 bg-transparent p-2 ${statusColor(
                    watch(`status.${name}`),
                    name
                  )}`}
                />
              </div>
            ))}
          </div>

          <div>
            {undicedStatusName.map((name, index) => (
              <div
                className={`w-full flex flex-row items-center ${
                  index % 2 == 1 ? "bg-white" : "bg-gray-200"
                }`}
                key={`create-status-${name}`}
              >
                <p className="w-20 p-2">{name}</p>
                <p className="">{calcStatus(watch("status"), name)}</p>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-blue-300 rounded-lg mx-auto shadow-lg py-2 px-8 w-max">
          決定
        </button>
      </form>
    </div>
  );
};
export default CreateItem;
