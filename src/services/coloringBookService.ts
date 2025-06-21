const BASE_URL = 'http://localhost:3333/coloring-books'

export default {
  async list(filters = {}) {
    // Limpia filtros vacíos o nulos
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== null && v !== '' && v !== undefined)
    )

    const query = new URLSearchParams(cleanFilters).toString()
    const url = `${BASE_URL}?${query}`

    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!res.ok) {
        const errorText = await res.text()
        console.error('Error al listar libros:', res.status, errorText)
        throw new Error(`Error al listar libros: ${res.status}`)
      }

      return await res.json()
    } catch (err: any) {
      console.error('Error al listar libros (catch):', err)
      throw new Error(err.message || 'Error al listar libros')
    }
  },

  async get(id: number) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!res.ok) throw new Error('Error al obtener libro')
      return await res.json()
    } catch (err: any) {
      console.error('Error al obtener libro:', err)
      throw new Error(err.message || 'Error al obtener libro')
    }
  },

  async create(data: any) {
    try {
      const { id, ...payload } = data
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        console.error('Error al crear libro:', error)
        throw new Error(error.message || 'Error al crear libro')
      }

      return await res.json()
    } catch (err: any) {
      console.error('Error al crear libro (catch):', err)
      throw new Error(err.message || 'Error al crear libro')
    }
  },

  async updatePut(id: number, data: any) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        console.error('Error al actualizar libro (PUT):', error)
        throw new Error(error.message || 'Error al actualizar libro (PUT)')
      }

      return await res.json()
    } catch (err: any) {
      console.error('Error al actualizar libro (PUT catch):', err)
      throw new Error(err.message || 'Error al actualizar libro')
    }
  },

  async updatePatch(id: number, data: any) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        console.error('Error al actualizar libro (PATCH):', error)
        throw new Error(error.message || 'Error al actualizar libro (PATCH)')
      }

      return await res.json()
    } catch (err: any) {
      console.error('Error al actualizar libro (PATCH catch):', err)
      throw new Error(err.message || 'Error al actualizar libro')
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
        console.error('Error al eliminar libro:', error)
        throw new Error(error.message || 'Error al eliminar libro')
      }

      return true
    } catch (err: any) {
      console.error('Error al eliminar libro (catch):', err)
      throw new Error(err.message || 'Error al eliminar libro')
    }
  },
}
