export default class AuthService {
    async login(correo: string, password: string) {
        const response = await fetch("http://localhost:3333/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({correo:correo, password:password}),
        })
        
        
        return response.json()
    }
}