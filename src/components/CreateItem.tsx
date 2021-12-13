import React from "react";
import { useForm } from "react-hook-form";
import {
  defaultSkillName,
  dicedStatusName,
  SkillCategory,
  undicedStatusName,
} from "../database/characterType";
import { Item as ItemType } from "../database/type";

type FormData = Pick<
  ItemType,
  "name" | "description" | "icon" | "job" | "items" | "status" | "skill"
>;

const defaultValues = {
  name: "",
  description: "",
  icon: "",
  job: "",
  items: {},
  status: {},
  skill: {},
};

type Props = {};

const CreateItem: React.VFC<Props> = ({}) => {
  const { register, handleSubmit, watch } = useForm<FormData>({ defaultValues });

  const onSubmit = handleSubmit((value) => {});

  return (
    <div className="container flex items-center justify-center">
      <form onSubmit={onSubmit} className="flex flex-col gap-6" style={{ maxWidth: "512px" }}>
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
                <input {...register(`status.${name}`)} className="flex-1 bg-transparent p-2" />
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
                <p>{watch(`status.${name}`)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {Object.entries(defaultSkillName).map(([category, names]) => (
            <div
              className="flex flex-col w-96 border border-gray-300"
              key={`create-skill-${category}`}
            >
              {names.map((name, index) => (
                <div
                  className={`w-full flex flex-row items-center ${
                    index % 2 == 1 ? "bg-white" : "bg-gray-200"
                  }`}
                  key={`create-skill-${name}`}
                >
                  <p className="w-24 p-2">{name}</p>
                  <input
                    {...register(`skill.${category as SkillCategory}.${name}`)}
                    className="flex-1 border-l border-gray-300 p-2 bg-transparent"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};
export default CreateItem;
