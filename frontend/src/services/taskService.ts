import { BASE_URL } from "@/api/api"

export async function createTaskInBd(token:string | null, data: {
    title: string,
    description: string,
    finish_at: Date | undefined,
    priority: boolean
}) {

    const title = data.title
    const description = data.description
    const finish_at = data.finish_at
    const priority = data.priority
    const complete = false

    try {
        
        const response = await fetch(`${BASE_URL}/task/create/`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title,
                description,
                finish_at,
                priority,
                complete
            })
        })

        return response

    } catch (error) {
        console.error(error)
    }
    
}