import { BASE_URL } from "@/api/api"

export async function login(data: {username: string, password: string}) {
    try {

        const username = data.username
        const password = data.password

        const response = await fetch(`${BASE_URL}/login/`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        })

        return response

    } catch (error) {
        console.error(error)

    }
}