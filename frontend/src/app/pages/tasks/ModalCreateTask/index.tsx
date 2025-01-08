"use client"

import { NotificationType } from "@/app/layout"
import { DatePicker } from "@/components/DatePicker"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { createTaskInBd } from "@/services/taskService"
import { notification } from "antd"
import { Plus } from "lucide-react"
import { useState } from "react"

export function ModalCreateTask() {

  const [isOpen, setIsOpen] = useState(false)

  const [date, setDate] = useState<Date | undefined>()
  const [objectRegister, setObjectRegister] = useState({
    title: "",
    description: "",
    pritority: false
  })

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  const createTask = async () => {
    if(objectRegister.title === ""){
      openNotificationWithIcon("warning", "Forneça o título!", "Forneça o título para registrar um tarefa.")
    }
    const data = {
      title: objectRegister.title,
      priority: objectRegister.pritority,
      description: objectRegister.description,
      finish_at: date
    }

    if (typeof window !== undefined) {
      const token = localStorage.getItem('token')
      const response = await createTaskInBd(token, data)
      if (response?.ok) {
          openNotificationWithIcon("success", "Tarefa registrada!", "A tarefa foi criada com sucesso.")
          setIsOpen(false)
      }

    }

  }



  return (
    <>
      {contextHolder}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="flex items-center justify-evenly 
        w-[25%] bg-[#4178E3] text-white h-[72px] mt-5 rounded-[100px]
        font-semibold text-[32px]">
            <Plus size={40} />
            Nova Tarefa
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Adicionar nova tarefa</DialogTitle>
            <DialogDescription>
              Preencha as informações para criar uma nova tarefa.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Título
              </Label>
              <Input
                id="title"
                className="col-span-3"
                value={objectRegister.title}
                onChange={(e) => setObjectRegister({ ...objectRegister, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Finaliza em
              </Label>
              <DatePicker
                date={date}
                setDate={setDate}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Descrição
              </Label>
              <Textarea
                placeholder="Descrição"
                className="col-span-3"
                value={objectRegister.description}
                onChange={(e) => setObjectRegister({ ...objectRegister, description: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Prioridade?
            </Label>
            <Label className="text-right flex items-center gap-2">
              Sim
              <Switch checked={objectRegister.pritority} onCheckedChange={(e) => setObjectRegister({ ...objectRegister, pritority: e })} />
            </Label>

          </div>
          <DialogFooter>
            <Button type="submit" onClick={createTask}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>

  )
}
