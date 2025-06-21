const BASE_URL = 'http://localhost:3333/page-ranges'

export default {
  async list() {
    try {
      const res = await fetch(BASE_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!res.ok) {
        const errorText = await res.text()
        console.error('Error al listar rangos:', res.status, errorText)
        throw new Error(`Error al listar rangos: ${res.status}`)
      }

      return await res.json()
    } catch (err: any) {
      console.error('Error al listar rangos (catch):', err)
      throw new Error(err.message || 'Error al listar rangos')
    }
  },

  async get(id: number) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!res.ok) throw new Error('Error al obtener rango')
      return await res.json()
    } catch (err: any) {
      console.error('Error al obtener rango:', err)
      throw new Error(err.message || 'Error al obtener rango')
    }
  },

  async create(data: any) {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        console.error('Error al crear rango:', error)
        throw new Error(error.message || 'Error al crear rango')
      }

      return await res.json()
    } catch (err: any) {
      console.error('Error al crear rango (catch):', err)
      throw new Error(err.message || 'Error al crear rango')
    }
  },

  async update(id: number, data: any) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT', // Si deseas usar PATCH, cámbialo aquí
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        console.error('Error al actualizar rango:', error)
        throw new Error(error.message || 'Error al actualizar rango')
      }

      return await res.json()
    } catch (err: any) {
      console.error('Error al actualizar rango (catch):', err)
      throw new Error(err.message || 'Error al actualizar rango')
    }
  },

  async delete(id: number) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        console.error('Error al eliminar rango:', error)
        throw new Error(error.message || 'Error al eliminar rango')
      }

      return true
    } catch (err: any) {
      console.error('Error al eliminar rango (catch):', err)
      throw new Error(err.message || 'Error al eliminar rango')
    }
  },
}
