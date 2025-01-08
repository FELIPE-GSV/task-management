import { UserOutlined } from "@ant-design/icons";
import { Eye, EyeOff, User } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface Props {
    placeholder: string,
    width: string
    type: "username" | "password"
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void

}

export default function InputLogin({ placeholder, width, type, onChange, value }: Props) {

    const [onView, setOnView] = useState(false)

    return (
        <div
            className={`
                w-[${width}]
                flex items-center justify-between
                border-b-2
                border-b-white
                pr-3
                py-2
                rounded-t-[5px]
                transition
                duration-700
                hover:transition
                hover:duration-700
                hover:border-white
                hover:rounded-[5px]
                hover:bg-gray-100
                group
            `}
        >
            {type === "username" && (
                <>
                    <input
                        type="text"
                        className={`
                            w-[95%]
                            font-normal
                            bg-transparent
                            text-white
                            text-[20px]
                            focus:outline-none
                            pl-3
                            placeholder-white
                            placeholder-opacity-45
                            group-hover:placeholder-[#4178E3]
                            group-hover:text-[#4178E3]
                            group-hover:placeholder-opacity-45
                            transition
                            duration-700]
                            
                        `}
                        onChange={onChange}
                        value={value}
                        placeholder={placeholder}
                    />
                    <User
                        size={30}
                        className="text-white group-hover:text-[#4178E3] transition duration-700"
                    />
                </>
            )}
            {type === "password" && (
                <>
                    <input
                        type={onView ? "text" : "password"}
                        className={`
                            w-[95%]
                            font-normal
                            bg-transparent
                            text-white
                            text-[20px]
                            focus:outline-none
                            pl-3
                            placeholder-white
                            placeholder-opacity-45
                            group-hover:placeholder-[#4178E3]
                            group-hover:text-[#4178E3]
                            group-hover:placeholder-opacity-45
                            transition
                            duration-700
                        `}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                    />
                    {onView ?
                        <Eye
                            size={30}
                            className="text-white group-hover:text-[#4178E3] transition duration-700 cursor-pointer"
                            onClick={() => setOnView(!onView)}
                        />
                        :
                        <EyeOff
                            size={30}
                            className="text-white group-hover:text-[#4178E3] transition duration-700 cursor-pointer"
                            onClick={()=> setOnView(!onView)}
                        />
                    }
                </>
            )}
        </div>

    )
}