"use client"

import '@ant-design/v5-patch-for-react-19';

import ImageLogin from "@/assets/imageLogin.png"
import Logo from "@/assets/logoComFundo-removebg-preview.png"
import { Button, Input, notification } from "antd"
import Image from "next/image"
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from "@ant-design/icons";
import { useState } from "react"
import { NotificationType } from "@/app/layout"
import { login } from '@/services/authenticationService';
import { useRouter } from 'next/navigation';
import InputLogin from '@/components/InputLogin';


export default function Login() {

    const router = useRouter()

    const [loginObject, setLoginObject] = useState({
        username: "",
        password: ""
    })

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    const loginMethod = async () => {
        const response = await login({ username: loginObject.username, password: loginObject.password })
        console.log(response)
        if (response?.ok) {
            if (typeof window !== 'undefined') {
                const data = await response.json()
                const now = new Date().getTime()
                localStorage.setItem('token', data.access);
                localStorage.setItem('tokenTimestamp', now.toString());
                openNotificationWithIcon("success", "Login realizado com sucesso!.", "Carregando página seguinte...")
                router.push("/pages/tasks")
            }
        } else if (response?.status === 401){
            const data = await response.json()
            console.log(data)
            if(data.detail){
                openNotificationWithIcon("warning", "Usuário não encontrado!", "Verifique suas informações")
            }
        } else if( response?.status === 500){
            openNotificationWithIcon("error", "Erro de conexão!", "Falha de conexão na api.")
        }
    }

    return (
        <>
            {contextHolder}
            <main className="w-full h-screen flex justify-center items-center">
                <div className="w-[100%] h-screen relative">
                    <Image
                        src={ImageLogin.src}
                        width={ImageLogin.width}
                        height={ImageLogin.height}
                        alt="ImageLogin"
                        className="h-screen"
                    />
                    <div className="absolute top-0 left-0 w-full h-screen bg-[#4178E3] bg-opacity-15    ">
                    </div>
                </div>

                <section className="w-[40%] h-[70%] bg-[#4178E3] absolute rounded-[5px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-evenly">
                    <Image
                        src={Logo.src}
                        width={Logo.width}
                        height={Logo.height}
                        alt="logo"
                        className="w-[70%]"
                    />
                    <div className="w-[80%] h-[60%] flex flex-col items-center justify-start gap-11">

                        <InputLogin
                            placeholder='Nome de usuário'
                            width='100%'
                            type='username'
                            value={loginObject.username}
                            onChange={(e) => setLoginObject({ ...loginObject, username: e.target.value })}
                        />
                        <InputLogin
                            placeholder='Senha'
                            width='100%'
                            type='password'
                            value={loginObject.password}
                            onChange={(e) => setLoginObject({ ...loginObject, password: e.target.value })}
                        />
                        <Button
                            type="primary"
                            className="bg-white text-[#4178E3] font-bold text-[20px] w-full h-10 py-3"
                            onClick={loginMethod}
                        >
                            Log in
                        </Button>
                    </div>
                </section>
            </main>
        </>

    )
}